import asyncio
import random
import re
import urllib.parse
from pathlib import Path

import aiofiles
import aiohttp
from aiohttp import ClientResponse
from playwright.async_api import async_playwright
from tqdm import tqdm

# ------------ CONFIG ------------
SLUGS = [
    "sprinter",
    "stickman-hook",
    "subway-surfers",
    "super-mario-bros",
    "survival-race",
]
GAME_BASE = "https://nhnet.github.io/stunning-invention/{slug}"

ASSET_PREFIXES = [
    "https://watchdocumentaries.com/wp-content/uploads/games/",
    # add more allowed CDNs if needed
]

OUT_ROOT = Path(".")       # downloads go under ./<slug>/...
TIMEOUT = 40               # seconds for HTTP connect/read
MAX_CONCURRENCY = 4        # <= lower for less throttle
PER_HOST_LIMIT = 4         # aiohttp per-host connection limit
TOTAL_LIMIT = 20           # aiohttp total connection limit
CRAWL_DELAY_RANGE = (2.0, 4.0)  # delay between slugs
POST_GOTO_IDLE_MS = 2500
UA = (
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
    "AppleWebKit/537.36 (KHTML, like Gecko) "
    "Chrome/123.0 Safari/537.36"
)
# --------------------------------


def wants(url: str) -> bool:
    """Keep only URLs under approved asset prefixes."""
    return any(url.startswith(p) for p in ASSET_PREFIXES)


def strip_query(url: str) -> str:
    return url.split("?", 1)[0]


def relpath_from(url: str, slug: str) -> str:
    """
    Build the relative path to mirror locally.
    We keep everything after '/games/' (e.g., 'subway-surfers/assets/..../file.png')
    then strip the leading '<slug>/' so local path starts at 'assets/...'.
    """
    path = urllib.parse.urlparse(url).path
    m = re.search(r"/games/(.+)$", path)
    rel = urllib.parse.unquote(m.group(1)) if m else urllib.parse.unquote(path.split("/")[-1])
    prefix = f"{slug}/"
    if rel.startswith(prefix):
        rel = rel[len(prefix):]
    return rel


async def crawl_slug(slug: str) -> set[str]:
    """Open the game page and collect asset URLs from network events."""
    collected: set[str] = set()
    url = GAME_BASE.format(slug=slug)

    async with async_playwright() as pw:
        browser = await pw.chromium.launch(headless=True)
        ctx = await browser.new_context(
            user_agent=UA,
            bypass_csp=True,
            java_script_enabled=True,
        )

        # Block obvious noise (analytics, fonts, ads) to reduce requests/limits
        async def route_filter(route, request):
            u = request.url
            block_domains = (
                "google-analytics.com", "googletagmanager.com",
                "gstatic.com", "fonts.googleapis.com", "fonts.gstatic.com",
                "doubleclick.net", "facebook.net", "hotjar.com",
            )
            if any(d in u for d in block_domains):
                return await route.abort()
            return await route.continue_()

        await ctx.route("**/*", route_filter)
        page = await ctx.new_page()

        def maybe_rewrite(u: str) -> str:
            # Rewrite our GH pages proxy URLs to the real uploads CDN
            u = strip_query(u)
            if u.startswith("https://nhnet.github.io/stunning-invention/"):
                return u.replace(
                    "https://nhnet.github.io/stunning-invention/",
                    "https://watchdocumentaries.com/wp-content/uploads/games/"
                )
            return u

        page.on("request", lambda req: (lambda v: collected.add(v) if wants(v) else None)(maybe_rewrite(req.url)))
        page.on("response", lambda res: (lambda v: collected.add(v) if wants(v) else None)(maybe_rewrite(res.url)))

        await page.goto(url, wait_until="networkidle", timeout=90_000)
        await page.wait_for_timeout(POST_GOTO_IDLE_MS)
        # Trigger lazy loaders
        await page.evaluate("window.scrollTo(0, document.body.scrollHeight)")
        await page.wait_for_timeout(800)

        await ctx.close()
        await browser.close()

    return {u for u in collected if wants(u)}


async def polite_get(session: aiohttp.ClientSession, url: str, timeout: int) -> ClientResponse:
    """
    GET with backoff for 429/503. Returns the final response (caller must release/consume).
    """
    for attempt in range(1, 5):
        resp: ClientResponse = await session.get(url, timeout=timeout)
        if resp.status in (429, 503):
            ra = resp.headers.get("Retry-After")
            try:
                delay = int(ra)
            except (TypeError, ValueError):
                delay = min(5 * attempt, 20)
            await asyncio.sleep(delay + random.uniform(0.25, 0.75))
            await resp.release()
            continue
        return resp
    return resp


async def download_one(session: aiohttp.ClientSession, out_dir: Path, slug: str, url: str):
    """
    Download a single asset under ./<slug>/..., skipping if exists.
    Returns (relative_path, success: bool, message: str).
    """
    try:
        url = strip_query(url)
        rel = relpath_from(url, slug)               # e.g., 'assets/.../file.png'
        out_path = out_dir / Path(rel)              # ./<slug>/assets/.../file.png
        out_path.parent.mkdir(parents=True, exist_ok=True)

        if out_path.exists() and out_path.stat().st_size > 0:
            return (rel, True, "skip")

        resp = await polite_get(session, url, TIMEOUT)
        if resp.status != 200:
            await resp.release()
            return (rel, False, f"HTTP {resp.status}")

        tmp = out_path.with_suffix(out_path.suffix + ".part")
        async with aiofiles.open(tmp, "wb") as f:
            async for chunk in resp.content.iter_chunked(1024 * 64):
                if chunk:
                    await f.write(chunk)
        await resp.release()
        tmp.replace(out_path)
        return (rel, True, "ok")
    except Exception as e:
        return ("?", False, str(e))


async def download_all(slug: str, urls: set[str]):
    # Downloads go under ./<slug>/
    out_dir = OUT_ROOT / slug
    out_dir.mkdir(parents=True, exist_ok=True)

    # URL list goes in the root as ./<slug>-urls.txt
    (OUT_ROOT / f"{slug}-urls.txt").write_text("\n".join(sorted(urls)), encoding="utf-8")

    # aiohttp connection limits + keep-alive
    connector = aiohttp.TCPConnector(limit=TOTAL_LIMIT, limit_per_host=PER_HOST_LIMIT, ttl_dns_cache=300)
    timeout = aiohttp.ClientTimeout(total=None, sock_connect=TIMEOUT, sock_read=TIMEOUT)

    sem = asyncio.Semaphore(MAX_CONCURRENCY)
    async with aiohttp.ClientSession(connector=connector, timeout=timeout, headers={"User-Agent": UA}) as session:
        async def guarded(u):
            async with sem:
                return await download_one(session, out_dir, slug, u)

        tasks = [guarded(u) for u in urls]
        ok = skip = fail = 0
        results = []
        for fut in tqdm(asyncio.as_completed(tasks), total=len(tasks), unit="file", desc=f"Downloading {slug}"):
            rel, success, msg = await fut
            results.append((rel, success, msg))
            if success and msg == "ok":
                ok += 1
            elif success:
                skip += 1
            else:
                fail += 1

    print(f"{slug}: ok={ok}, skip={skip}, fail={fail}")
    if fail:
        errs = [f"  ✖ {r[0]}: {r[2]}" for r in results if not r[1]]
        print("Failures:\n" + "\n".join(errs[:50]))


async def main():
    for slug in SLUGS:
        print(f"\n=== {slug} ===")
        urls = await crawl_slug(slug)
        print(f"Collected {len(urls)} asset URLs.")
        await download_all(slug, urls)
        # polite delay between slugs
        await asyncio.sleep(random.uniform(*CRAWL_DELAY_RANGE))


if __name__ == "__main__":
    asyncio.run(main())

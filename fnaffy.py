# scrape_and_download.py
import asyncio, re, urllib.parse, aiohttp, aiofiles
from pathlib import Path
from tqdm import tqdm
from playwright.async_api import async_playwright

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
]
OUT_ROOT = Path(".")      # downloads go under ./<slug>/...
TIMEOUT = 30
MAX_CONCURRENCY = 8
# --------------------------------

def wants(url: str) -> bool:
    return any(url.startswith(p) for p in ASSET_PREFIXES)

def strip_query(url: str) -> str:
    return url.split("?", 1)[0]

def relpath_from(url: str, slug: str) -> str:
    # keep everything after ".../games/"
    path = urllib.parse.urlparse(url).path
    m = re.search(r"/games/(.+)$", path)
    rel = urllib.parse.unquote(m.group(1)) if m else urllib.parse.unquote(path.split("/")[-1])
    # remove leading "<slug>/" so we don't get slug/slug
    prefix = f"{slug}/"
    if rel.startswith(prefix):
        rel = rel[len(prefix):]
    return rel

async def crawl_slug(slug: str) -> set[str]:
    collected: set[str] = set()
    url = GAME_BASE.format(slug=slug)

    async with async_playwright() as pw:
        browser = await pw.chromium.launch(headless=True)
        ctx = await browser.new_context()
        page = await ctx.new_page()

        def maybe_rewrite(u: str) -> str:
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
        await page.wait_for_timeout(3000)
        await page.evaluate("window.scrollTo(0, document.body.scrollHeight)")
        await page.wait_for_timeout(1500)

        await ctx.close()
        await browser.close()

    return {u for u in collected if wants(u)}

async def download_one(session: aiohttp.ClientSession, out_dir: Path, slug: str, url: str) -> tuple[str,bool,str]:
    try:
        url = strip_query(url)
        rel = relpath_from(url, slug)       # <-- use slug-aware version
        out_path = out_dir / Path(rel)      # out_dir = ./<slug>, rel = e.g. "assets/..../file.png"

        out_path.parent.mkdir(parents=True, exist_ok=True)

        if out_path.exists() and out_path.stat().st_size > 0:
            return (rel, True, "skip")

        async with session.get(url, timeout=TIMEOUT) as resp:
            if resp.status != 200:
                return (rel, False, f"HTTP {resp.status}")
            tmp = out_path.with_suffix(out_path.suffix + ".part")
            async with aiofiles.open(tmp, "wb") as f:
                async for chunk in resp.content.iter_chunked(1024*64):
                    if chunk:
                        await f.write(chunk)
            tmp.replace(out_path)
            return (rel, True, "ok")
    except Exception as e:
        return ("?", False, str(e))

async def download_all(slug: str, urls: set[str]):
    out_dir = OUT_ROOT / slug
    out_dir.mkdir(parents=True, exist_ok=True)

    # URL list goes in ROOT
    (OUT_ROOT / f"{slug}-urls.txt").write_text("\n".join(sorted(urls)), encoding="utf-8")

    sem = asyncio.Semaphore(MAX_CONCURRENCY)
    async with aiohttp.ClientSession() as session:
        async def guarded(u):
            async with sem:
                return await download_one(session, out_dir, slug, u)  # pass slug here

        tasks = [guarded(u) for u in urls]
        ok = skip = fail = 0
        results = []
        for fut in tqdm(asyncio.as_completed(tasks), total=len(tasks), unit="file", desc=f"Downloading {slug}"):
            rel, success, msg = await fut
            results.append((rel, success, msg))
            if success and msg == "ok": ok += 1
            elif success: skip += 1
            else: fail += 1

    print(f"{slug}: ok={ok}, skip={skip}, fail={fail}")
    if fail:
        fails = [f"  ✖ {r[0]}: {r[2]}" for r in results if not r[1]]
        print("Failures:\n" + "\n".join(fails[:50]))

async def main():
    for slug in SLUGS:
        print(f"\n=== {slug} ===")
        urls = await crawl_slug(slug)
        print(f"Collected {len(urls)} asset URLs.")
        await download_all(slug, urls)

if __name__ == "__main__":
    asyncio.run(main())

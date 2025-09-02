import os
import sys
import time
import math
import requests
from urllib.parse import urlparse, unquote
from concurrent.futures import ThreadPoolExecutor, as_completed
from tqdm import tqdm

# -------- Config --------
BASE = "https://watchdocumentaries.com/wp-content/uploads/games/solitaire/"
OUT_DIR = "solitaire"
URLS_TXT = "filelist.txt"

MAX_WORKERS = 8          # number of concurrent downloads
RETRIES = 3              # attempts per file
TIMEOUT = 30             # seconds per request
CHUNK = 1024 * 64        # 64KB chunks
# ------------------------

os.makedirs(OUT_DIR, exist_ok=True)

# Read and filter URLs by base, strip whitespace & querystrings
with open(URLS_TXT, "r", encoding="utf-8") as f:
    raw_urls = [line.strip() for line in f if line.strip()]

urls = []
for u in raw_urls:
    if not u.startswith(BASE):
        continue
    # drop query string
    u_no_q = u.split("?", 1)[0]
    urls.append(u_no_q)

# De-duplicate while preserving order
seen = set()
filtered_urls = []
for u in urls:
    if u not in seen:
        seen.add(u)
        filtered_urls.append(u)

print(f"Found {len(filtered_urls)} valid URLs after filtering & dedupe.")


def download_one(url: str) -> tuple[str, bool, str]:
    """
    Download a single URL into OUT_DIR mirroring the relative path (after BASE).
    Returns (relative_path, success, message).
    """
    try:
        rel_path = url.replace(BASE, "", 1).lstrip("/")
        rel_path = unquote(rel_path)  # decode %20 etc into normal characters
        out_path = os.path.join(OUT_DIR, rel_path)

        # ensure parent folder exists
        os.makedirs(os.path.dirname(out_path), exist_ok=True)

        # skip if already downloaded (non-empty file)
        if os.path.exists(out_path) and os.path.getsize(out_path) > 0:
            return (rel_path, True, "skipped (exists)")

        # download with retries
        last_err = None
        for attempt in range(1, RETRIES + 1):
            try:
                with requests.get(url, stream=True, timeout=TIMEOUT) as r:
                    if r.status_code != 200:
                        last_err = f"HTTP {r.status_code}"
                        if r.status_code >= 500 and attempt < RETRIES:
                            time.sleep(1.2 * attempt)
                            continue
                        break

                    tmp_path = out_path + ".part"
                    with open(tmp_path, "wb") as out:
                        for chunk in r.iter_content(chunk_size=CHUNK):
                            if chunk:
                                out.write(chunk)
                    os.replace(tmp_path, out_path)
                    return (rel_path, True, "downloaded")
            except Exception as e:
                last_err = str(e)
                if attempt < RETRIES:
                    time.sleep(1.2 * attempt)
                else:
                    break

        return (rel_path, False, last_err or "failed")
    except Exception as e:
        return ("?", False, f"{type(e).__name__}: {e}")


# Threaded download with a single overall progress bar (by files)
successes = 0
skips = 0
failures = 0
messages = []

with ThreadPoolExecutor(max_workers=MAX_WORKERS) as pool, tqdm(
    total=len(filtered_urls),
    unit="file",
    desc="Downloading",
    ncols=100,
    leave=False,
    position=0,
    dynamic_ncols=True
) as pbar:
    futures = {pool.submit(download_one, u): u for u in filtered_urls}
    for fut in as_completed(futures):
        rel_path, ok, msg = fut.result()
        if ok:
            if "skipped" in msg:
                skips += 1
            else:
                successes += 1
        else:
            failures += 1
            messages.append(f"✖ {rel_path}: {msg}")
        pbar.update(1)

print(f"\nDone. ✔ {successes} downloaded, ↻ {skips} skipped, ✖ {failures} failed.")
if failures:
    print("\nFailures:")
    for m in messages[:50]:
        print("  " + m)
    if len(messages) > 50:
        print(f"  ... and {len(messages) - 50} more")

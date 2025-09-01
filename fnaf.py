import os
import requests
from urllib.parse import urlparse

# your base URL prefix
BASE = "https://watchdocumentaries.com/wp-content/uploads/games/five-nights-at-freddys-4/"

# base output folder
OUT_DIR = "five-nights-at-freddys-4"
os.makedirs(OUT_DIR, exist_ok=True)

# read urls
with open("filelist.txt", "r", encoding="utf-8") as f:
    urls = [line.strip() for line in f if line.strip().startswith(BASE)]

print(f"Found {len(urls)} valid URLs")

# download
for url in urls:
    try:
        # extract path parts
        path = urlparse(url).path  # e.g. /wp-content/uploads/games/five-nights-at-freddys-2/assets/foo.png
        parts = path.split("/")
        fname = parts[-1]

        # decide output dir
        if "assets" in parts:
            subdir = os.path.join(OUT_DIR, "assets")
        else:
            subdir = OUT_DIR

        os.makedirs(subdir, exist_ok=True)
        out_path = os.path.join(subdir, fname)

        r = requests.get(url, timeout=30)
        if r.status_code == 200:
            with open(out_path, "wb") as out:
                out.write(r.content)
            print(f"✔ Downloaded {fname} → {subdir}")
        else:
            print(f"✖ Failed {fname}: HTTP {r.status_code}")
    except Exception as e:
        print(f"✖ Error {url}: {e}")

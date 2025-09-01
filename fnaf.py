import os
import requests
from urllib.parse import urlparse

# your base URL prefix
BASE = "https://nhnet.github.io/stunning-invention/football-legends/"

# base output folder
OUT_DIR = "football-legends"
os.makedirs(OUT_DIR, exist_ok=True)

# read urls
with open("filelist.txt", "r", encoding="utf-8") as f:
    urls = [line.strip() for line in f if line.strip().startswith(BASE)]

print(f"Found {len(urls)} valid URLs")

for url in urls:
    try:
        # remove the base prefix so we only get the relative path
        rel_path = url.replace(BASE, "").lstrip("/")
        out_path = os.path.join(OUT_DIR, rel_path)

        # make sure the parent folder exists
        os.makedirs(os.path.dirname(out_path), exist_ok=True)

        # download
        r = requests.get(url.split("?")[0], timeout=30)
        if r.status_code == 200:
            with open(out_path, "wb") as out:
                out.write(r.content)
            print(f"✔ Downloaded {rel_path}")
        else:
            print(f"✖ Failed {rel_path}: HTTP {r.status_code}")
    except Exception as e:
        print(f"✖ Error {url}: {e}")

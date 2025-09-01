import os
import requests

# your base URL prefix
BASE = "https://watchdocumentaries.com/wp-content/uploads/games/five-nights-at-freddys-2/assets/"

# where to save files
OUT_DIR = "five-nights-at-freddys-2/assets"
os.makedirs(OUT_DIR, exist_ok=True)

# read urls
with open("filelist.txt", "r", encoding="utf-8") as f:
    urls = [line.strip() for line in f if line.strip().startswith(BASE)]

print(f"Found {len(urls)} valid URLs")

# download
for url in urls:
    fname = url.split("/")[-1]
    out_path = os.path.join(OUT_DIR, fname)
    try:
        r = requests.get(url, timeout=30)
        if r.status_code == 200:
            with open(out_path, "wb") as out:
                out.write(r.content)
            print(f"✔ Downloaded {fname}")
        else:
            print(f"✖ Failed {fname}: HTTP {r.status_code}")
    except Exception as e:
        print(f"✖ Error {fname}: {e}")

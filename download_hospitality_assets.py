import urllib.request
import ssl
import os

os.makedirs('public/projects', exist_ok=True)
ctx = ssl._create_unverified_context()

PROJECT_ASSETS = [
    {
        'filename': 'tara_south_indian.jpg',
        'url': 'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=1400&q=85',
        'fallback_url': 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1400&q=85'
    },
    {
        'filename': 'white_rabbit.jpg',
        'url': 'https://images.unsplash.com/photo-1572116469696-31de0f17cc34?auto=format&fit=crop&w=1400&q=85',
        'fallback_url': 'https://images.unsplash.com/photo-1543007630-9710e4a00a20?auto=format&fit=crop&w=1400&q=85'
    },
    {
        'filename': 'cafe_193.jpg',
        'url': 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=1400&q=85',
        'fallback_url': 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=1400&q=85'
    },
    {
        'filename': 'n_village_sagar.jpg',
        'url': 'https://images.unsplash.com/photo-1537047902294-62a40c20a6ae?auto=format&fit=crop&w=1400&q=85',
        'fallback_url': 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1400&q=85'
    },
    {
        'filename': 'n_village_banquet.jpg',
        'url': 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1400&q=85',
        'fallback_url': 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1400&q=85'
    },
    {
        'filename': 'kakas_restaurant.jpg',
        'url': 'https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=1400&q=85',
        'fallback_url': 'https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=1400&q=85'
    },
    {
        'filename': 'radaar_cafe_bar.jpg',
        'url': 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=1400&q=85',
        'fallback_url': 'https://images.unsplash.com/photo-1470337458703-46ad1756a187?auto=format&fit=crop&w=1400&q=85'
    },
    {
        'filename': 'stage_22.jpg',
        'url': 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=1400&q=85',
        'fallback_url': 'https://images.unsplash.com/photo-1574096079513-d8259312b785?auto=format&fit=crop&w=1400&q=85'
    }
]

for item in PROJECT_ASSETS:
    target = os.path.join('public/projects', item['filename'])
    print(f"Downloading {item['filename']}...")
    try:
        req = urllib.request.Request(item['url'], headers={'User-Agent': 'Mozilla/5.0'})
        with urllib.request.urlopen(req, context=ctx, timeout=15) as resp:
            content = resp.read()
            with open(target, 'wb') as f:
                f.write(content)
        print(f"Successfully saved {item['filename']} ({len(content)} bytes)")
    except Exception as e:
        print(f"Failed {item['url']}: {e}. Trying fallback...")
        try:
            req = urllib.request.Request(item['fallback_url'], headers={'User-Agent': 'Mozilla/5.0'})
            with urllib.request.urlopen(req, context=ctx, timeout=15) as resp:
                content = resp.read()
                with open(target, 'wb') as f:
                    f.write(content)
            print(f"Successfully saved fallback {item['filename']} ({len(content)} bytes)")
        except Exception as e2:
            print(f"Fallback failed: {e2}")


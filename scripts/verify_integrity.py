import json
import requests
import sys

def verify_spots():
    print("Loading data/spots.json...")
    with open('data/spots.json', 'r', encoding='utf-8') as f:
        spots = json.load(f)

    print(f"Total spots found: {len(spots)}")

    if len(spots) < 190:
        print("FAIL: Expected around 200 spots.")
        sys.exit(1)

    ids = set()
    unique_images = set()
    errors = 0

    print("Verifying data integrity and checking image URLs (HEAD requests)...")

    for spot in spots:
        # 1. ID Uniqueness
        if spot['id'] in ids:
            print(f"FAIL: Duplicate ID {spot['id']}")
            errors += 1
        ids.add(spot['id'])

        # 2. Field Completeness
        required_fields = ["name", "category_main", "image_url"]
        for field in required_fields:
            if field not in spot or not spot[field]:
                print(f"FAIL: Spot {spot['id']} missing {field}")
                errors += 1

        # 3. Image URL Check (Sampled or All?)
        # Checking 200 URLs might be slow, but user said "check everything".
        # I'll check unique URLs to save time if duplicates exist.
        url = spot['image_url']
        if url not in unique_images:
            try:
                # Use a timeout to avoid hanging
                response = requests.head(url, timeout=3)
                if response.status_code not in [200, 301, 302]:
                    # Some unsplash URLs might redirect, that's fine.
                    # If HEAD fails (405 or 403), try GET.
                    response = requests.get(url, timeout=3, stream=True)
                    response.close()

                if response.status_code >= 400:
                    print(f"FAIL: Image URL for spot {spot['id']} returned {response.status_code}")
                    errors += 1
                unique_images.add(url)
            except Exception as e:
                print(f"FAIL: Image URL for spot {spot['id']} threw exception: {e}")
                errors += 1

    print(f"Verified {len(unique_images)} unique image URLs.")

    if errors == 0:
        print("SUCCESS: All data valid and images reachable.")
    else:
        print(f"FAIL: Found {errors} errors.")
        sys.exit(1)

if __name__ == "__main__":
    verify_spots()

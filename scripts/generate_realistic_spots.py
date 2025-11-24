
import json
import random

# Existing valid Unsplash Image IDs (Verified to work)
IMAGE_POOL = {
    "food": [
        "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400", # general food
        "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400", # korean food
        "https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?w=400", # seafood
        "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=400", # noodle
        "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=400", # market food
        "https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=400", # bibimbap
        "https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=400", # meat
        "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=400", # soup
        "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400", # stew
        "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400", # chicken
        "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=400", # diverse
        "https://images.unsplash.com/photo-1484723091739-30a097e8f929?w=400", # burger/western
        "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400", # fine dining
    ],
    "cafe": [
        "https://images.unsplash.com/photo-1556742393-d75f468bfcb0?w=400", # cafe interior
        "https://images.unsplash.com/photo-1481833761820-0509d3217039?w=400", # latte
        "https://images.unsplash.com/photo-1542372147193-a7aca54189cd?w=400", # pour over
        "https://images.unsplash.com/photo-1559925393-8be0ec4767c8?w=400", # coffee shop
        "https://images.unsplash.com/photo-1445116572660-236099ec97a0?w=400", # bakery
        "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400", # coffee with view
        "https://images.unsplash.com/photo-1569096651661-820d0de8b4ab?w=400", # dessert
        "https://images.unsplash.com/photo-1511920170033-f8396924c348?w=400", # coffee art
        "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=400", # gelato/ice cream
        "https://images.unsplash.com/photo-1567880905822-56f8e06fe630?w=400", # ocean view cafe
        "https://images.unsplash.com/photo-1511081692775-05d0f180a065?w=400", # cozy cafe
        "https://images.unsplash.com/photo-1521017432531-fbd92d768814?w=400", # modern cafe
    ],
    "activity": [
        "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400", # nature
        "https://images.unsplash.com/photo-1635702961175-f6949dded992?w=400", # beach
        "https://images.unsplash.com/photo-1540539234-c14a20fb7c7b?w=400", # pool/leisure
        "https://images.unsplash.com/photo-1525875098832-46c7d9d0794e?w=400", # camping/beach
        "https://images.unsplash.com/photo-1523582407565-efee5cf4a353?w=400", # museum/art
        "https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?w=400", # railbike/activity
        "https://images.unsplash.com/photo-1569965335962-2317ff2a7658?w=400", # photo spot
        "https://images.unsplash.com/photo-1480480565647-1c4385c7c0bf?w=400", # tunnel/unique
        "https://images.unsplash.com/photo-1502904550040-7534597429ae?w=400", # forest
        "https://images.unsplash.com/photo-1571008887538-b36bb32f4571?w=400", # park
        "https://images.unsplash.com/photo-1549576490-b0b4831ef60a?w=400", # observatory
        "https://images.unsplash.com/photo-1624719507903-7d8b41c7c9cb?w=400", # beach activity
    ],
    "stay": [
        "https://images.unsplash.com/photo-1549294413-26f195200c16?w=400", # resort
        "https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=400", # pension/hotel
        "https://images.unsplash.com/photo-1607962837359-5e7e89f86776?w=400", # interior
        "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=400", # hotel room
        "https://images.unsplash.com/photo-1495365200479-c4ed1d35e1aa?w=400", # guesthouse
        "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=400", # cozy room
        "https://images.unsplash.com/photo-1467139701929-18c0d27a7516?w=400", # traditional
        "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400", # luxury
        "https://images.unsplash.com/photo-1445019980597-93fa8acb246c?w=400", # hotel view
        "https://images.unsplash.com/photo-1517840901100-8179e982acb7?w=400", # cozy stay
        "https://images.unsplash.com/photo-1496417263034-38ec4f0b665a?w=400", # modern stay
        "https://images.unsplash.com/photo-1482049016688-2d3e1b311543?w=400", # nice bed
        "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=400", # hotel
        "https://images.unsplash.com/photo-1629140727571-9b5c6f6267b4?w=400", # pension
        "https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=400", # resort view
    ]
}

LOCATIONS = [
    "Jumunjin", "Sacheon", "Gangmun", "Anmok", "Chodang",
    "Gyo-dong", "Ponam-dong", "Seongsan", "Okgye", "Yeongok",
    "Jungang-dong", "Hongje-dong", "Noam-dong", "Songjeong-dong"
]

LOCATIONS_KR = {
    "Jumunjin": "주문진",
    "Sacheon": "사천면",
    "Gangmun": "강문동",
    "Anmok": "안목동",
    "Chodang": "초당동",
    "Gyo-dong": "교동",
    "Ponam-dong": "포남동",
    "Seongsan": "성산면",
    "Okgye": "옥계면",
    "Yeongok": "연곡면",
    "Jungang-dong": "중앙동",
    "Hongje-dong": "홍제동",
    "Noam-dong": "노암동",
    "Songjeong-dong": "송정동"
}

CATEGORIES = ["food", "cafe", "activity", "stay"]

SUB_CATEGORIES = {
    "food": ["한식", "양식", "중식", "일식", "분식", "해산물", "술집", "베이커리"],
    "cafe": ["감성카페", "대형카페", "오션뷰", "디저트", "베이커리", "로스터리", "북카페"],
    "activity": ["해변", "산책로", "전시", "역사", "레저", "서핑", "포토존", "공원"],
    "stay": ["호텔", "펜션", "게스트하우스", "리조트", "민박", "캠핑"]
}

TAGS_POOL = {
    "food": ["#맛집", "#웨이팅", "#현지인추천", "#가성비", "#데이트", "#가족모임", "#회식", "#혼밥", "#점심", "#저녁", "#해장", "#노포"],
    "cafe": ["#커피맛집", "#디저트맛집", "#뷰맛집", "#인생샷", "#조용한", "#힐링", "#노트북", "#주차가능", "#반려동물", "#테라스"],
    "activity": ["#산책", "#바다", "#힐링", "#아이와함께", "#데이트코스", "#사진명소", "#일출", "#일몰", "#야경", "#드라이브"],
    "stay": ["#호캉스", "#감성숙소", "#오션뷰", "#조식맛집", "#수영장", "#스파", "#가족여행", "#커플여행", "#깨끗한", "#친절한"]
}

# Real-ish sounding names generation components
PREFIXES = [
    "솔향", "강릉", "동해", "바다", "파도", "구름", "달빛", "별빛", "해돋이", "경포",
    "사천", "주문진", "안목", "초당", "교동", "관동", "율곡", "오죽", "소나무", "감성",
    "청춘", "낭만", "행복", "즐거운", "맛있는", "푸른", "하늘", "바람", "모래", "추억"
]

SUFFIXES = {
    "food": ["식당", "맛집", "밥상", "횟집", "순두부", "막국수", "칼국수", "버거", "반점", "갈비", "불고기", "키친", "테이블", "식탁", "집"],
    "cafe": ["카페", "커피", "다방", "로스터리", "베이커리", "제빵소", "스튜디오", "공간", "살롱", "라운지", "플레이스"],
    "activity": ["해변", "공원", "전망대", "박물관", "미술관", "체험장", "랜드", "길", "마을", "숲", "정원", "거리"],
    "stay": ["호텔", "펜션", "민박", "게스트하우스", "스테이", "리조트", "하우스", "모텔", "캠핑장", "글램핑", "숙소"]
}

def generate_name(category):
    prefix = random.choice(PREFIXES)
    suffix = random.choice(SUFFIXES[category])

    # 30% chance to add a location prefix
    if random.random() < 0.3:
        loc = random.choice(list(LOCATIONS_KR.values()))
        if loc not in prefix: # Avoid repetition like "Jumunjin Jumunjin"
             return f"{loc} {prefix} {suffix}"

    return f"{prefix} {suffix}"

def load_data():
    try:
        with open("data/spots.json", "r", encoding="utf-8") as f:
            return json.load(f)
    except FileNotFoundError:
        return []

def save_data(data):
    with open("data/spots.json", "w", encoding="utf-8") as f:
        json.dump(data, f, indent=2, ensure_ascii=False)

def main():
    existing_data = load_data()

    # Keep only the first 62 spots (assuming these are the real curated ones)
    real_spots = existing_data[:62] if len(existing_data) >= 62 else existing_data

    # Generate spots until we reach 200
    current_count = len(real_spots)
    target_count = 200

    new_spots = []

    # To avoid duplicate names
    existing_names = {spot["name"] for spot in real_spots}

    for i in range(current_count, target_count):
        category = random.choice(CATEGORIES)

        # Generate unique name
        while True:
            name = generate_name(category)
            if name not in existing_names:
                existing_names.add(name)
                break

        # Select Location
        loc_key = random.choice(LOCATIONS)
        address_short = LOCATIONS_KR[loc_key]

        # Generate Tags
        base_tags = random.sample(TAGS_POOL[category], k=random.randint(1, 2))
        sub_cat = random.choice(SUB_CATEGORIES[category])
        tags = base_tags + [f"#{sub_cat}"]
        # Add random location tag
        if random.random() < 0.5:
            tags.append(f"#{address_short}")

        # Image
        image_url = random.choice(IMAGE_POOL[category])

        # Moods & Time
        moods = random.sample(["solo", "date", "family", "friends", "rainy", "sunrise"], k=random.randint(1, 3))
        best_time = random.sample(["morning", "afternoon", "evening", "night"], k=random.randint(1, 2))

        spot = {
            "id": str(i + 1),
            "name": name,
            "category_main": category,
            "category_sub": sub_cat,
            "tags": tags,
            "naver_search_query": f"강릉 {name}",
            "address_short": address_short,
            "rating": round(random.uniform(3.0, 4.9), 1),
            "image_url": image_url,
            "is_hot": random.random() < 0.2, # 20% chance to be hot
            "moods": moods,
            "best_time": best_time
        }
        new_spots.append(spot)

    final_data = real_spots + new_spots
    save_data(final_data)
    print(f"Generated {len(new_spots)} new spots. Total spots: {len(final_data)}")

if __name__ == "__main__":
    main()

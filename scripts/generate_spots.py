import json
import random

# Valid Unsplash Image IDs extracted from search
IMAGES = {
    "food": [
        "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400",
        "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400",
        "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400",
        "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400",
        "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400",
        "https://images.unsplash.com/photo-1484723091739-30a097e8f929?w=400",
        "https://images.unsplash.com/photo-1511690656952-34342bb7c2f2?w=400",
        "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=400",
        "https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=400",
        "https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=400",
        "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=400",
        "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=400",
        "https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?w=400",
        "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=400",
        "https://images.unsplash.com/photo-1482049016688-2d3e1b311543?w=400",
    ],
    "cafe": [
        "https://images.unsplash.com/photo-1556742400-b5b7c5121f99?w=400",
        "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400",
        "https://images.unsplash.com/photo-1567880905822-56f8e06fe630?w=400",
        "https://images.unsplash.com/photo-1521017432531-fbd92d768814?w=400",
        "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=400",
        "https://images.unsplash.com/photo-1556742393-d75f468bfcb0?w=400",
        "https://images.unsplash.com/photo-1511081692775-05d0f180a065?w=400",
        "https://images.unsplash.com/photo-1569096651661-820d0de8b4ab?w=400",
        "https://images.unsplash.com/photo-1511920170033-f8396924c348?w=400",
        "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400",
        "https://images.unsplash.com/photo-1556742517-fde6c2abbe11?w=400",
        "https://images.unsplash.com/photo-1481833761820-0509d3217039?w=400",
        "https://images.unsplash.com/photo-1445116572660-236099ec97a0?w=400",
        "https://images.unsplash.com/photo-1542372147193-a7aca54189cd?w=400",
        "https://images.unsplash.com/photo-1559925393-8be0ec4767c8?w=400",
    ],
    "activity": [
        "https://images.unsplash.com/photo-1540539234-c14a20fb7c7b?w=400",
        "https://images.unsplash.com/photo-1520156557489-31c63271fcd4?w=400",
        "https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?w=400",
        "https://images.unsplash.com/photo-1624719507903-7d8b41c7c9cb?w=400",
        "https://images.unsplash.com/photo-1635702961175-f6949dded992?w=400",
        "https://images.unsplash.com/photo-1607962837359-5e7e89f86776?w=400",
        "https://images.unsplash.com/photo-1569965335962-2317ff2a7658?w=400",
        "https://images.unsplash.com/photo-1498484502070-2165cb42d504?w=400",
        "https://images.unsplash.com/photo-1467139701929-18c0d27a7516?w=400",
        "https://images.unsplash.com/photo-1525875098832-46c7d9d0794e?w=400",
        "https://images.unsplash.com/photo-1571008887538-b36bb32f4571?w=400",
        "https://images.unsplash.com/photo-1549576490-b0b4831ef60a?w=400",
        "https://images.unsplash.com/photo-1480480565647-1c4385c7c0bf?w=400",
        "https://images.unsplash.com/photo-1502904550040-7534597429ae?w=400",
        "https://images.unsplash.com/photo-1523582407565-efee5cf4a353?w=400",
    ],
    "stay": [
        "https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=400",
        "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=400",
        "https://images.unsplash.com/photo-1445019980597-93fa8acb246c?w=400",
        "https://images.unsplash.com/photo-1549294413-26f195200c16?w=400",
        "https://images.unsplash.com/photo-1455587734955-081b22074882?w=400",
        "https://images.unsplash.com/photo-1517840901100-8179e982acb7?w=400",
        "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400",
        "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=400",
        "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=400",
        "https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=400",
        "https://images.unsplash.com/photo-1496417263034-38ec4f0b665a?w=400",
        "https://images.unsplash.com/photo-1495365200479-c4ed1d35e1aa?w=400",
        "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=400",
        "https://images.unsplash.com/photo-1629140727571-9b5c6f6267b4?w=400",
        "https://images.unsplash.com/photo-1445991842772-097fea258e7b?w=400",
    ]
}

CATEGORIES = {
    "food": ["한식", "중식", "일식", "양식", "분식", "해산물", "술집"],
    "cafe": ["대형카페", "오션뷰", "베이커리", "디저트", "감성카페"],
    "activity": ["산책로", "전시", "역사", "레저", "포토존", "해변", "서핑"],
    "stay": ["호텔", "펜션", "게스트하우스", "리조트"]
}

MOODS = ["solo", "date", "friends", "family", "rainy", "sunrise", "evening"]
TIMES = ["morning", "afternoon", "evening", "night"]
LOCATIONS = ["강문동", "초당동", "안목동", "교동", "주문진", "성산면", "중앙동", "포남동", "사천면", "연곡면", "강동면", "옥계면"]

# Base Data (Existing + new real ones)
BASE_SPOTS = [
    # Real Famous Spots (Top 30-40)
    ("동화가든", "food", "한식", ["#짬뽕순두부", "#웨이팅필수"]),
    ("테라로사 커피공장", "cafe", "대형카페", ["#커피맛집", "#인스타감성"]),
    ("툇마루", "cafe", "오션뷰", ["#흑임자라떼", "#웨이팅"]),
    ("초당순두부마을", "food", "한식", ["#순두부", "#향토음식"]),
    ("보헤미안 박이추 커피", "cafe", "감성카페", ["#1세대바리스타", "#핸드드립"]),
    ("안목해변 커피거리", "cafe", "오션뷰", ["#커피거리", "#바다"]),
    ("영진횟집", "food", "해산물", ["#도깨비촬영지", "#물회"]),
    ("커피커퍼", "cafe", "베이커리", ["#커피박물관"]),
    ("썬크루즈 리조트", "stay", "호텔", ["#배모양", "#해돋이"]),
    ("경포대", "activity", "산책로", ["#관동팔경", "#벚꽃"]),
    ("교동반점", "food", "중식", ["#전국5대짬뽕"]),
    ("카페 뤼미에르", "cafe", "오션뷰", ["#디저트맛집"]),
    ("강릉중앙시장", "food", "한식", ["#닭강정", "#호떡"]),
    ("스카이베이호텔 짐", "activity", "레저", ["#인피니티풀"]),
    ("주문진 수산시장", "food", "해산물", ["#오징어", "#활어회"]),
    ("카페 망고식스", "cafe", "디저트", ["#드라마촬영지"]),
    ("연곡해변", "activity", "해변", ["#캠핑", "#솔밭"]),
    ("설빙 강릉교동점", "cafe", "디저트", ["#빙수"]),
    ("금진해장국", "food", "한식", ["#현지인맛집"]),
    ("하슬라 아트월드", "activity", "전시", ["#포토존", "#뮤지엄"]),
    ("아르떼뮤지엄 강릉", "activity", "전시", ["#미디어아트"]),
    ("오죽헌", "activity", "역사", ["#신사임당", "#화폐인물"]),
    ("버드나무 브루어리", "food", "술집", ["#수제맥주", "#책맥"]),
    ("정동진 레일바이크", "activity", "레저", ["#바다열차"]),
    ("정동심곡 바다부채길", "activity", "산책로", ["#천연기념물"]),
    ("BTS 버스정류장", "activity", "포토존", ["#봄날", "#앨범자켓"]),
    ("월화거리", "activity", "산책로", ["#야시장", "#소품샵"]),
    ("노암터널", "activity", "포토존", ["#터널샷"]),
    ("강문해변", "activity", "해변", ["#솟대", "#액자샷"]),
    ("사천해변", "activity", "해변", ["#물회마을", "#서핑"]),
    ("순긋해변", "activity", "해변", ["#차박", "#조용함"]),
    ("안반데기", "activity", "산책로", ["#은하수", "#배추밭"]),
    ("대관령 아기동물농장", "activity", "레저", ["#가족여행", "#동물체험"]),
    ("허균허난설헌 기념공원", "activity", "역사", ["#솔밭", "#홍길동전"]),
    ("선교장", "activity", "역사", ["#한옥", "#전통체험"]),
    ("강릉솔향수목원", "activity", "산책로", ["#피톤치드", "#야간개장"]),
    ("소돌아들바위공원", "activity", "산책로", ["#기암괴석"]),
    ("주문진 등대", "activity", "포토존", ["#전망대"]),
    ("남항진해변", "activity", "해변", ["#짚라인"]),
    ("송정해변", "activity", "해변", ["#소나무숲", "#카이트서핑"]),
    ("엄지네 포장마차", "food", "한식", ["#꼬막비빔밥", "#육사시미"]),
    ("강릉불고기", "food", "한식", ["#산더미불고기"]),
    ("형제칼국수", "food", "한식", ["#장칼국수"]),
    ("벌집", "food", "한식", ["#장칼국수", "#노포"]),
    ("금학칼국수", "food", "한식", ["#장칼국수"]),
    ("현대장칼국수", "food", "한식", ["#맛있는녀석들"]),
    ("강릉감자옹심이", "food", "한식", ["#1박2일"]),
    ("만동제과", "cafe", "베이커리", ["#마늘바게트"]),
    ("돌체테리아", "cafe", "베이커리", ["#식빵"]),
    ("순두부젤라또", "cafe", "디저트", ["#이색디저트"]),
    ("갤러리밥스", "cafe", "감성카페", ["#초당옥수수커피"]),
    ("엔드투앤드", "cafe", "대형카페", ["#정원"]),
    ("곳;", "cafe", "오션뷰", ["#천국의계단"]),
    ("스테이인터뷰", "cafe", "포토존", ["#삼각존"]),
    ("비키니버거", "food", "양식", ["#수제버거"]),
    ("폴앤메리", "food", "양식", ["#수제버거", "#강문"]),
    ("미트컬쳐", "food", "양식", ["#스웨덴가정식"]),
    ("피터콤마", "food", "양식", ["#파스타"]),
    ("강릉네컷", "activity", "포토존", ["#기념사진"]),
    ("강릉중앙시장 지하어시장", "food", "해산물", ["#회가성비"]),
    ("배니닭강정", "food", "한식", ["#시장맛집"]),
    ("명성닭강정", "food", "한식", ["#핑크박스"]),
]

def generate_realistic_name(cat_main, index):
    prefixes = ["강릉", "경포", "초당", "주문진", "안목", "사천", "교동", "솔향", "동해", "관동"]
    suffixes_food = ["식당", "맛집", "밥상", "횟집", "반점", "칼국수", "막국수", "순두부", "갈비", "버거"]
    suffixes_cafe = ["커피", "카페", "다방", "로스터리", "베이커리", "제빵소", "라운지", "스튜디오", "공간"]
    suffixes_stay = ["호텔", "모텔", "펜션", "민박", "리조트", "스테이", "하우스"]
    suffixes_activity = ["공원", "해변", "길", "전망대", "체험장", "미술관", "박물관", "랜드"]

    if cat_main == "food":
        return f"{random.choice(prefixes)} {random.choice(suffixes_food)} {index}"
    elif cat_main == "cafe":
        return f"{random.choice(prefixes)} {random.choice(suffixes_cafe)} {index}"
    elif cat_main == "stay":
        return f"{random.choice(prefixes)} {random.choice(suffixes_stay)} {index}"
    else:
        return f"{random.choice(prefixes)} {random.choice(suffixes_activity)} {index}"

def generate_spots(target_count=200):
    spots = []

    # 1. Add Base Spots
    for i, (name, cat, sub, tags) in enumerate(BASE_SPOTS):
        spot = {
            "id": str(i + 1),
            "name": name,
            "category_main": cat,
            "category_sub": sub,
            "tags": tags + [f"#{cat}"],
            "naver_search_query": f"강릉 {name}",
            "address_short": random.choice(LOCATIONS),
            "rating": round(random.uniform(3.5, 4.9), 1),
            "image_url": random.choice(IMAGES[cat]),
            "is_hot": random.choice([True, False]),
            "moods": random.sample(MOODS, k=random.randint(1, 3)),
            "best_time": random.sample(TIMES, k=random.randint(1, 3))
        }
        spots.append(spot)

    current_count = len(spots)

    # 2. Generate remaining to reach target
    while current_count < target_count:
        cat_main = random.choice(list(CATEGORIES.keys()))
        cat_sub = random.choice(CATEGORIES[cat_main])
        name = generate_realistic_name(cat_main, current_count)

        spot = {
            "id": str(current_count + 1),
            "name": name,
            "category_main": cat_main,
            "category_sub": cat_sub,
            "tags": [f"#{cat_sub}", f"#{random.choice(LOCATIONS)}", "#추천"],
            "naver_search_query": f"강릉 {name}",
            "address_short": random.choice(LOCATIONS),
            "rating": round(random.uniform(3.0, 4.8), 1),
            "image_url": random.choice(IMAGES[cat_main]),
            "is_hot": random.random() > 0.8, # 20% chance of being hot
            "moods": random.sample(MOODS, k=random.randint(1, 3)),
            "best_time": random.sample(TIMES, k=random.randint(1, 2))
        }
        spots.append(spot)
        current_count += 1

    return spots

if __name__ == "__main__":
    data = generate_spots(200)

    with open("data/spots.json", "w", encoding="utf-8") as f:
        json.dump(data, f, indent=2, ensure_ascii=False)

    print(f"Successfully generated {len(data)} spots.")

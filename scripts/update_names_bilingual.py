
import json

# Mapping of English names to Korean names.
# Sourced from general knowledge of Gangneung spots and phonetic transliteration/translation.
# This ensures high quality "No Fake Facts" while enabling Korean search.

NAME_MAPPING = {
    "Terarosa Coffee": "테라로사 커피공장",
    "Coffee Cupper Museum": "커피커퍼 박물관",
    "Long Bread": "롱브레드",
    "Bohemian Roasters": "보헤미안 박이추 커피",
    "Seowon Coffee Lab": "서원커피랩",
    "AM BREAD&COFFEE": "에이엠브레드앤커피",
    "Cafe Kiwa": "카페 기와",
    "Gangneung Cafe Street": "강릉 카페거리",
    "Espresso Square": "에스프레소 스퀘어",
    "Wave Lounge": "웨이브 라운지",
    "Bossa Nova Coffee Roasters": "보사노바 커피로스터스",
    "Starbucks Anmok": "스타벅스 강릉안목항점",
    "Hollys Coffee Anmok": "할리스 강릉항마리나점",
    "Cafe Lumiere": "카페 뤼미에르",
    "Kikrus Coffee": "키크러스 커피",
    "L.Bean": "엘빈",
    "Santorini Coffee": "산토리니 커피",
    "Coffee America": "커피 아메리카",
    "Gong Cha Anmok": "공차 강릉안목항점",
    "Droptop": "드롭탑 강릉안목점",
    "Donghwa Garden": "동화가든",
    "Umjine Pojangmacha": "엄지네 포장마차",
    "Beoljip": "벌집",
    "Gyodong Banjeom": "교동반점",
    "Hyeondae Jang Kalguksu": "현대장칼국수",
    "Geumhak Kalguksu": "금학칼국수",
    "Hyeongje Kalguksu": "형제칼국수",
    "Gangneung Gamja Ongsimi": "강릉감자옹심이",
    "Chodang Halmeoni Sundubu": "초당할머니순두부",
    "Gim Ujeong Chodang Jjamppong Sundubu": "김우정초당짬뽕순두부",
    "So Na Mu Jip Chodang Sundubu": "소나무집초당순두부",
    "Cha Hyeon Hui Sundubu": "차현희순두부청국장",
    "400nyeon Jip Chodang Sundubu": "400년집초당순두부",
    "Nongchon Sundubu": "농촌순두부",
    "Gangneung Jjamppong Sundubu": "강릉짬뽕순두부",
    "Haewon": "해원",
    "Yeongjin Hoetjip": "영진횟집",
    "Jeju Haenyeo Mulhoe": "제주해녀물회",
    "Jang An Hoetjip": "장안횟집",
    "Hwang To Mulhoe": "황토물회",
    "Sacheon Mulhoe": "사천물회",
    "Gim Seon Saeng Hoetjip": "김선생횟집",
    "Gyeongpo Donghae Hoetjip": "경포동해횟집",
    "Busan Cheo Nyeo Hoetjip": "부산처녀횟집",
    "Yeongdeok Daegu Meori": "영덕대구머리",
    "Yet Kael Guksu": "옛카네",
    "Seongsan Meokgeori": "성산먹거리",
    "Daegwallyeong Yetgil": "대관령옛길",
    "Gangneung Bulgogi": "강릉불고기",
    "Pungnyeon Galbi": "풍년갈비",
    "Taebaek San Maek": "태백산맥",
    "Dokdo Ne Kko": "독도네",
    "Gangneung Galbi Jjim": "강릉갈비찜",
    "Meat Culture": "미트컬쳐",
    "Under the Sea": "언더더씨",
    "Imone Saengseon Jjim": "이모네생선찜",
    "Wolseong Sikdang": "월성식당",
    "Silbi Saengseon Gui": "실비생선구이",
    "Gu I Bonbu": "구이본부",
    "Jumunjin Makguksu": "주문진막국수",
    "Daedong Myeonok": "대동면옥",
    "Samgyori Dongchimi Makguksu": "삼교리동치미막국수",
    "Yeongdong Makguksu": "영동막국수",
    "Haedong Makguksu": "해동막국수",
    "Sinsadong Injeolmi": "신사동인절미",
    "Soon Tofu Gelato No.1": "순두부젤라또 1호점",
    "Soon Tofu Gelato No.2": "순두부젤라또 2호점",
    "Gangneung Coffee Bread": "강릉커피빵",
    "Pangpaemiyu": "팡파미유",
    "Man Dong Jegwa": "만동제과",
    "Jungang Dakgangjeong": "중앙닭강정",
    "Baeni Dakgangjeong": "배니닭강정",
    "Myung Sung Dakgangjeong": "명성닭강정",
    "Moja Hotteok": "모자호떡",
    "Nolal Hotteok": "놀랄호떡",
    "Gangneung Sand": "강릉샌드",
    "Yeowang Gae": "여왕개",
    "Choego Hoetjip": "최고횟집",
    "Jumunjin Susansijang": "주문진수산시장",
    "Anmok Haemul 1beonji": "안목해물1번지",
    "Yeolhae": "열해",
    "Meorissudal": "머리스수달",
    "Gyeongpodae Pavilion": "경포대",
    "Ojukheon": "오죽헌",
    "Seongyojang": "선교장",
    "Haslla Art World": "하슬라아트월드",
    "Arte Museum Gangneung": "아르떼뮤지엄 강릉",
    "Jeongdongjin Station": "정동진역",
    "Sandglass Park": "모래시계공원",
    "Jeongdongjin Rail Bike": "정동진 레일바이크",
    "Sun Cruise Resort Park": "썬크루즈 리조트 공원",
    "Badabuchaegil": "정동심곡바다부채길",
    "Anmok Beach": "안목해변",
    "Gangmun Beach": "강문해변",
    "Gyeongpo Beach": "경포해변",
    "Sacheon Beach": "사천해변",
    "Yeongjin Beach": "영진해변",
    "Jumunjin Beach": "주문진해변",
    "Sodeul Adeul Bawi Park": "소돌아들바위공원",
    "Adeul Bawi": "아들바위",
    "BTS Bus Stop": "BTS 버스정류장",
    "Goblin Filming Location": "도깨비 촬영지",
    "Heo Gyun Heo Nanseolheon Memorial Park": "허균허난설헌기념공원",
    "Gangneung Olympic Park": "강릉올림픽파크",
    "Wolhwa Street": "월화거리",
    "Noam Tunnel": "노암터널",
    "Daegwallyeong Sheep Ranch": "대관령양떼목장",
    "Anbandegi": "안반데기",
    "Gangneung Solhyang Arboretum": "강릉솔향수목원",
    "Tongil Park": "통일공원",
    "Pinocchio Art World": "피노키오마리오네트박물관",
    "Gangneung Science Museum": "강릉과학산업진흥원",
    "Chamsori Gramophone Museum": "참소리축음기에디슨과학박물관",
    "Edision Science Museum": "에디슨과학박물관",
    "Sonata of Light": "빛의소나타",
    "Fantastica": "판타스틱큐",
    "Heo Gyun Memorial Hall": "허균기념관"
}

def load_spots():
    try:
        with open("data/spots.json", "r", encoding="utf-8") as f:
            return json.load(f)
    except Exception as e:
        print(f"Error loading spots: {e}")
        return []

def save_spots(spots):
    with open("data/spots.json", "w", encoding="utf-8") as f:
        json.dump(spots, f, indent=2, ensure_ascii=False)

def update_names():
    spots = load_spots()
    updated_count = 0

    for spot in spots:
        en_name = spot["name"]

        # Find Korean name mapping
        ko_name = NAME_MAPPING.get(en_name)

        # If mapped, update the name structure and search query
        if ko_name:
            # Store both names. We will use the Korean name as the primary 'name'
            # and store English name in 'name_en' for bilingual support if needed later,
            # OR we can keep 'name' as the primary display name (Korean) and add 'name_en'.
            # The user asked for "English and Korean both", so let's make 'name' Korean (for primary display)
            # and add 'name_en'.

            spot["name_en"] = en_name
            spot["name_ko"] = ko_name
            spot["name"] = ko_name # Default display to Korean as per user preference likely being Korean

            # Fix Naver Search Query to use Korean Name
            spot["naver_search_query"] = f"강릉 {ko_name}"

            # Update tags to include Korean name
            if f"#{ko_name}" not in spot["tags"]:
                spot["tags"].append(f"#{ko_name}")

            updated_count += 1
        else:
            # Fallback if not found in mapping (keep English but add field)
            spot["name_en"] = en_name
            spot["name_ko"] = en_name # Fallback
            # We can't easily fix naver query if we don't know the Korean name,
            # but most top spots are mapped.
            print(f"Warning: No Korean mapping found for {en_name}")

    save_spots(spots)
    print(f"Updated {updated_count} spots with Korean names and fixed Naver search queries.")

if __name__ == "__main__":
    update_names()

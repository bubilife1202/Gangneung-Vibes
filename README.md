# 🌊 강릉 Vibes (G-HotSpot)

강릉의 맛집, 카페, 운동 시설 등 핫플레이스를 한눈에 모아보는 디렉터리 서비스입니다.
클릭 한 번으로 네이버 지도와 연결되어 사용자 편의를 극대화했습니다.

## ✨ 주요 기능

- 🔍 **실시간 검색**: 가게 이름, 태그, 지역으로 빠르게 검색
- 🏷️ **카테고리 필터**: 맛집, 카페, 운동, 숙소로 분류
- 🔥 **HOT 큐레이션**: 지금 가장 핫한 강릉 핫플레이스 추천
- 🗺️ **네이버 지도 연동**: 카드 클릭 시 바로 네이버 지도로 연결
- 📱 **모바일 퍼스트**: 모바일에 최적화된 반응형 디자인

## 🛠️ 기술 스택

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Data**: JSON 파일 (추후 Supabase/Google Sheets 연동 가능)
- **Deployment**: Vercel (권장)

## 🚀 시작하기

### 1. 의존성 설치

```bash
npm install
```

### 2. 개발 서버 실행

```bash
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 열어 확인하세요.

### 3. 프로덕션 빌드

```bash
npm run build
npm start
```

## 📁 프로젝트 구조

```
gangneung-vibes/
├── app/
│   ├── layout.tsx       # 루트 레이아웃 (메타데이터, SEO)
│   ├── page.tsx         # 메인 페이지 (검색, 필터, 리스트)
│   └── globals.css      # 글로벌 스타일
├── components/
│   └── SpotCard.tsx     # 장소 카드 컴포넌트
├── data/
│   └── spots.json       # 장소 데이터 (20개)
├── types/
│   └── spot.ts          # TypeScript 타입 정의
└── public/              # 정적 파일
```

## 📊 데이터 구조

### Spot 타입

```typescript
{
  id: string;
  name: string;
  category_main: "food" | "cafe" | "activity" | "stay";
  category_sub: string;
  tags: string[];
  naver_search_query: string;
  address_short: string;
  rating?: number;
  image_url: string;
  is_hot: boolean;
}
```

### 데이터 추가 방법

`data/spots.json` 파일을 직접 수정하거나, 추후 Google Forms를 통한 제보 기능을 추가할 수 있습니다.

## 🎨 디자인 가이드

### 컬러 팔레트

- **Primary (Deep Ocean Blue)**: `#006994` - 강릉 바다색
- **Accent (Warm Orange)**: `#FF7F50` - 맛집 식욕 자극
- **Background**: `#FFFFFF` - Clean White

### UI/UX 원칙

- **Mobile First**: 모바일 환경 우선 디자인
- **1-Click Navigation**: 카드 클릭 → 네이버 지도 즉시 연결
- **Fast Loading**: 1초 이내 페이지 로딩 목표

## 🔮 향후 개선 계획

### Phase 1 (MVP) ✅
- [x] 기본 UI/UX 구현
- [x] 카테고리 필터링
- [x] 검색 기능
- [x] 네이버 지도 연동

### Phase 2
- [ ] Google Sheets API 연동 (관리자가 엑셀로 데이터 관리)
- [ ] Google Forms 제보 기능 추가
- [ ] 즐겨찾기 기능 (로컬 스토리지)
- [ ] 다크 모드

### Phase 3
- [ ] Supabase 데이터베이스 마이그레이션
- [ ] 사용자 리뷰 시스템
- [ ] 관리자 대시보드
- [ ] 지역별 필터 (교동, 안목, 경포 등)

## 📈 마케팅 전략

1. **SEO 최적화**: "강릉 맛집", "강릉 카페" 등 키워드 타겟팅
2. **커뮤니티 바이럴**: 네이버 카페, 인스타그램 등에 배포
3. **제보 기능**: 사용자가 직접 맛집을 추가할 수 있는 크라우드소싱

## 🤝 기여하기

이 프로젝트는 강릉의 핫플레이스를 함께 만들어가는 오픈 프로젝트입니다.
새로운 장소 제보나 기능 개선 제안은 언제나 환영합니다!

## 📝 라이선스

MIT License

---

**Made with ❤️ in Gangneung**

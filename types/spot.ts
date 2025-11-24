export type Category = "food" | "cafe" | "activity" | "stay" | "business";

export type Mood = "solo" | "date" | "family" | "friends" | "rainy" | "sunrise";

export type TimeOfDay = "morning" | "afternoon" | "evening" | "night";

export interface Spot {
  id: string;
  name: string;
  name_en?: string; // English Name
  name_ko?: string; // Korean Name
  category_main: Category;
  category_sub: string;
  tags: string[];
  naver_search_query: string;
  address_short: string;
  rating?: number;
  image_url: string;
  is_hot: boolean;
  moods?: Mood[];
  best_time?: TimeOfDay[];
  visit_count?: number;
}

export const CATEGORY_LABELS: Record<Category, string> = {
  food: "🍽️ 맛집",
  cafe: "☕ 카페",
  activity: "💪 운동",
  stay: "🏠 숙소",
  business: "💼 비즈니스",
};

export const MOOD_LABELS: Record<Mood, string> = {
  solo: "😊 혼자 조용히",
  date: "💑 데이트",
  family: "👨‍👩‍👧‍👦 가족",
  friends: "👥 친구들과",
  rainy: "☔ 비오는날",
  sunrise: "🌅 일출/일몰",
};

export const TIME_LABELS: Record<TimeOfDay, string> = {
  morning: "🌅 아침",
  afternoon: "☀️ 오후",
  evening: "🌆 저녁",
  night: "🌙 밤",
};

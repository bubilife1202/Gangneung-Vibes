export type Category = "food" | "cafe" | "activity" | "stay";

export interface Spot {
  id: string;
  name: string;
  category_main: Category;
  category_sub: string;
  tags: string[];
  naver_search_query: string;
  address_short: string;
  rating?: number;
  image_url: string;
  is_hot: boolean;
}

export const CATEGORY_LABELS: Record<Category, string> = {
  food: "🍽️ 맛집",
  cafe: "☕ 카페",
  activity: "💪 운동",
  stay: "🏠 숙소",
};

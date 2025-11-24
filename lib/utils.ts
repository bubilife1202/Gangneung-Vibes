import { Spot, TimeOfDay } from "@/types/spot";

// 문자열을 해시 코드로 변환 (시드 생성용)
export function hashCode(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash;
  }
  return Math.abs(hash);
}

// 오늘의 날짜를 기반으로 일일 추천 장소 선택
export function getDailyPick(spots: Spot[], category?: string): Spot {
  const today = new Date().toDateString();
  const seed = hashCode(today + (category || ""));
  const filteredSpots = category
    ? spots.filter((s) => s.category_main === category)
    : spots;
  return filteredSpots[seed % filteredSpots.length];
}

// 현재 시간대 가져오기
export function getCurrentTimeOfDay(): TimeOfDay {
  const hour = new Date().getHours();
  if (hour >= 6 && hour < 12) return "morning";
  if (hour >= 12 && hour < 17) return "afternoon";
  if (hour >= 17 && hour < 21) return "evening";
  return "night";
}

// 시간대별 추천 장소 필터링
export function getRecommendedByTime(spots: Spot[]): Spot[] {
  const currentTime = getCurrentTimeOfDay();
  return spots.filter(
    (spot) => spot.best_time && spot.best_time.includes(currentTime)
  );
}

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

// 로컬 스토리지에서 방문 기록 가져오기
export function getVisitedSpots(): string[] {
  if (typeof window === "undefined") return [];
  const visited = localStorage.getItem("visited_spots");
  return visited ? JSON.parse(visited) : [];
}

// 방문 기록 저장
export function markAsVisited(spotId: string): void {
  if (typeof window === "undefined") return;
  const visited = getVisitedSpots();
  if (!visited.includes(spotId)) {
    visited.push(spotId);
    localStorage.setItem("visited_spots", JSON.stringify(visited));
  }
}

// 챌린지 진행률 계산
export interface Challenge {
  id: string;
  title: string;
  description: string;
  icon: string;
  requiredSpots: string[]; // spot IDs
  badge: string;
}

export const CHALLENGES: Challenge[] = [
  {
    id: "ocean-master",
    title: "오션뷰 마스터",
    description: "오션뷰 카페 5곳 방문",
    icon: "🌊",
    requiredSpots: ["3", "6", "12"], // 툇마루, 안목해변, 카페델문도
    badge: "🏆",
  },
  {
    id: "coffee-hunter",
    title: "커피 헌터",
    description: "강릉 카페 7곳 방문",
    icon: "☕",
    requiredSpots: ["2", "3", "5", "6", "8", "12", "17"], // 카페들
    badge: "🥇",
  },
  {
    id: "local-expert",
    title: "강릉 로컬",
    description: "현지인 맛집 5곳 방문",
    icon: "🎖️",
    requiredSpots: ["1", "4", "7", "11", "14"], // 현지인 맛집들
    badge: "⭐",
  },
  {
    id: "food-explorer",
    title: "맛집 탐험가",
    description: "강릉 맛집 10곳 방문",
    icon: "🍽️",
    requiredSpots: ["1", "4", "7", "11", "13", "14", "16", "20"],
    badge: "👑",
  },
];

export function getChallengeProgress(challenge: Challenge): number {
  const visited = getVisitedSpots();
  const completedCount = challenge.requiredSpots.filter((id) =>
    visited.includes(id)
  ).length;
  return (completedCount / challenge.requiredSpots.length) * 100;
}

export function isChallengCompleted(challenge: Challenge): boolean {
  return getChallengeProgress(challenge) === 100;
}

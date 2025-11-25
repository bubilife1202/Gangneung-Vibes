"use client";

import { useState, useMemo, useEffect } from "react";
import { useRouter } from "next/navigation";
import SpotCard from "@/components/SpotCard";
import {
  Spot,
  Category,
  Mood,
  CATEGORY_LABELS,
  MOOD_LABELS,
  TIME_LABELS,
} from "@/types/spot";
import spotsData from "@/data/spots.json";
import {
  getDailyPick,
  getCurrentTimeOfDay,
  getRecommendedByTime,
} from "@/lib/utils";

export default function Home() {
  const spots = spotsData as Spot[];
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState<Category | "all">(
    "all"
  );
  const [selectedMood, setSelectedMood] = useState<Mood | "all">("all");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (typeof window === "undefined") return;
    history.scrollRestoration = "manual";
    window.scrollTo({ top: 0, behavior: "auto" });
  }, []);

  // 오늘의 추천 (매일 바뀜)
  const dailyPicks = useMemo(() => {
    return {
      food: getDailyPick(spots, "food"),
      cafe: getDailyPick(spots, "cafe"),
      random: getDailyPick(spots),
    };
  }, [spots]);

  // 현재 시간대
  const currentTime = getCurrentTimeOfDay();
  const timeBasedRecommendations = useMemo(
    () => getRecommendedByTime(spots).slice(0, 4),
    [spots]
  );

  // Filter spots based on category, mood, and search query
  const filteredSpots = useMemo(() => {
    return spots.filter((spot) => {
      // Category filter
      const categoryMatch =
        selectedCategory === "all" || spot.category_main === selectedCategory;

      // Mood filter
      const moodMatch =
        selectedMood === "all" ||
        (spot.moods && spot.moods.includes(selectedMood));

      // Search filter (name or tags)
      const searchMatch =
        searchQuery === "" ||
        spot.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        spot.tags.some((tag) =>
          tag.toLowerCase().includes(searchQuery.toLowerCase())
        ) ||
        spot.address_short.toLowerCase().includes(searchQuery.toLowerCase());

      return categoryMatch && moodMatch && searchMatch;
    });
  }, [spots, selectedCategory, selectedMood, searchQuery]);

  // Get hot spots for curation section
  const hotSpots = useMemo(() => {
    return spots.filter((spot) => spot.is_hot).slice(0, 3);
  }, [spots]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Header */}
      <header className="bg-primary text-white shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="text-center mb-4">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">
              🌊 강릉 Vibes
            </h1>
            <p className="text-sm md:text-base text-blue-100">
              매일 새로운 강릉을 발견하세요! 🎲
            </p>
          </div>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-4">
            <div className="relative">
              <input
                type="text"
                placeholder="가게 이름, 태그, 지역으로 검색..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-5 py-3 pr-12 rounded-full text-gray-800 shadow-md focus:outline-none focus:ring-4 focus:ring-accent/50 transition-all"
              />
              <svg
                className="absolute right-4 top-1/2 transform -translate-y-1/2 w-6 h-6 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex gap-2 justify-center flex-wrap">
            <button
              onClick={() => router.push("/routes")}
              className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-full font-semibold text-sm transition-all"
            >
              🗺️ 추천 루트
            </button>
          </div>
        </div>

        {/* Category Filter */}
        <div className="bg-white/95 backdrop-blur-sm border-t border-blue-100 overflow-x-auto">
          <div className="max-w-7xl mx-auto px-4 py-3">
            <div className="flex gap-2 min-w-max justify-center">
              <button
                onClick={() => setSelectedCategory("all")}
                className={`px-5 py-2 rounded-full font-semibold transition-all whitespace-nowrap ${
                  selectedCategory === "all"
                    ? "bg-primary text-white shadow-md"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                전체
              </button>
              {Object.entries(CATEGORY_LABELS).map(([key, label]) => (
                <button
                  key={key}
                  onClick={() => setSelectedCategory(key as Category)}
                  className={`px-5 py-2 rounded-full font-semibold transition-all whitespace-nowrap ${
                    selectedCategory === key
                      ? "bg-primary text-white shadow-md"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Mood Filter */}
        <div className="bg-white border-t border-gray-200 overflow-x-auto">
          <div className="max-w-7xl mx-auto px-4 py-3">
            <div className="flex gap-2 min-w-max justify-center">
              <button
                onClick={() => setSelectedMood("all")}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all whitespace-nowrap ${
                  selectedMood === "all"
                    ? "bg-accent text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                모든 분위기
              </button>
              {Object.entries(MOOD_LABELS).map(([key, label]) => (
                <button
                  key={key}
                  onClick={() => setSelectedMood(key as Mood)}
                  className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all whitespace-nowrap ${
                    selectedMood === key
                      ? "bg-accent text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* 오늘의 강릉 Section (only show when no filters applied) */}
        {selectedCategory === "all" &&
          selectedMood === "all" &&
          searchQuery === "" && (
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-800 mb-2 flex items-center gap-2">
                🎲 오늘의 강릉
              </h2>
              <p className="text-gray-600 mb-6 text-sm">
                매일 바뀌는 추천! 오늘은 어디로 갈까요?
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <div className="mb-2 text-sm font-semibold text-primary">
                    오늘의 맛집 🍽️
                  </div>
                  <SpotCard spot={dailyPicks.food} />
                </div>
                <div>
                  <div className="mb-2 text-sm font-semibold text-primary">
                    오늘의 카페 ☕
                  </div>
                  <SpotCard spot={dailyPicks.cafe} />
                </div>
                <div>
                  <div className="mb-2 text-sm font-semibold text-primary">
                    오늘의 숨은 보석 💎
                  </div>
                  <SpotCard spot={dailyPicks.random} />
                </div>
              </div>
            </section>
          )}

        {/* 시간대별 추천 */}
        {selectedCategory === "all" &&
          selectedMood === "all" &&
          searchQuery === "" &&
          timeBasedRecommendations.length > 0 && (
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-800 mb-2 flex items-center gap-2">
                {TIME_LABELS[currentTime]} 지금 가기 좋은 곳
              </h2>
              <p className="text-gray-600 mb-6 text-sm">
                현재 시간대에 추천하는 장소들이에요
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {timeBasedRecommendations.map((spot) => (
                  <SpotCard key={spot.id} spot={spot} />
                ))}
              </div>
            </section>
          )}

        {/* Hot Spots Curation (only show when no filters applied) */}
        {selectedCategory === "all" &&
          selectedMood === "all" &&
          searchQuery === "" && (
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                🔥 지금 강릉에서 제일 핫한 곳
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {hotSpots.map((spot) => (
                  <SpotCard key={spot.id} spot={spot} />
                ))}
              </div>
            </section>
          )}

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            총{" "}
            <span className="font-bold text-primary">
              {filteredSpots.length}
            </span>
            개의 장소
            {selectedMood !== "all" && (
              <span className="text-sm text-gray-500 ml-2">
                ({MOOD_LABELS[selectedMood]} 필터 적용 중)
              </span>
            )}
          </p>
        </div>

        {/* Spots Grid */}
        {filteredSpots.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSpots.map((spot) => (
              <SpotCard key={spot.id} spot={spot} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">😢</div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              검색 결과가 없습니다
            </h3>
            <p className="text-gray-500">다른 키워드로 검색해보세요</p>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-gray-50 border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 py-8 text-center">
          <p className="text-gray-600 mb-3">
            강릉의 숨은 맛집을 알고 계신가요?
          </p>
          <a
            href="https://forms.gle/example"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-accent text-white px-6 py-3 rounded-full font-semibold hover:bg-accent/90 transition-all shadow-md hover:shadow-lg"
          >
            📝 맛집 제보하기
          </a>
          <p className="text-sm text-gray-500 mt-6">
            © 2024 강릉 Vibes. Made with ❤️ in Gangneung
          </p>
        </div>
      </footer>

    </div>
  );
}

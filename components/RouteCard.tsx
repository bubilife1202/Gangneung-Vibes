"use client";

import { Spot } from "@/types/spot";
import Image from "next/image";

interface Route {
  id: string;
  title: string;
  description: string;
  spots: string[];
  duration: string;
  distance: string;
}

interface RouteCardProps {
  route: Route;
  spots: Spot[];
}

export default function RouteCard({ route, spots }: RouteCardProps) {
  const routeSpots = route.spots
    .map((id) => spots.find((s) => s.id === id))
    .filter((s): s is Spot => s !== undefined);

  // 구글 맵스로 전체 루트 열기 (여러 경유지 지원)
  const handleOpenGoogleMapsRoute = () => {
    const waypoints = routeSpots
      .map((spot) => encodeURIComponent(spot.name + " 강릉"))
      .join("/");
    const googleMapsUrl = `https://www.google.com/maps/dir/${waypoints}`;
    window.open(googleMapsUrl, "_blank");
  };

  // 카카오맵 길찾기 (출발지 → 도착지)
  const handleOpenKakaoRoute = () => {
    if (routeSpots.length < 2) return;
    const start = encodeURIComponent(routeSpots[0].name);
    const end = encodeURIComponent(routeSpots[routeSpots.length - 1].name);
    const kakaoUrl = `https://map.kakao.com/?sName=${start}&eName=${end}`;
    window.open(kakaoUrl, "_blank");
  };

  // 개별 장소를 네이버 지도로 열기
  const handleOpenSpot = (spot: Spot) => {
    const naverMapUrl = `https://m.map.naver.com/search2/search.naver?query=${encodeURIComponent(
      spot.naver_search_query
    )}`;
    window.open(naverMapUrl, "_blank");
  };

  // 모든 장소를 순차적으로 열기
  const handleOpenAllSequentially = () => {
    routeSpots.forEach((spot, index) => {
      setTimeout(() => {
        handleOpenSpot(spot);
      }, index * 500); // 0.5초 간격으로 열기
    });
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-100">
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-2">{route.title}</h3>
        <p className="text-gray-600 text-sm mb-4">{route.description}</p>

        <div className="flex gap-4 mb-4 text-sm">
          <div className="flex items-center gap-1 text-gray-600">
            <span>⏱️</span>
            <span>{route.duration}</span>
          </div>
          <div className="flex items-center gap-1 text-gray-600">
            <span>🚗</span>
            <span>{route.distance}</span>
          </div>
        </div>

        {/* Spot Preview - 클릭 가능 */}
        <div className="space-y-3 mb-4">
          {routeSpots.map((spot, index) => (
            <div
              key={spot.id}
              onClick={() => handleOpenSpot(spot)}
              className="flex items-center gap-3 cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition-all group"
            >
              <div className="flex-shrink-0 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold text-sm group-hover:bg-primary/80 transition-all">
                {index + 1}
              </div>
              <div className="flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden relative">
                <Image
                  src={spot.image_url}
                  alt={spot.name}
                  fill
                  className="object-cover"
                  sizes="64px"
                />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-semibold text-gray-800 truncate group-hover:text-primary transition-colors">
                  {spot.name}
                </h4>
                <p className="text-xs text-gray-500">{spot.address_short}</p>
              </div>
              {index < routeSpots.length - 1 && (
                <div className="text-gray-300 group-hover:text-primary transition-colors">
                  →
                </div>
              )}
              <div className="text-xs text-gray-400 group-hover:text-primary transition-colors">
                클릭
              </div>
            </div>
          ))}
        </div>

        {/* 버튼 그룹 */}
        <div className="space-y-2">
          {/* 구글 맵스 전체 루트 */}
          <button
            onClick={handleOpenGoogleMapsRoute}
            className="w-full bg-primary hover:bg-primary/90 text-white py-3 rounded-xl font-semibold transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2"
          >
            <span>🗺️ 구글 맵스로 전체 루트 보기</span>
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>

          {/* 카카오맵 길찾기 */}
          <button
            onClick={handleOpenKakaoRoute}
            className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-800 py-2.5 rounded-xl font-semibold transition-all shadow-sm hover:shadow-md flex items-center justify-center gap-2 text-sm"
          >
            <span>📍 카카오맵 길찾기 ({routeSpots[0]?.name} → {routeSpots[routeSpots.length - 1]?.name})</span>
          </button>

          {/* 네이버 지도 순차 열기 */}
          <button
            onClick={handleOpenAllSequentially}
            className="w-full bg-green-500 hover:bg-green-600 text-white py-2.5 rounded-xl font-semibold transition-all shadow-sm hover:shadow-md flex items-center justify-center gap-2 text-sm"
          >
            <span>🔗 네이버 지도 순서대로 열기</span>
          </button>
        </div>

        <p className="text-xs text-gray-500 mt-3 text-center">
          💡 위 장소들을 클릭하면 네이버 지도에서 개별적으로 확인할 수 있어요
        </p>
      </div>
    </div>
  );
}

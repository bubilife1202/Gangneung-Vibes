"use client";

import { Spot } from "@/types/spot";
import Image from "next/image";
import { useState } from "react";

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
  const [showDetails, setShowDetails] = useState(false);

  const routeSpots = route.spots
    .map((id) => spots.find((s) => s.id === id))
    .filter((s): s is Spot => s !== undefined);

  if (routeSpots.length === 0) return null;

  const middleSpots = routeSpots.slice(1, -1);

  // 구글 맵스로 전체 루트 열기 (모든 경유지 포함)
  const handleOpenGoogleMapsRoute = () => {
    if (routeSpots.length === 0) return;

    const origin = encodeURIComponent(routeSpots[0].name + " 강릉");
    const destination = encodeURIComponent(
      routeSpots[routeSpots.length - 1].name + " 강릉"
    );
    const waypoints = middleSpots
      .map((spot) => encodeURIComponent(spot.name + " 강릉"))
      .join("|");

    const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&travelmode=driving&origin=${origin}&destination=${destination}${
      waypoints ? `&waypoints=${waypoints}` : ""
    }`;
    window.open(googleMapsUrl, "_blank");
  };

  // 카카오맵 길찾기 - 출발지와 도착지 경로 + 경유지 정보
  const handleOpenKakaoRoute = () => {
    if (routeSpots.length < 2) return;

    const start = routeSpots[0].name + " 강릉";
    const end = routeSpots[routeSpots.length - 1].name + " 강릉";
    const via = middleSpots
      .map((spot) => `&vName=${encodeURIComponent(spot.name + " 강릉")}`)
      .join("");

    const kakaoUrl = `https://map.kakao.com/?sName=${encodeURIComponent(
      start
    )}&eName=${encodeURIComponent(end)}${via}`;
    window.open(kakaoUrl, "_blank");
  };

  // 네이버 지도 길찾기 - 출발지와 도착지 경로
  const handleOpenNaverRoute = () => {
    if (routeSpots.length < 2) return;

    const start = routeSpots[0].naver_search_query;
    const end = routeSpots[routeSpots.length - 1].naver_search_query;
    const via = middleSpots
      .map((spot, index) => `&via${index + 1}=${encodeURIComponent(spot.naver_search_query)}`)
      .join("");

    const naverUrl = `https://map.naver.com/p/directions/?sname=${encodeURIComponent(
      start
    )}&ename=${encodeURIComponent(end)}&pathType=0${via}`;
    window.open(naverUrl, "_blank");
  };

  // 개별 장소를 네이버 지도로 열기
  const handleOpenSpot = (spot: Spot) => {
    const naverMapUrl = `https://m.map.naver.com/search2/search.naver?query=${encodeURIComponent(
      spot.naver_search_query
    )}`;
    window.open(naverMapUrl, "_blank");
  };

  // 장소 리스트 복사
  const handleCopyRoute = () => {
    const routeText = routeSpots.map((spot, i) => `${i + 1}. ${spot.name}`).join('\n');
    navigator.clipboard.writeText(routeText);
    alert('📋 루트가 클립보드에 복사되었습니다!');
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

        {/* 경로 요약 */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-4">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-sm font-semibold text-gray-700">📍 경로 요약</span>
            <button
              onClick={() => setShowDetails(!showDetails)}
              className="text-xs text-blue-600 hover:text-blue-700"
            >
              {showDetails ? '접기 ▲' : '펼치기 ▼'}
            </button>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm">
              <span className="font-semibold text-green-600">출발</span>
              <span className="text-gray-700">{routeSpots[0].name}</span>
            </div>

            {middleSpots.length > 0 && (
              <div className="flex items-start gap-2 text-sm">
                <span className="font-semibold text-orange-600 flex-shrink-0">경유</span>
                <span className="text-gray-600">
                  {middleSpots.map(s => s.name).join(' → ')}
                </span>
              </div>
            )}

            <div className="flex items-center gap-2 text-sm">
              <span className="font-semibold text-red-600">도착</span>
              <span className="text-gray-700">{routeSpots[routeSpots.length - 1].name}</span>
            </div>
          </div>
        </div>

        {/* 상세 장소 리스트 (접었다 펼쳤다) */}
        {showDetails && (
          <div className="space-y-2 mb-4 animate-fadeIn">
            {routeSpots.map((spot, index) => (
              <div
                key={spot.id}
                onClick={() => handleOpenSpot(spot)}
                className="flex items-center gap-3 cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition-all group"
              >
                <div className="flex-shrink-0 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold text-sm group-hover:bg-primary/80 transition-all">
                  {index + 1}
                </div>
                <div className="flex-shrink-0 w-12 h-12 rounded-lg overflow-hidden relative">
                  <Image
                    src={spot.image_url}
                    alt={spot.name}
                    fill
                    className="object-cover"
                    sizes="48px"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-gray-800 text-sm truncate group-hover:text-primary transition-colors">
                    {spot.name}
                  </h4>
                  <p className="text-xs text-gray-500">{spot.address_short}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* 버튼 그룹 */}
        <div className="space-y-2">
          {/* 구글 맵스 전체 루트 (메인 추천) */}
          <button
            onClick={handleOpenGoogleMapsRoute}
            className="w-full bg-primary hover:bg-primary/90 text-white py-3 rounded-xl font-semibold transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2"
          >
            <span>🗺️ 구글맵 전체 경로 보기</span>
            <span className="text-xs bg-white/20 px-2 py-0.5 rounded-full">추천</span>
          </button>

          {/* 2열 버튼 그룹 */}
          <div className="grid grid-cols-2 gap-2">
            {/* 카카오맵 길찾기 */}
            <button
              onClick={handleOpenKakaoRoute}
              className="bg-yellow-400 hover:bg-yellow-500 text-gray-800 py-2.5 rounded-xl font-semibold transition-all shadow-sm hover:shadow-md flex items-center justify-center gap-1 text-sm"
            >
              <span>📍 카카오맵</span>
            </button>

            {/* 네이버 지도 길찾기 */}
            <button
              onClick={handleOpenNaverRoute}
              className="bg-green-500 hover:bg-green-600 text-white py-2.5 rounded-xl font-semibold transition-all shadow-sm hover:shadow-md flex items-center justify-center gap-1 text-sm"
            >
              <span>🧭 네이버</span>
            </button>
          </div>

          {/* 추가 옵션들 */}
          <div className="grid grid-cols-1 gap-2">
            <button
              onClick={handleCopyRoute}
              className="bg-gray-500 hover:bg-gray-600 text-white py-2 rounded-lg font-medium transition-all text-xs"
            >
              📋 복사
            </button>
          </div>
        </div>

        <div className="mt-3 text-xs text-gray-500 space-y-1">
          <p className="flex items-start gap-1">
            <span>💡</span>
            <span><strong>구글맵</strong>은 모든 경유지를 포함한 최적 경로를 보여줍니다</span>
          </p>
          <p className="flex items-start gap-1">
            <span>📍</span>
            <span><strong>카카오맵/네이버</strong>는 출발지→도착지 경로를 보여줍니다 (중간 경유지는 직접 추가 필요)</span>
          </p>
        </div>
      </div>
    </div>
  );
}

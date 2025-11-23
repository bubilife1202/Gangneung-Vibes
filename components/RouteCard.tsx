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

  const handleOpenRoute = () => {
    // 모든 장소를 경유지로 포함하는 네이버 지도 URL 생성
    const queries = routeSpots
      .map((spot) => encodeURIComponent(spot.naver_search_query))
      .join(",");
    const naverMapUrl = `https://m.map.naver.com/search2/search.naver?query=${queries}`;
    window.open(naverMapUrl, "_blank");
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

        {/* Spot Preview */}
        <div className="space-y-3 mb-4">
          {routeSpots.map((spot, index) => (
            <div key={spot.id} className="flex items-center gap-3">
              <div className="flex-shrink-0 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold text-sm">
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
                <h4 className="font-semibold text-gray-800 truncate">
                  {spot.name}
                </h4>
                <p className="text-xs text-gray-500">{spot.address_short}</p>
              </div>
              {index < routeSpots.length - 1 && (
                <div className="text-gray-300">→</div>
              )}
            </div>
          ))}
        </div>

        <button
          onClick={handleOpenRoute}
          className="w-full bg-primary hover:bg-primary/90 text-white py-3 rounded-xl font-semibold transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2"
        >
          <span>네이버 지도로 루트 보기</span>
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
      </div>
    </div>
  );
}

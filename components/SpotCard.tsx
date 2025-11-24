"use client";

import { Spot, CATEGORY_LABELS } from "@/types/spot";
import Image from "next/image";

interface SpotCardProps {
  spot: Spot;
}

export default function SpotCard({ spot }: SpotCardProps) {
  const handleClick = () => {
    const naverMapUrl = `https://m.map.naver.com/search2/search.naver?query=${encodeURIComponent(
      spot.naver_search_query
    )}`;
    window.open(naverMapUrl, "_blank");
  };

  return (
    <div
      onClick={handleClick}
      className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden hover:scale-105 active:scale-95"
    >
      <div className="relative h-48 w-full">
        <Image
          src={spot.image_url}
          alt={spot.name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        {spot.is_hot && (
          <div className="absolute top-3 right-3 bg-accent text-white px-3 py-1 rounded-full text-sm font-bold shadow-md">
            🔥 HOT
          </div>
        )}
        <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-semibold text-primary">
          {CATEGORY_LABELS[spot.category_main]}
        </div>
      </div>

      <div className="p-5">
        <h3 className="text-xl font-bold text-gray-800 mb-1">{spot.name}</h3>
        {spot.name_en && spot.name_en !== spot.name && (
          <p className="text-sm text-gray-500 mb-2">{spot.name_en}</p>
        )}

        <div className="flex items-center gap-2 mb-3 mt-2">
          <span className="text-sm text-gray-600 bg-gray-100 px-2 py-1 rounded">
            📍 {spot.address_short}
          </span>
          {spot.rating && (
            <span className="text-sm text-amber-600 font-semibold">
              ⭐ {spot.rating}
            </span>
          )}
        </div>

        <div className="flex flex-wrap gap-2 mb-3">
          {spot.tags.slice(0, 3).map((tag, index) => (
            <span
              key={index}
              className="text-xs text-primary bg-primary/10 px-2 py-1 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-100">
          <span className="text-sm text-gray-500">{spot.category_sub}</span>
          <span className="text-sm font-semibold text-primary flex items-center gap-1">
            지도 보기
            <svg
              className="w-4 h-4"
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
          </span>
        </div>
      </div>
    </div>
  );
}

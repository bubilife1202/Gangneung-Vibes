"use client";

import Link from "next/link";
import { useEffect } from "react";
import RouteCard from "@/components/RouteCard";
import spotsData from "@/data/spots.json";
import routesData from "@/data/routes.json";
import { Spot } from "@/types/spot";

export default function RoutesPage() {
  const routes = routesData;
  const spots = spotsData as Spot[];

  useEffect(() => {
    if (typeof window === "undefined") return;
    history.scrollRestoration = "manual";
    window.scrollTo({ top: 0, behavior: "auto" });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <header className="bg-primary text-white shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-6 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold">🗺️ 추천 루트</h1>
              <p className="text-sm md:text-base text-blue-100">
                원하는 경로를 선택하고 지도로 바로 확인하세요.
              </p>
            </div>
            <Link
              href="/"
              className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-full font-semibold text-sm transition-all"
            >
              ⬅️ 홈으로
            </Link>
          </div>
          <div className="text-sm text-blue-100">
            지도 앱이 새로고침되더라도 항상 맨 위에서 시작할 수 있도록
            준비했어요.
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {routes.map((route) => (
            <RouteCard key={route.id} route={route} spots={spots} />
          ))}
        </div>
      </main>
    </div>
  );
}

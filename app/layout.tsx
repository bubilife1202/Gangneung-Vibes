import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "강릉 Vibes - 강릉 핫플레이스 모음",
  description: "강릉의 맛집, 카페, 운동 시설을 한눈에! 네이버 지도로 바로 연결되는 강릉 핫플 디렉터리",
  keywords: ["강릉", "강릉 맛집", "강릉 카페", "강릉 여행", "강릉 핫플", "강릉 맛집 지도", "강릉 현지인 맛집"],
  openGraph: {
    title: "강릉 Vibes - 강릉 핫플레이스 모음",
    description: "강릉의 맛집, 카페, 운동 시설을 한눈에!",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}

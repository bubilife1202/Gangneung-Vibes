"use client";

import { useEffect, useState } from "react";
import {
  CHALLENGES,
  getChallengeProgress,
  isChallengCompleted,
  getVisitedSpots,
  markAsVisited,
} from "@/lib/utils";

interface ChallengeModalProps {
  onClose: () => void;
}

export default function ChallengeModal({ onClose }: ChallengeModalProps) {
  const [visitedSpots, setVisitedSpots] = useState<string[]>([]);

  useEffect(() => {
    setVisitedSpots(getVisitedSpots());
  }, []);

  const handleTestVisit = (spotId: string) => {
    markAsVisited(spotId);
    setVisitedSpots(getVisitedSpots());
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 animate-fadeIn">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-800">🏆 강릉 챌린지</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl"
          >
            ✕
          </button>
        </div>

        <div className="p-6">
          <p className="text-gray-600 mb-6">
            강릉의 명소를 방문하고 뱃지를 모아보세요! 카드를 클릭하면 방문
            체크됩니다.
          </p>

          <div className="space-y-4">
            {CHALLENGES.map((challenge) => {
              const progress = getChallengeProgress(challenge);
              const completed = isChallengCompleted(challenge);
              const visitedCount = challenge.requiredSpots.filter((id) =>
                visitedSpots.includes(id)
              ).length;

              return (
                <div
                  key={challenge.id}
                  className={`border-2 rounded-xl p-5 transition-all ${
                    completed
                      ? "border-accent bg-accent/5"
                      : "border-gray-200 hover:border-primary"
                  }`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="text-4xl">{challenge.icon}</div>
                      <div>
                        <h3 className="font-bold text-lg text-gray-800">
                          {challenge.title}
                          {completed && (
                            <span className="ml-2 text-2xl">
                              {challenge.badge}
                            </span>
                          )}
                        </h3>
                        <p className="text-sm text-gray-600">
                          {challenge.description}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="mb-3">
                    <div className="flex items-center justify-between text-sm mb-2">
                      <span className="text-gray-600">진행률</span>
                      <span className="font-semibold text-primary">
                        {visitedCount}/{challenge.requiredSpots.length}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${
                          completed ? "bg-accent" : "bg-primary"
                        }`}
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  </div>

                  {completed && (
                    <div className="bg-accent/10 border border-accent rounded-lg p-3 text-center">
                      <p className="text-accent font-semibold">
                        🎉 챌린지 완료! 축하합니다!
                      </p>
                    </div>
                  )}

                  {/* Test buttons (개발용 - 나중에 제거) */}
                  <div className="mt-3 pt-3 border-t border-gray-100">
                    <p className="text-xs text-gray-500 mb-2">
                      테스트: 방문 체크하기
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {challenge.requiredSpots.map((spotId) => {
                        const isVisited = visitedSpots.includes(spotId);
                        return (
                          <button
                            key={spotId}
                            onClick={() => handleTestVisit(spotId)}
                            className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                              isVisited
                                ? "bg-green-500 text-white"
                                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                            }`}
                          >
                            {isVisited ? "✓" : ""} Spot #{spotId}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-6 bg-blue-50 border border-blue-200 rounded-xl p-4">
            <p className="text-sm text-gray-700">
              💡 <strong>Tip:</strong> 장소 카드를 클릭하여 네이버 지도로
              이동하면 자동으로 방문 체크됩니다. (실제 구현 시)
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

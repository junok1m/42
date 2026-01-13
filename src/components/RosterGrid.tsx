import React from "react";
import type { RosterModel } from "../types";
import { Link } from "react-router-dom";

interface RosterGridProps {
  models: RosterModel[] | undefined | null; // ✅ 방어 위해 넓힘
  activeTab: "today" | "tomorrow";
}

const RosterGrid: React.FC<RosterGridProps> = ({ models, activeTab }) => {
  const safeModels = Array.isArray(models) ? models : [];

  if (safeModels.length === 0) {
    // ✅ 로딩중/빈값일 때 뻥 뚫린 화면 방지 (원하면 지워도 됨)
    return (
      <div className="text-center text-[#c9c2a2] py-10">
        Loading roster...
      </div>
    );
  }

  return (
    // ✅ 진짜 100vw 풀폭
    <div className="w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw]">
      <div className="grid grid-cols-2 gap-0 sm:gap-5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 md:gap-8">
        {safeModels.map((model) => (
          <Link
            key={model.id}
            to={`/profile/${model.slug}`}
            state={{ fromTab: activeTab, workingTime: model.workingTime }}
            className="group block relative"
          >
            {/* NEW badge */}
            {model.isNew && (
              <span
                className="absolute top-3 right-3 z-20 px-2 py-0.5 text-[10px] font-semibold tracking-wide text-amber-50
                  bg-gradient-to-br from-[#b64a4a] to-[#802020]
                  animate-[pulseGlow_3s_ease-in-out_infinite]"
              >
                NEW
              </span>
            )}

            {/* REAL badge */}
            {model.isRealPhoto && (
              <span
                className="absolute top-3 left-3 z-20 px-2 py-0.5 text-[10px] font-semibold tracking-wide text-[#1a1610]
                  bg-gradient-to-br from-[#e3d19b] to-[#bfa663]
                  animate-[goldGlow_4s_ease-in-out_infinite]"
              >
                REAL
              </span>
            )}

            {/* Image Card */}
            <div className="relative w-full aspect-[3/4] overflow-hidden">
              <img
                src={model.image}
                alt={model.name}
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover object-[center_35%]
                  transition-transform duration-700 group-hover:scale-105"
              />

              {/* ✅ Velvet overlay */}
              <div
                className="absolute inset-0 bg-gradient-to-t
    from-[#050403]/70
    via-[#050403]/30
    to-transparent
    [background-position:bottom]
  "
              />


              {/* ✅ Caption on image (bottom-left) */}
              <div className="absolute inset-0 flex flex-col justify-end items-start p-3 sm:p-4 pointer-events-none">

                {/* name + nationality (same line) */}
                <div className="flex items-baseline gap-2">
                  <h3
                    className="font-serif text-white text-2xl sm:text-5xl font-semibold leading-tight ml-2"
                    style={{ textShadow: "0 0 12px rgba(0,0,0,0.9)" }}
                  >
                    {model.name}
                  </h3>

                  <span
                    className="text-[#d2b97b] text-sm sm:text-base uppercase tracking-[0.12em]"
                    style={{ textShadow: "0 0 10px rgba(0,0,0,0.9)" }}
                  >
                    · {model.nationality}
                  </span>
                </div>

                {/* working time (next line) */}
                {model.workingTime && (
                  <p
                    className="font-sans text-gray-200 text-lg sm:text-sm mt-1 flex items-center"
                    style={{ textShadow: "0 0 10px rgba(0,0,0,0.9)" }}
                  >
                    <span className="w-2 h-2 bg-[#d2b97b] rounded-full mr-2 shadow-[0_0_6px_#bfa663]" />
                    {model.workingTime}
                  </p>
                )}
              </div>

            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default RosterGrid;

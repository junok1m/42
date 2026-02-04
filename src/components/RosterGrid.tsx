import React, { useMemo } from "react";
import type { RosterModel } from "../types";
import { Link } from "react-router-dom";

interface RosterGridProps {
  models: RosterModel[] | undefined | null; // ✅ 방어 위해 넓힘
  activeTab: "today" | "tomorrow";
}

function shuffle<T>(array: T[]) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

const RosterGrid: React.FC<RosterGridProps> = ({ models, activeTab }) => {
  const safeModels = Array.isArray(models) ? models : [];

  // ✅ Option A: stable shuffle per session, per tab
  const shuffleKey = useMemo(() => {
    return ["42g", activeTab].join("::");
  }, [activeTab]);

  const orderedModels = useMemo(() => {
    if (safeModels.length === 0) return [];

    const cacheKey = `roster-shuffle:${shuffleKey}`;
    const cached = sessionStorage.getItem(cacheKey);

    if (cached) {
      try {
        const ids = JSON.parse(cached) as number[];
        const map = new Map(safeModels.map((m) => [m.id, m]));
        const ordered = ids.map((id) => map.get(id)).filter(Boolean) as RosterModel[];

        // roster changed? append newcomers
        if (ordered.length !== safeModels.length) {
          const seen = new Set(ordered.map((m) => m.id));
          const missing = safeModels.filter((m) => !seen.has(m.id));
          return [...ordered, ...missing];
        }

        return ordered;
      } catch {
        // fall through and reshuffle
      }
    }

    const newOnes = safeModels.filter((m) => m.isNew);
    const rest = safeModels.filter((m) => !m.isNew);
    const shuffled = [...newOnes, ...shuffle(rest)];

    sessionStorage.setItem(cacheKey, JSON.stringify(shuffled.map((m) => m.id)));
    return shuffled;
  }, [safeModels, shuffleKey]);

  if (safeModels.length === 0) {
    return <div className="text-center text-[#c9c2a2] py-10">Loading roster...</div>;
  }

  return (
    <div className="w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw]">
      <div className="grid grid-cols-2 gap-0 sm:gap-5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 md:gap-8">
        {orderedModels.map((model) => (
          <Link
            key={model.id}
            to={`/profile/${model.slug}`}
            state={{ fromTab: activeTab, workingTime: model.workingTime }}
            className="group block relative"
          >
     
           



            {/* Image Card */}
            <div className="relative w-full aspect-[3/4] overflow-hidden">
              <img
                src={model.image}
                alt={model.name}
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover object-[center_35%]
                  transition-transform duration-700 group-hover:scale-105"
              />

              {/* Velvet overlay */}
              <div
                className="absolute inset-0 bg-gradient-to-t
                  from-[#050403]/70
                  via-[#050403]/30
                  to-transparent
                  [background-position:bottom]"
              />

              {/* Caption */}
              <div className="absolute inset-0 flex flex-col justify-end items-start p-3 sm:p-4 pointer-events-none">
                <div className="flex items-baseline gap-2 ml-2">
                  {model.isNew && (
                    <span
  className="
    px-1.5 py-0.5
    text-[10px] font-semibold tracking-[0.14em]
    text-[#2a2212]
    bg-gradient-to-br from-[#f3e6b3] via-[#e6d089] to-[#bfa663]
    shadow-[0_1px_0_rgba(255,255,255,0.55),0_6px_12px_rgba(0,0,0,0.35)]
  "
  style={{
    textShadow: "0 1px 0 rgba(255,255,255,0.45)",
    animation: "goldGlow 4.2s ease-in-out infinite",
  }}
>
  NEW
</span>

                  )}

                  <h3
                    className="font-serif text-white text-2xl sm:text-5xl font-semibold leading-tight"
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

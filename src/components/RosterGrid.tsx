import { useMemo } from "react";
import { Link, useLocation } from "react-router-dom";
import type { RosterModel } from "../types";
import { orderRosterModels } from "../utils/shuffle";

interface RosterGridProps {
  models?: RosterModel[] | null;
  activeTab: "today" | "tomorrow";
}

const EMPTY_MODELS: RosterModel[] = [];


function RosterGrid({ models, activeTab }: RosterGridProps) {
  const location = useLocation();
  const safeModels = models ?? EMPTY_MODELS;
  const orderedModels = useMemo(
    () => orderRosterModels(safeModels, activeTab),
    [safeModels, activeTab]
  );

  if (models == null) {
    return (
      <div className="text-center text-[#c9c2a2] py-10">Loading roster...</div>
    );
  }
  if (models.length === 0) {
    return (
      <div className="text-center text-[#c9c2a2] py-10">No one on roster.</div>
    );
  }

  return (
    <div className="w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw]">
      <div className="grid grid-cols-2 gap-0 sm:gap-5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 md:gap-8">
        {orderedModels.map((model) => (
          <Link
          key={model.id}
          to={`/profile/${model.slug}`}
          state={{
            backgroundLocation: location,
            fromTab: activeTab,
            workingTime: model.workingTime,
            provider: model,
          }}
          className="group relative block"
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
              <div className="absolute inset-0 flex flex-col justify-end items-start p-2.5 sm:p-3 pointer-events-none">
                <div className="flex items-baseline gap-1.5">
                  {model.isNew && (
                    <span
                      className="
                    px-1 py-0.5
                    text-[8px] font-semibold tracking-[0.12em]
                    text-[#2a2212]
                    bg-gradient-to-br from-[#f3e6b3] via-[#e6d089] to-[#bfa663]
                    shadow-[0_1px_0_rgba(255,255,255,0.55),0_4px_8px_rgba(0,0,0,0.3)]
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
                    className="font-serif text-white text-lg sm:text-2xl font-semibold leading-tight"
                    style={{ textShadow: "0 0 12px rgba(0,0,0,0.9)" }}
                  >
                    {model.name}
                  </h3>

                  <span
                    className="text-[#d2b97b] text-[10px] sm:text-xs uppercase tracking-[0.1em]"
                    style={{ textShadow: "0 0 10px rgba(0,0,0,0.9)" }}
                  >
                    · {model.nationality}
                  </span>
                </div>

                {model.workingTime && (
                  <p
                    className="font-sans text-gray-200 text-xs sm:text-sm mt-1 flex items-center"
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
}

export default RosterGrid;

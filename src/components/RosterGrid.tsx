import React, { useMemo } from "react";
import type { RosterModel } from "../types/index.ts";

interface RosterGridProps {
  models: RosterModel[];
}

const RosterGrid: React.FC<RosterGridProps> = ({ models }) => {
  const stableAvailableTimes = useMemo(() => {
    return models.reduce((acc, model) => {
      if (!model.isAvailableNow) {
        const hour = Math.floor(Math.random() * 12) + 1;
        const minute = ["00", "15", "30", "45"][Math.floor(Math.random() * 4)];
        const period = Math.random() > 0.5 ? "PM" : "AM";
        acc[model.id] = `${hour}:${minute} ${period}`;
      }
      return acc;
    }, {} as Record<string, string>);
  }, [models.length]);

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5 md:gap-8">
      {models.map((model) => (
        <a
          key={model.id}
          href={model.profileLink}
          className="group block relative transition-transform duration-500 hover:-translate-y-1"
        >
          {/* NEW badge */}
          {model.isNew && (
            <span className="absolute top-3 right-3 bg-gradient-to-br from-[#b64a4a] to-[#802020] text-amber-50 text-[10px] px-2 py-0.5 font-semibold tracking-wide shadow-lg z-20">
              NEW
            </span>
          )}

          {/* Framed image */}
          <div className="relative aspect-[3/4]">
            <div className="absolute inset-[18%] overflow-hidden rounded-[2px] shadow-[inset_0_0_20px_rgba(0,0,0,0.6)]">
              <img
                src={model.image}
                alt={model.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>

            {/* Ornate frame */}
            <img
              src="/frame.svg"
              alt=""
              className="absolute inset-0 w-full h-full pointer-events-none select-none z-[1]"
            />
          </div>

          {/* Text info */}
          <div className="pl-4 mt-3">
            <p className="text-[11px] uppercase tracking-[0.15em] text-[#d2b97b]/80 mb-1 font-serif">
              {model.nationality}
            </p>

            <h3 className="font-serif text-lg font-semibold bg-clip-text text-transparent bg-gradient-to-r from-[#e3d19b] to-[#bfa663] mb-1">
              {model.name} (25)
            </h3>

            <p className="text-sm text-[#c9c2a2] font-sans flex items-center mb-1">
              <span className="w-2 h-2 bg-[#d2b97b] rounded-full mr-2 shadow-[0_0_6px_#bfa663]"></span>
              {model.workingTime}
            </p>

            {model.isAvailableNow ? (
              <p className="text-[#aee3b0] font-sans text-sm flex items-center">
                <span className="w-1.5 h-1.5 bg-[#98e0a5] rounded-full mr-2 animate-pulse shadow-[0_0_8px_#98e0a5]" />
                Available&nbsp;Now
              </p>
            ) : (
              <p className="text-[#8a877a] font-sans text-sm flex items-center">
                <span className="w-1.5 h-1.5 bg-[#6f6b60] rounded-full mr-2" />
                Next&nbsp;Available&nbsp;{stableAvailableTimes[model.id]}
              </p>
            )}
          </div>
        </a>
      ))}
    </div>
  );
};

export default RosterGrid;

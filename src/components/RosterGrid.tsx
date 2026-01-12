import React from "react";
import type { RosterModel } from "../types/index.ts";
import { Link } from "react-router-dom";

interface RosterGridProps {
  models: RosterModel[];
  activeTab: "today" | "tomorrow";
}

const RosterGrid: React.FC<RosterGridProps> = ({ models, activeTab }) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5 md:gap-8">
      {models.map((model) => (
        <Link
  key={model.id}
  to={`/profile/${model.slug}`}
  state={{ 
    fromTab: activeTab,
    workingTime: model.workingTime, }}
  className="group block relative transition-transform duration-500 hover:-translate-y-1"
>

          {/* NEW badge */}
          {model.isNew && (
            <span className="absolute top-3 right-3 bg-gradient-to-br from-[#b64a4a] to-[#802020] text-amber-50 text-[10px] px-2 py-0.5 font-semibold tracking-wide shadow-lg z-20">
              NEW
            </span>
          )}
{/* REAL badge */}
{model.isRealPhoto && (
  <span
    className="absolute top-3 left-3 bg-gradient-to-br from-[#e3d19b] to-[#bfa663] text-[#1a1610] text-[10px] px-2 py-0.5 font-semibold tracking-wide z-20"
    style={{ boxShadow: "0 0 10px rgba(191,166,99,0.65)" }}
  >
    REAL
  </span>
)}
          {/* Image without frame */}
          <div className="relative w-full aspect-[3/4] overflow-hidden border border-[#bfa663]/30">
            <img
              src={model.image}
              alt={model.name}
              className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
              loading="lazy"
            />
          </div>

          {/* Text info */}
          <div className="pl-4 mt-3">
            <h3 className="font-serif text-2xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-[#e3d19b] to-[#bfa663] mb-1">
              {model.name} ·{" "}
              <span className="text-[16px] uppercase tracking-[0.15em] text-[#d2b97b]/80">
                {model.nationality}
              </span>
            </h3>

            {model.workingTime && (
              <p className="text-lg text-[#c9c2a2] font-sans flex items-center mb-1">
                <span className="w-2 h-2 bg-[#d2b97b] rounded-full mr-2 shadow-[0_0_6px_#bfa663]"></span>
                {model.workingTime}
              </p>
            )}
          </div>
        </Link>
      ))}
    </div>
  );
};

export default RosterGrid;

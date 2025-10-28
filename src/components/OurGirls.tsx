import React, { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { Model } from "../types/index.ts";

interface OurGirlsProps {
  models: Model[];
}

const OurGirls: React.FC<OurGirlsProps> = ({ models }) => {
  const [currentModelIndex, setCurrentModelIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const [visibleCount, setVisibleCount] = useState(
    window.innerWidth < 768 ? 3 : 5
  );

  /** handle resize **/
  useEffect(() => {
    const handleResize = () =>
      setVisibleCount(window.innerWidth < 768 ? 3 : 5);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  /** autoplay **/
  useEffect(() => {
    if (!isAutoPlaying) return;
    const timer = setInterval(() => {
      setCurrentModelIndex((prev) => (prev + 1) % models.length);
    }, 6500);
    return () => clearInterval(timer);
  }, [isAutoPlaying, models.length]);

  const handleNavigation = (direction: "next" | "prev") => {
    setIsAutoPlaying(false);
    if (direction === "next") {
      setCurrentModelIndex((prev) => (prev + 1) % models.length);
    } else {
      setCurrentModelIndex(
        (prev) => (prev - 1 + models.length) % models.length
      );
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
    setIsAutoPlaying(false);
  };
  const handleTouchEnd = () => {
    const diff = touchStartX.current - touchEndX.current;
    if (Math.abs(diff) > 50) {
      handleNavigation(diff > 0 ? "next" : "prev");
    }
  };

  const getVisibleModels = () => {
    const result = [];
    const total = models.length;
    for (let i = 0; i < visibleCount; i++) {
      const index =
        (currentModelIndex - Math.floor(visibleCount / 2) + i + total) % total;
      result.push({
        ...models[index],
        position: i,
        isCenter: i === Math.floor(visibleCount / 2),
      });
    }
    return result;
  };

  /** progress indicator **/
  const segmentCount = 7;
  const segmentSize = models.length / segmentCount;
  const activeSegment = Math.floor(currentModelIndex / segmentSize);
  const jumpToSegment = (segmentIndex: number) => {
    const targetIndex = Math.floor(segmentIndex * segmentSize);
    setCurrentModelIndex(targetIndex);
    setIsAutoPlaying(false);
  };

  return (
    <section
      className="relative py-24 backdrop-blur-[0.5px]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* divider */}
        <div className="flex items-center justify-center mb-40">
          <div className="h-px w-16 bg-gradient-to-r from-transparent to-[#bfa663]/40"></div>
          <div className="mx-4 w-2 h-2 bg-[#bfa663]/40 rotate-45"></div>
          <div className="h-px w-16 bg-gradient-to-l from-transparent to-[#bfa663]/40"></div>
        </div>

        {/* title */}
        <h2
          className="text-3xl md:text-4xl font-serif font-bold text-center mb-24
          text-transparent bg-clip-text bg-gradient-to-r from-[#e8d6a8] to-[#bfa663]"
        >
          Our Girls
        </h2>

        {/* carousel */}
        <div className="relative overflow-visible pb-16">
          <div
            className="flex items-center justify-center gap-3 sm:gap-6 py-8"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {getVisibleModels().map((model) => (
              <div
                key={`${model.id}-${model.position}`}
                className={`transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] flex-shrink-0 ${
                  model.isCenter
                    ? "w-52 sm:w-64 md:w-72 opacity-100 scale-105 z-10"
                    : "w-36 sm:w-44 md:w-52 opacity-40 scale-90"
                }`}
              >
                <a
                  href={model.isCenter ? model.profileLink : "#"}
                  onClick={(e) => {
                    if (!model.isCenter) {
                      e.preventDefault();
                      const diff =
                        model.position - Math.floor(visibleCount / 2);
                      setCurrentModelIndex(
                        (currentModelIndex + diff + models.length) %
                          models.length
                      );
                      setIsAutoPlaying(false);
                    }
                  }}
                  className="block cursor-pointer"
                >
                  <div className="relative overflow-visible transition-shadow">
                    <div className="relative aspect-[2/3]">
                      <div className="absolute inset-[2%] overflow-hidden shadow-[inset_0_0_20px_rgba(0,0,0,0.55)]">
                        <img
                          src={model.image}
                          alt={model.name}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* frame2 */}
                      <img
                        src="/frame2.svg"
                        alt=""
                        className="absolute inset-0 w-full h-full pointer-events-none z-10"
                      />

                      {/* gold halo */}
                      {model.isCenter && (
                        <div className="absolute inset-[-3%] rounded-lg blur-[3px] shadow-[0_0_40px_15px_rgba(191,166,99,0.15)] pointer-events-none z-20"></div>

                      )}
                    </div>

                    {/* hover overlay */}
                    {model.isCenter && (
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500 z-30">
                        <div className="absolute bottom-0 left-0 right-0 p-4">
                          <span className="inline-block text-xs px-2 py-0.5 rounded-full border border-[#bfa663]/40 bg-[#1a1610]/60 text-[#e8d6a8] mb-2">
                            {model.nationality}
                          </span>
                          <p className="text-[#fef9e7] font-serif text-lg font-semibold tracking-wide">
                            {model.name}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* name below */}
                  {model.isCenter && (
                    <div className="text-center mt-4 px-2">
                      <p className="text-xs font-serif text-[#e8d6a8]/70 tracking-wide mb-1">
                        {model.nationality}
                      </p>
                      <h3 className="font-serif font-bold text-lg text-transparent bg-clip-text bg-gradient-to-r from-[#e8d6a8] to-[#bfa663] tracking-wide">
                        {model.name} (25)
                      </h3>
                    </div>
                  )}
                </a>
              </div>
            ))}
          </div>

          {/* arrows */}
          <button
            onClick={() => handleNavigation("prev")}
            className="absolute left-0 top-1/2 -translate-y-1/2 text-[#bfa663] hover:text-[#e8d6a8] transition-all z-40 hover:scale-110"
          >
            <ChevronLeft className="w-8 h-8 sm:w-10 sm:h-10" />
          </button>
          <button
            onClick={() => handleNavigation("next")}
            className="absolute right-0 top-1/2 -translate-y-1/2 text-[#bfa663] hover:text-[#e8d6a8] transition-all z-40 hover:scale-110"
          >
            <ChevronRight className="w-8 h-8 sm:w-10 sm:h-10" />
          </button>

          {/* progress dots */}
          <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 flex space-x-3">
            {Array.from({ length: segmentCount }).map((_, i) => {
              const isActive = i === activeSegment;
              return (
                <button
                  key={i}
                  onClick={() => jumpToSegment(i)}
                  className={`transition-all duration-500 rounded-full ${
                    isActive
                      ? "w-8 h-2 bg-gradient-to-r from-[#e8d6a8] to-[#bfa663] shadow-[0_0_10px_rgba(191,166,99,0.6)]"
                      : "w-2 h-2 bg-[#bfa663]/30 hover:bg-[#bfa663]/50"
                  }`}
                />
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurGirls;

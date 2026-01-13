import React, { useMemo, useState } from "react";
import { Filter, X } from "lucide-react";

interface RosterFiltersProps {
  allNationalities: string[];
  allServices: string[];
  selectedNationalities: string[];
  selectedServices: string[];

  // keep these so parent doesn't break (unused now)
  isDropdownOpen: boolean;
  isServicesDropdownOpen: boolean;
  setIsDropdownOpen: (open: boolean) => void;
  setIsServicesDropdownOpen: (open: boolean) => void;

  toggleNationality: (nationality: string) => void;
  toggleService: (service: string) => void;
  setSelectedNationalities: (n: string[]) => void;
  setSelectedServices: (s: string[]) => void;

  activeFilterCount?: number;
  pageText?: string;
}

const RosterFilters: React.FC<RosterFiltersProps> = ({
  allNationalities,
  allServices,
  selectedNationalities,
  selectedServices,
  setIsDropdownOpen,
  setIsServicesDropdownOpen,
  toggleNationality,
  toggleService,
  setSelectedNationalities,
  setSelectedServices,
  activeFilterCount,
  pageText,
}) => {
  const [showFilters, setShowFilters] = useState(false);

  const computedActiveCount = useMemo(
    () => selectedNationalities.length + selectedServices.length,
    [selectedNationalities.length, selectedServices.length]
  );

  const count = activeFilterCount ?? computedActiveCount;

  const clearFilters = () => {
    setSelectedNationalities([]);
    setSelectedServices([]);
  };

  const openPanel = () => {
    setShowFilters((v) => !v);
    setIsDropdownOpen(false);
    setIsServicesDropdownOpen(false);
  };

  return (
    <div className="w-full">
      {/* Selected chips row */}
      {(selectedNationalities.length > 0 || selectedServices.length > 0) && (
        <div className="flex flex-wrap gap-2 px-6 mb-4">
          {[...selectedNationalities, ...selectedServices].map((item) => (
            <span
              key={item}
              className="inline-flex items-center gap-2 px-3 py-1.5 text-sm
                bg-[#14120f]/80 backdrop-blur
                border border-[#bfa663]/40
                text-[#e8d6a8] rounded"
            >
              {item.toUpperCase()}
              <button
                onClick={() =>
                  selectedNationalities.includes(item)
                    ? toggleNationality(item)
                    : toggleService(item)
                }
                className="text-[#e8d6a8]/80 hover:text-[#d9c07c] transition"
                aria-label={`Remove ${item}`}
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}
        </div>
      )}

      {/* Filter button row */}
      <div className="flex justify-between items-center px-6 mb-6">
        <button
          onClick={openPanel}
          className="flex items-center gap-2 px-5 py-2.5
            bg-[#14120f]/80 backdrop-blur
            border border-[#bfa663]/40
            text-[#e8d6a8] text-lg font-sans
            hover:border-[#d9c07c] hover:text-[#f1e3b8]
            transition-all"
        >
          <Filter className="w-4 h-4" />
          FILTERS
          {count > 0 && (
            <span
              className="ml-1 px-2 py-0.5 text-xs rounded-full
                bg-[#bfa663]/20 text-[#e8d6a8]
                border border-[#bfa663]/40"
            >
              {count}
            </span>
          )}
        </button>

        {/* Page text (make it gold too) */}
        {pageText && (
          <div className="text-[#bfa663]/70 text-sm sm:text-base tracking-wide">
            {pageText}
          </div>
        )}
      </div>

      {/* Filters panel */}
      {showFilters && (
        <div
          className="mb-8 mx-6 p-5
            bg-gradient-to-b from-[#14120f] to-[#0f0d0b]
            border border-[#bfa663]/40
            shadow-[0_20px_60px_rgba(0,0,0,0.6)]"
        >
          {/* Panel header */}
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-[#e8d6a8] tracking-[0.3em] text-sm font-sans">
              FILTERS
            </h3>
            <button
              onClick={clearFilters}
              className="text-xs tracking-[0.25em]
                text-[#bfa663]/70 hover:text-[#e8d6a8]
                transition"
            >
              CLEAR ALL
            </button>
          </div>

          {/* NATIONALITY */}
          <div className="mb-6">
            <h4 className="text-[#bfa663] text-xs tracking-[0.2em] mb-3 font-sans">
              NATIONALITY
            </h4>
            <div className="flex flex-wrap gap-2">
              {allNationalities.map((nat) => {
                const active = selectedNationalities.includes(nat);
                return (
                  <button
                    key={nat}
                    onClick={() => toggleNationality(nat)}
                    className={`px-4 py-1.5 text-sm tracking-wide border transition-all
                      ${
                        active
  ? "bg-[#bfa663]/20 border-[#bfa663] text-[#f1e3b8] shadow-[0_0_12px_rgba(191,166,99,0.45)]"
  : "bg-[#14120f]/60 border-[#bfa663]/30 text-[#cfc09a] hover:border-[#d9c07c] hover:text-[#f1e3b8]"

                      }`}
                  >
                    {nat}
                  </button>
                );
              })}
            </div>
          </div>

          {/* SERVICES */}
          <div>
            <h4 className="text-[#bfa663] text-xs tracking-[0.2em] mb-3 font-sans">
              SERVICES
            </h4>
            <div className="flex flex-wrap gap-2">
              {allServices.map((service) => {
                const active = selectedServices.includes(service);
                return (
                  <button
                    key={service}
                    onClick={() => toggleService(service)}
                    className={`px-4 py-1.5 text-sm tracking-wide border transition-all
                      ${
                        active
                          ? "bg-[#bfa663]/20 border-[#bfa663] text-[#f1e3b8]"
                          : "bg-[#14120f]/60 border-[#bfa663]/30 text-[#cfc09a] hover:border-[#d9c07c] hover:text-[#f1e3b8]"
                      }`}
                  >
                    {service}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RosterFilters;

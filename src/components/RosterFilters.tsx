// src/components/RosterFilters.tsx
import React, { useMemo, useState } from "react";
import { Filter, X, Clock } from "lucide-react";
import { useTranslation } from "react-i18next";

type ShiftStatus = "now" | "later" | "finished";

interface RosterFiltersProps {
  // ✅ (1) time props
  time: ShiftStatus;
  setTime: (t: ShiftStatus) => void;

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
  time,
  setTime,
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
  const { t } = useTranslation();
  const [showFilters, setShowFilters] = useState(false);

  // ✅ service label mapper (existing)
  const svcKey = (service: string) => {
    const raw = (service || "").trim();
    const lower = raw.toLowerCase();

    if (lower === "69" || lower.includes("69")) return "69";
    if (lower.includes("shower")) return "shower";
    if (lower.includes("massage")) return "massage";
    if (lower.includes("gfe")) return "gfe";
    if (lower.includes("pse")) return "pse";
    if (lower.includes("double")) return "double";
    if (lower.includes("filming")) return "filming";

    return lower.replace(/[^a-z0-9]/g, "");
  };

  const renderServiceLabel = (service: string) => {
    const key = svcKey(service);
    return t(`services.${key}`, { defaultValue: service });
  };

  // ✅ (1) Fix dependency bug: depend on arrays, not length only
  const computedActiveCount = useMemo(() => {
    return selectedNationalities.length + selectedServices.length;
  }, [selectedNationalities, selectedServices]);

  const count = activeFilterCount ?? computedActiveCount;

  // ✅ (4) Clear = reset nat/svc AND time
  const clearFilters = () => {
    setSelectedNationalities([]);
    setSelectedServices([]);
    setTime("now");
  };

  const openPanel = () => {
    setShowFilters((v) => !v);
    setIsDropdownOpen(false);
    setIsServicesDropdownOpen(false);
  };

  const isService = (item: string) => allServices.includes(item);

  // ✅ (3) Better time label + subtle glow by state
  const timeLabel =
    time === "now"
      ? t("filter.onNow")
      : time === "later"
      ? t("filter.startLater")
      : t("filter.finished");

  const timeGlow =
    time === "now"
      ? "shadow-[0_0_14px_rgba(191,166,99,0.38)]"
      : time === "later"
      ? "shadow-[0_0_14px_rgba(217,192,124,0.26)]"
      : "opacity-90";

  const cycleTime = () => {
    const order: ShiftStatus[] = ["now", "later", "finished"];
    const idx = order.indexOf(time);
    const next = order[(idx + 1) % order.length];

    // ✅ (5) close panel when changing time (so result feels immediate / less clutter)
    setTime(next);
    setShowFilters(false);
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
              {isService(item) ? renderServiceLabel(item) : item}
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

      {/* Button row */}
      <div className="flex justify-between items-center px-6 mb-6">
        <div className="flex items-center gap-3">
          {/* Filters button */}
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
            {t("filter.filters")}
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

          {/* ✅ (2)(3)(6) Time filter button (i18n keys + safe UI) */}
          <button
            onClick={cycleTime}
            className={`flex items-center gap-2 px-5 py-2.5
              bg-[#14120f]/80 backdrop-blur
              border border-[#bfa663]/40
              text-[#e8d6a8] text-lg font-sans
              hover:border-[#d9c07c] hover:text-[#f1e3b8]
              transition-all ${timeGlow}`}
            title="Time filter"
            aria-pressed="true"
          >
            <Clock className="w-4 h-4" />
            {timeLabel}
          </button>
        </div>

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
          <div className="flex justify-end items-center mb-6">
            <button
              onClick={clearFilters}
              className="text-xs tracking-[0.25em]
                text-[#bfa663]/70 hover:text-[#e8d6a8]
                transition"
            >
              {t("filter.clear")}
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
                    // ✅ (2) stable key: never use translated string for key
                    key={service}
                    onClick={() => toggleService(service)}
                    className={`px-4 py-1.5 text-sm tracking-wide border transition-all
                      ${
                        active
                          ? "bg-[#bfa663]/20 border-[#bfa663] text-[#f1e3b8]"
                          : "bg-[#14120f]/60 border-[#bfa663]/30 text-[#cfc09a] hover:border-[#d9c07c] hover:text-[#f1e3b8]"
                      }`}
                  >
                    {renderServiceLabel(service)}
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

// src/components/RosterFilters.tsx
import { useMemo, useState } from "react";
import { Clock, Filter, X } from "lucide-react";
import { useTranslation } from "react-i18next";
import type { ShiftStatus } from "../utils/rosterTime";

interface RosterFiltersProps {
  time: ShiftStatus;
  onTimeChange: (time: ShiftStatus) => void;

  allNationalities: string[];
  allServices: string[];

  selectedNationalities: string[];
  selectedServices: string[];

  onToggleNationality: (nationality: string) => void;
  onToggleService: (service: string) => void;
  onClearFilters: () => void;
}

const RosterFilters: React.FC<RosterFiltersProps> = ({
  time,
  onTimeChange,
  allNationalities,
  allServices,
  selectedNationalities,
  selectedServices,
  onToggleNationality,
  onToggleService,
  onClearFilters,
}) => {
  const { t } = useTranslation();
  const [showFilters, setShowFilters] = useState(false);

  const activeFilterCount = useMemo(
    () => selectedNationalities.length + selectedServices.length,
    [selectedNationalities, selectedServices]
  );

  const serviceKey = (service: string) => {
    const normalized = service.trim().toLowerCase();

    if (normalized.includes("69")) return "69";
    if (normalized.includes("shower")) return "shower";
    if (normalized.includes("massage")) return "massage";
    if (normalized.includes("gfe")) return "gfe";
    if (normalized.includes("pse")) return "pse";
    if (normalized.includes("double")) return "double";
    if (normalized.includes("filming")) return "filming";

    return normalized.replace(/[^a-z0-9]/g, "");
  };

  const renderServiceLabel = (service: string) =>
    t(`services.${serviceKey(service)}`, {
      defaultValue: service,
    });

  const toggleTime = () => {
    onTimeChange(time === "now" ? "today" : "now");
    setShowFilters(false);
  };

  const clearFilters = () => {
    onClearFilters();
    onTimeChange("now");
    setShowFilters(false);
  };

  const timeLabel = time === "now" ? t("filter.onNow") : t("filter.seeAll");

  return (
    <div className="relative shrink-0">
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={toggleTime}
          aria-pressed={time === "now"}
          className={`inline-flex shrink-0 items-center gap-2 border px-3 py-2
            bg-[#14120f]/80 text-sm text-[#e8d6a8]
            transition-all hover:border-[#d9c07c] hover:text-[#f1e3b8]
            ${
              time === "now"
                ? "border-[#bfa663] shadow-[0_0_14px_rgba(191,166,99,0.38)]"
                : "border-[#bfa663]/40"
            }`}
        >
          <Clock className="h-4 w-4" />
          {timeLabel}
        </button>

        <button
          type="button"
          onClick={() => setShowFilters((current) => !current)}
          aria-expanded={showFilters}
          className={`inline-flex shrink-0 items-center gap-2 border px-3 py-2
            bg-[#14120f]/80 text-sm text-[#e8d6a8]
            transition-all hover:border-[#d9c07c] hover:text-[#f1e3b8]
            ${
              showFilters || activeFilterCount > 0
                ? "border-[#bfa663]"
                : "border-[#bfa663]/40"
            }`}
        >
          <Filter className="h-4 w-4" />
          {t("filter.filters")}

          {activeFilterCount > 0 && (
            <span className="rounded-full border border-[#bfa663]/40 bg-[#bfa663]/20 px-2 py-0.5 text-xs">
              {activeFilterCount}
            </span>
          )}
        </button>
      </div>
      {showFilters && (
        <div
        className="
          fixed left-4 right-4 top-32 z-[999]
          max-h-[70vh] overflow-y-auto
          border border-[#bfa663]/40
          bg-gradient-to-b from-[#14120f] to-[#0f0d0b]
          p-4 shadow-[0_20px_60px_rgba(0,0,0,0.6)]
        "
      >
          <div className="mb-5 flex justify-end">
            <button
              type="button"
              onClick={clearFilters}
              className="inline-flex items-center gap-1 text-xs tracking-[0.2em]
                text-[#bfa663]/70 transition hover:text-[#e8d6a8]"
            >
              <X className="h-3.5 w-3.5" />
              {t("filter.clear")}
            </button>
          </div>

          <div className="mb-6">
            <h4 className="mb-3 text-xs tracking-[0.2em] text-[#bfa663]">
              NATIONALITY
            </h4>

            <div className="flex flex-wrap gap-2">
              {allNationalities.map((nationality) => {
                const selected = selectedNationalities.includes(nationality);

                return (
                  <button
                    key={nationality}
                    type="button"
                    onClick={() => onToggleNationality(nationality)}
                    aria-pressed={selected}
                    className={`border px-4 py-1.5 text-sm tracking-wide transition-all ${
                      selected
                        ? "border-[#bfa663] bg-[#bfa663]/20 text-[#f1e3b8] shadow-[0_0_12px_rgba(191,166,99,0.45)]"
                        : "border-[#bfa663]/30 bg-[#14120f]/60 text-[#cfc09a] hover:border-[#d9c07c] hover:text-[#f1e3b8]"
                    }`}
                  >
                    {nationality}
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <h4 className="mb-3 text-xs tracking-[0.2em] text-[#bfa663]">
              SERVICES
            </h4>

            <div className="flex flex-wrap gap-2">
              {allServices.map((service) => {
                const selected = selectedServices.includes(service);

                return (
                  <button
                    key={service}
                    type="button"
                    onClick={() => onToggleService(service)}
                    aria-pressed={selected}
                    className={`border px-4 py-1.5 text-sm tracking-wide transition-all ${
                      selected
                        ? "border-[#bfa663] bg-[#bfa663]/20 text-[#f1e3b8]"
                        : "border-[#bfa663]/30 bg-[#14120f]/60 text-[#cfc09a] hover:border-[#d9c07c] hover:text-[#f1e3b8]"
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

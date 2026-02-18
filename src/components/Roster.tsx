import React, { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import type { RosterModel } from "../types/index.ts";
import RosterFilters from "./RosterFilters";
import RosterGrid from "./RosterGrid.tsx";
import { useTranslation } from "react-i18next";

/* ---------------- Time helpers (date-anchored, no ambiguity) ---------------- */

type ShiftStatus = "now" | "today";

function parseHHMMSS(hhmmss: string): { hh: number; mm: number; ss: number } {
  const [hhStr, mmStr, ssStr] = (hhmmss || "0:0:0").split(":");
  const hh = Number(hhStr);
  const mm = Number(mmStr);
  const ss = Number(ssStr ?? "0");
  return {
    hh: Number.isFinite(hh) ? hh : 0,
    mm: Number.isFinite(mm) ? mm : 0,
    ss: Number.isFinite(ss) ? ss : 0,
  };
}

function startOfDay(d: Date) {
  const x = new Date(d);
  x.setHours(0, 0, 0, 0);
  return x;
}

function addDays(d: Date, days: number) {
  const x = new Date(d);
  x.setDate(x.getDate() + days);
  return x;
}

function makeDateOnDay(day: Date, hhmmss: string) {
  const { hh, mm, ss } = parseHHMMSS(hhmmss);
  const x = new Date(day);
  x.setHours(hh, mm, ss, 0);
  return x;
}

/**
 * Date-anchored shift status:
 * - rosterDay is the day the roster belongs to (today tab => today 00:00, tomorrow tab => tomorrow 00:00)
 * - if end <= start => end is next day (overnight)
 * - special case: end "00:00:00" means midnight at end of day (i.e., 24:00), not the start of the day
 */
function getShiftStatusOnDay(
  startHHMMSS: string,
  endHHMMSS: string,
  rosterDay: Date,
  now: Date = new Date()
): ShiftStatus {
  const day0 = startOfDay(rosterDay);

  const startAt = makeDateOnDay(day0, startHHMMSS);

  // interpret end=00:00:00 as 24:00 of the same day (unless start is also 00:00:00)
  const endParts = parseHHMMSS(endHHMMSS);
  const isMidnight =
    endParts.hh === 0 && endParts.mm === 0 && endParts.ss === 0;
  let endAt = makeDateOnDay(day0, endHHMMSS);

  if (
    isMidnight &&
    (startAt.getHours() !== 0 ||
      startAt.getMinutes() !== 0 ||
      startAt.getSeconds() !== 0)
  ) {
    endAt = addDays(day0, 1); // 24:00
  }

  // overnight: end <= start => end is next day
  if (endAt.getTime() <= startAt.getTime()) {
    endAt = addDays(endAt, 1);
  }

  if (now.getTime() >= startAt.getTime() && now.getTime() < endAt.getTime())
  return "now";
return "today";

}

/* ---------------- Component ---------------- */

interface RosterProps {
  rosterToday: RosterModel[];
  rosterTomorrow: RosterModel[];
  loading?: boolean;
}

const Roster: React.FC<RosterProps> = ({
  rosterToday,
  rosterTomorrow,
  loading = false,
}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { t } = useTranslation();

  const parseCsv = (v: string | null) =>
    (v || "")
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);

  const readTab = (v: string | null): "today" | "tomorrow" =>
    v === "tomorrow" ? "tomorrow" : "today";

  const readTime = (v: string | null): ShiftStatus =>
    v === "today" ? "today" : "now";

  const initialTab = readTab(searchParams.get("tab"));
  const initialTime = readTime(searchParams.get("time"));
  const initialNats = parseCsv(searchParams.get("nat"));
  const initialSvcs = parseCsv(searchParams.get("svc"));

  const [activeTab, setActiveTab] = useState<"today" | "tomorrow">(
    () => initialTab
  );
  const [time, setTime] = useState<ShiftStatus>(() => initialTime);

  const [selectedNationalities, setSelectedNationalities] = useState<string[]>(
    () => initialNats
  );
  const [selectedServices, setSelectedServices] = useState<string[]>(
    () => initialSvcs
  );

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isServicesDropdownOpen, setIsServicesDropdownOpen] = useState(false);

  // ✅ sync URL params
  useEffect(() => {
    const next = new URLSearchParams(searchParams);

    next.set("tab", activeTab);
    next.set("time", time);

    if (selectedNationalities.length)
      next.set("nat", selectedNationalities.join(","));
    else next.delete("nat");

    if (selectedServices.length) next.set("svc", selectedServices.join(","));
    else next.delete("svc");

    if (next.toString() !== searchParams.toString()) {
      setSearchParams(next, { replace: true });
    }
  }, [
    activeTab,
    time,
    selectedNationalities,
    selectedServices,
    searchParams,
    setSearchParams,
  ]);

  // If tomorrow API returns empty array (common before 7pm), show message
  const showTomorrowReleaseMsg =
    activeTab === "tomorrow" &&
    Array.isArray(rosterTomorrow) &&
    rosterTomorrow.length === 0;

  const currentRoster = activeTab === "today" ? rosterToday : rosterTomorrow;

  // anchor day for time comparison (today tab => today, tomorrow tab => tomorrow)
  // Shop "business day" starts at 10:00 (10am) and runs until 03:00 next day.
  // So between 00:00–09:59, "today" tab should still anchor to yesterday.
  const SHOP_DAY_START_HOUR = 10;

  const rosterDay = useMemo(() => {
    const now = new Date();
    const calendarToday = startOfDay(now);

    // If it's before shop opening (e.g. 12:41am), we are still in "yesterday's" roster day.
    const shopToday =
      now.getHours() < SHOP_DAY_START_HOUR
        ? addDays(calendarToday, -1)
        : calendarToday;

    // today tab => shopToday, tomorrow tab => shopToday + 1
    return activeTab === "tomorrow" ? addDays(shopToday, 1) : shopToday;
  }, [activeTab]);

  const allNationalities = useMemo(
    () => [...new Set(currentRoster.map((m) => m.nationality))].sort(),
    [currentRoster]
  );

  const allServices = useMemo(() => {
    return [
      ...new Set(
        currentRoster
          .flatMap((m) =>
            (m.services || []).filter((s) => s.available).map((s) => s.name)
          )
          .filter(Boolean)
      ),
    ].sort();
  }, [currentRoster]);

  const filteredRoster = useMemo(() => {
    let filtered = currentRoster;

    // ✅ TIME FILTER (needs startTime/endTime)
filtered = filtered.filter((m) => {
  // today = no time filtering (show entire roster for that rosterDay)
  if (time === "today") return true;

  const start = (m as any).startTime as string | undefined;
  const end = (m as any).endTime as string | undefined;

  // If missing, do NOT lie. Just include everyone.
  if (!start || !end) return true;

  return getShiftStatusOnDay(start, end, rosterDay) === "now";
});


    if (selectedNationalities.length > 0) {
      filtered = filtered.filter((m) =>
        selectedNationalities.includes(m.nationality)
      );
    }

    if (selectedServices.length > 0) {
      filtered = filtered.filter((m) => {
        const available = (m.services || [])
          .filter((s) => s.available)
          .map((s) => s.name);

        return selectedServices.every((s) => available.includes(s));
      });
    }

    return filtered;
  }, [currentRoster, rosterDay, time, selectedNationalities, selectedServices]);

  const toggleNationality = (n: string) =>
    setSelectedNationalities((prev) =>
      prev.includes(n) ? prev.filter((x) => x !== n) : [...prev, n]
    );

  const toggleService = (s: string) =>
    setSelectedServices((prev) =>
      prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]
    );

  const clearFilters = () => {
    setSelectedNationalities([]);
    setSelectedServices([]);
  };

  return (
    <section
      id="roster"
      className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-[#e8d6a8]"
    >
      {/* Header */}
      <div className="flex flex-col items-center mb-10 px-3">
        <div className="flex justify-center items-center gap-6 sm:gap-10 md:gap-16 flex-nowrap text-center w-full max-w-[420px]">
          {/* TODAY */}
          <div className="relative flex-1 min-w-[120px]">
            <button
              onClick={() => setActiveTab("today")}
              className={`font-serif text-xl sm:text-2xl md:text-3xl tracking-wide transition-all w-full relative ${
                activeTab === "today"
                  ? "text-transparent bg-clip-text bg-gradient-to-r from-[#e3d19b] to-[#bfa663] font-bold"
                  : "text-[#a79b7a] hover:text-[#d8bf7a]"
              }`}
            >
              {t("roster.today")}
            </button>

            {activeTab === "today" && (
              <span className="absolute -bottom-1 left-1/4 right-1/4 h-[1.5px] bg-gradient-to-r from-transparent via-[#d8bf7a] to-transparent" />
            )}
          </div>

          {/* TOMORROW */}
          <div className="relative flex-1 min-w-[120px]">
            <button
              onClick={() => setActiveTab("tomorrow")}
              className={`font-serif text-xl sm:text-2xl md:text-3xl tracking-wide transition-all w-full relative ${
                activeTab === "tomorrow"
                  ? "text-transparent bg-clip-text bg-gradient-to-r from-[#e3d19b] to-[#bfa663] font-bold"
                  : "text-[#a79b7a] hover:text-[#d8bf7a]"
              }`}
            >
              {t("roster.tomorrow")}
            </button>

            {activeTab === "tomorrow" && (
              <span className="absolute -bottom-1 left-1/4 right-1/4 h-[1.5px] bg-gradient-to-r from-transparent via-[#d8bf7a] to-transparent" />
            )}
          </div>
        </div>
      </div>

      {/* Tomorrow roster release message */}
      {showTomorrowReleaseMsg && !loading && (
        <div className="text-center py-8">
          <div className="inline-block bg-[#1a1610]/70 border border-[#bfa663]/30 rounded-lg px-8 py-5 shadow-[0_0_30px_rgba(0,0,0,0.4)]">
            <p className="text-[#e3d19b] text-lg font-serif mb-1">
              {t("roster.tomorrowReleaseTitle", { time: "7:00 PM" })}
            </p>
            <p className="text-[#a79b7a] text-sm font-sans">
              {t("roster.tomorrowReleaseSubtitle")}
            </p>
          </div>
        </div>
      )}

      {/* Filters + Grid */}
      <>
        <RosterFilters
          time={time}
          setTime={(next) => {
            setTime(next);
            setIsDropdownOpen(false);
            setIsServicesDropdownOpen(false);
          }}
          allNationalities={allNationalities}
          allServices={allServices}
          selectedNationalities={selectedNationalities}
          selectedServices={selectedServices}
          isDropdownOpen={isDropdownOpen}
          isServicesDropdownOpen={isServicesDropdownOpen}
          setIsDropdownOpen={setIsDropdownOpen}
          setIsServicesDropdownOpen={setIsServicesDropdownOpen}
          toggleNationality={toggleNationality}
          toggleService={toggleService}
          setSelectedNationalities={setSelectedNationalities}
          setSelectedServices={setSelectedServices}
        />

        {loading ? (
          <div className="text-center py-16">
            <p className="text-[#a79b7a] text-lg mb-2 font-serif">
              {t("roster.loadingTitle")}
            </p>
            <p className="text-[#6f674f] text-sm font-sans">
              {t("roster.loadingSubtitle")}
            </p>
          </div>
        ) : (
          <>
            <RosterGrid models={filteredRoster} activeTab={activeTab} />

            {filteredRoster.length === 0 && (
              <div className="text-center py-16">
                <p className="text-[#a79b7a] text-lg mb-6 font-serif">
                  {t("roster.emptyTitle")}
                </p>
                <button
                  onClick={clearFilters}
                  className="px-6 py-2 border border-[#bfa663]/50 text-[#e8d6a8] font-sans hover:bg-[#bfa663]/10 transition-all"
                >
                  {t("roster.clearFilters")}
                </button>
              </div>
            )}
          </>
        )}
      </>
    </section>
  );
};

export default Roster;

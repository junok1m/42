import React, { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import type { RosterModel } from "../types/index.ts";
import RosterFilters from "./RosterFilters";
import RosterGrid from "./RosterGrid.tsx";
import { useTranslation } from "react-i18next";
import {
  addDays,
  getShiftStatusOnDay,
  startOfDay,
  type ShiftStatus,
} from "../utils/rosterTime";
import { parseCsv, readTab, readTime } from "../utils/query";
import { filterRoster } from "../utils/filterRoster";
import { getNationalities, getServices } from "../utils/rosterOptions";
import { toggleSelection } from "../utils/toggleSelection";
import RosterTabs from "./RosterTabs";
import { canShowTomorrowRoster } from "../utils/sydneyTime";

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
  const tomorrowRosterReleased = canShowTomorrowRoster();
  const showTomorrowReleaseMsg =
  activeTab === "tomorrow" && !tomorrowRosterReleased;

  const currentRoster =
  activeTab === "today"
    ? rosterToday
    : tomorrowRosterReleased
      ? rosterTomorrow
      : [];
  // anchor day for time comparison (today tab => today, tomorrow tab => tomorrow)
  // Shop business day changes at 5:00 AM.
  // Between midnight and 4:59 AM, keep showing the previous roster day.
  const SHOP_DAY_START_HOUR = 5;

  const shopToday = useMemo(() => {
    const now = new Date();
    const calendarToday = startOfDay(now);

    return now.getHours() < SHOP_DAY_START_HOUR
      ? addDays(calendarToday, -1)
      : calendarToday;
  }, []);

  const rosterDay = useMemo(
    () => (activeTab === "tomorrow" ? addDays(shopToday, 1) : shopToday),
    [activeTab, shopToday]
  );

  const allNationalities = useMemo(
    () => getNationalities(currentRoster),
    [currentRoster]
  );

  const allServices = useMemo(
    () => getServices(currentRoster),
    [currentRoster]
  );

  const filteredRoster = useMemo(
    () =>
      filterRoster({
        roster: currentRoster,
        time,
        rosterDay,
        selectedNationalities,
        selectedServices,
      }),
    [currentRoster, time, rosterDay, selectedNationalities, selectedServices]
  );

  const toggleNationality = (nationality: string) => {
    setSelectedNationalities((previous) =>
      toggleSelection(previous, nationality)
    );
  };

  const toggleService = (service: string) => {
    setSelectedServices((previous) => toggleSelection(previous, service));
  };
  const clearFilters = () => {
    setSelectedNationalities([]);
    setSelectedServices([]);
  };

  return (
    <section
      id="roster"
      className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-[#e8d6a8]"
    >
      <RosterTabs
        activeTab={activeTab}
        shopToday={shopToday}
        onChange={setActiveTab}
      />

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
) : showTomorrowReleaseMsg ? null : filteredRoster.length > 0 ? (
  <RosterGrid
    models={filteredRoster}
    activeTab={activeTab}
  />
) : (
  <div className="text-center py-16">
    <p className="text-[#a79b7a] text-lg mb-6 font-serif">
      {t("roster.emptyTitle")}
    </p>

    <button
      type="button"
      onClick={clearFilters}
      className="px-6 py-2 border border-[#bfa663]/50 text-[#e8d6a8] font-sans hover:bg-[#bfa663]/10 transition-all"
    >
      {t("roster.clearFilters")}
    </button>
  </div>
)}
      </>
    </section>
  );
};

export default Roster;

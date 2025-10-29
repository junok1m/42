import React, { useState } from "react";
import type { RosterModel } from "../types/index.ts";
import RosterFilters from "./RosterFilters";
import RosterGrid from "./RosterGrid.tsx";

interface RosterProps {
  rosterToday: RosterModel[];
  rosterTomorrow: RosterModel[];
}

const Roster: React.FC<RosterProps> = ({ rosterToday, rosterTomorrow }) => {
  const [activeTab, setActiveTab] = useState("today");
  const [selectedNationalities, setSelectedNationalities] = useState<string[]>([]);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isServicesDropdownOpen, setIsServicesDropdownOpen] = useState(false);

  const isTomorrowRosterAvailable = () => {
    return false; // demo only
  };

  const showTomorrowRoster = isTomorrowRosterAvailable();
  const currentRoster = activeTab === "today" ? rosterToday : rosterTomorrow;
  const allNationalities = [...new Set(currentRoster.map((m) => m.nationality))].sort();

  const getFilteredRoster = () => {
    let filtered = currentRoster;

    if (selectedNationalities.length > 0) {
      filtered = filtered.filter((m) => selectedNationalities.includes(m.nationality));
    }

    if (selectedServices.length > 0) {
      filtered = filtered.filter((m) =>
        selectedServices.every((s) => {
          if (s === "cim") return m.cim;
          if (s === "dfk") return m.dfk;
          if (s === "filming") return m.filming;
          return false;
        })
      );
    }

    return filtered;
  };

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
  <div className="flex justify-center items-center gap-6 sm:gap-10 md:gap-16 flex-nowrap text-center w-[100%] md:w-full md:max-w-[500px] mx-auto">
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
        Roster&nbsp;Today
      </button>

      {/* underline */}
      {activeTab === "today" && (
        <span className="absolute -bottom-1 left-1/4 right-1/4 h-[1.5px] bg-gradient-to-r from-transparent via-[#d8bf7a] to-transparent" />
      )}
    </div>

    {/* TOMORROW */}
    <div className="relative flex-1 min-w-[120px]">
      <button
        onClick={() => setActiveTab("tomorrow")}
        disabled={!showTomorrowRoster}
        className={`font-serif text-xl sm:text-2xl md:text-3xl tracking-wide transition-all w-full relative ${
          activeTab === "tomorrow"
            ? "text-transparent bg-clip-text bg-gradient-to-r from-[#e3d19b] to-[#bfa663] font-bold"
            : showTomorrowRoster
            ? "text-[#a79b7a] hover:text-[#d8bf7a]"
            : "text-[#4b4638] cursor-not-allowed"
        }`}
      >
        Roster&nbsp;Tomorrow
      </button>

      {/* underline */}
      {activeTab === "tomorrow" && (
        <span className="absolute -bottom-1 left-1/4 right-1/4 h-[1.5px] bg-gradient-to-r from-transparent via-[#d8bf7a] to-transparent" />
      )}

      {!showTomorrowRoster && (
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 bg-[#14120f]/90 border border-[#bfa663]/30 text-[#e8d6a8] text-[14px] whitespace-nowrap z-20 font-serif">
          Updates&nbsp;by&nbsp;6:00&nbsp;PM
        </div>
      )}
    </div>
  </div>
</div>


      {/* “Tomorrow’s roster not ready” message */}
      {!showTomorrowRoster && activeTab === "tomorrow" && (
        <div className="text-center py-12">
          <div className="inline-block bg-[#1a1610]/70 border border-[#bfa663]/30 rounded-lg px-8 py-6 shadow-[0_0_30px_rgba(0,0,0,0.4)]">
            <p className="text-[#e3d19b] text-lg font-serif mb-1">
              Tomorrow’s roster will be updated by&nbsp;6:00 PM (Sydney time)
            </p>
            <p className="text-[#a79b7a] text-sm font-sans">Please check back later</p>
          </div>
        </div>
      )}

      {/* Filters + Grid */}
      {(activeTab === "today" || showTomorrowRoster) && (
        <>
          <RosterFilters
            allNationalities={allNationalities}
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

          <RosterGrid models={getFilteredRoster()} />

          {/* Empty state */}
          {getFilteredRoster().length === 0 && (
            <div className="text-center py-16">
              <p className="text-[#a79b7a] text-lg mb-6 font-serif">
                No models available with the selected filters.
              </p>
              <button
                onClick={clearFilters}
                className="px-6 py-2 border border-[#bfa663]/50 text-[#e8d6a8] font-sans hover:bg-[#bfa663]/10 transition-all"
              >
                Clear Filters
              </button>
            </div>
          )}
        </>
      )}
    </section>
  );
};

export default Roster;

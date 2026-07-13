import type { FC } from "react";
import type { RosterModel } from "../types";
import { useRosterState } from "../hooks/useRosterState";
import RosterToolbar from "./RosterToolbar";
import RosterContent from "./RosterContent";

interface RosterProps {
  rosterToday: RosterModel[];
  rosterTomorrow: RosterModel[];
  loading?: boolean;
}

const Roster: FC<RosterProps> = ({
  rosterToday,
  rosterTomorrow,
  loading = false,
}) => {
  const {
    activeTab,
    setActiveTab,
    time,
    changeTime,
    shopToday,
    allNationalities,
    allServices,
    selectedNationalities,
    selectedServices,
    filteredRoster,
    showTomorrowReleaseMessage,
    toggleNationality,
    toggleService,
    clearFilters,
  } = useRosterState({
    rosterToday,
    rosterTomorrow,
  });

  return (
    <section
      id="roster"
      className="mx-auto max-w-7xl px-4 py-16 text-[#e8d6a8] sm:px-6 lg:px-8"
    >
      <RosterToolbar
  activeTab={activeTab}
  shopToday={shopToday}
  onTabChange={setActiveTab}
  time={time}
  onTimeChange={changeTime}
  allNationalities={allNationalities}
  allServices={allServices}
  selectedNationalities={selectedNationalities}
  selectedServices={selectedServices}
  onToggleNationality={toggleNationality}
  onToggleService={toggleService}
  onClearFilters={clearFilters}
/>

      <RosterContent
        models={filteredRoster}
        activeTab={activeTab}
        loading={loading}
        showTomorrowReleaseMessage={showTomorrowReleaseMessage}
        onClearFilters={clearFilters}
      />
    </section>
  );
};

export default Roster;
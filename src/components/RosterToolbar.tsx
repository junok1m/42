// src/components/RosterToolbar.tsx
import type { ShiftStatus } from "../utils/rosterTime";
import type { RosterTab } from "./RosterTabs";
import RosterFilters from "./RosterFilters";
import RosterTabs from "./RosterTabs";

interface RosterToolbarProps {
  activeTab: RosterTab;
  shopToday: Date;
  onTabChange: (tab: RosterTab) => void;

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

function RosterToolbar({
  activeTab,
  shopToday,
  onTabChange,
  time,
  onTimeChange,
  allNationalities,
  allServices,
  selectedNationalities,
  selectedServices,
  onToggleNationality,
  onToggleService,
  onClearFilters,
}: RosterToolbarProps) {
  return (
    <div className="relative z-20 mb-6">
      <div className="flex flex-nowrap items-center gap-2 overflow-x-auto scrollbar-hide">
        <RosterTabs
          activeTab={activeTab}
          shopToday={shopToday}
          onChange={onTabChange}
        />
        <div aria-hidden="true" className="h-6 w-px shrink-0 bg-[#bfa663]/25" />
        <RosterFilters
          time={time}
          onTimeChange={onTimeChange}
          allNationalities={allNationalities}
          allServices={allServices}
          selectedNationalities={selectedNationalities}
          selectedServices={selectedServices}
          onToggleNationality={onToggleNationality}
          onToggleService={onToggleService}
          onClearFilters={onClearFilters}
        />
      </div>
    </div>
  );
}

export default RosterToolbar;

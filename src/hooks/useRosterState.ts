import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import type { RosterModel } from "../types";
import {
  addDays,
  startOfDay,
  type ShiftStatus,
} from "../utils/rosterTime";
import { parseCsv, readTab, readTime } from "../utils/query";
import { filterRoster } from "../utils/filterRoster";
import { getNationalities, getServices } from "../utils/rosterOptions";
import { toggleSelection } from "../utils/toggleSelection";
import { canShowTomorrowRoster } from "../utils/sydneyTime";

export type RosterTab = "today" | "tomorrow";

interface UseRosterStateParams {
  rosterToday: RosterModel[];
  rosterTomorrow: RosterModel[];
}

const SHOP_DAY_START_HOUR = 5;

export function useRosterState({
  rosterToday,
  rosterTomorrow,
}: UseRosterStateParams) {
  const [searchParams, setSearchParams] = useSearchParams();

  const [activeTab, setActiveTab] = useState<RosterTab>(() =>
    readTab(searchParams.get("tab"))
  );

  const [time, setTime] = useState<ShiftStatus>(() =>
    readTime(searchParams.get("time"))
  );

  const [selectedNationalities, setSelectedNationalities] = useState<string[]>(
    () => parseCsv(searchParams.get("nat"))
  );

  const [selectedServices, setSelectedServices] = useState<string[]>(() =>
    parseCsv(searchParams.get("svc"))
  );

  const [isNationalityDropdownOpen, setIsNationalityDropdownOpen] =
    useState(false);

  const [isServicesDropdownOpen, setIsServicesDropdownOpen] = useState(false);

  useEffect(() => {
    const nextParams = new URLSearchParams();

    nextParams.set("tab", activeTab);
    nextParams.set("time", time);

    if (selectedNationalities.length > 0) {
      nextParams.set("nat", selectedNationalities.join(","));
    }

    if (selectedServices.length > 0) {
      nextParams.set("svc", selectedServices.join(","));
    }

    if (nextParams.toString() !== searchParams.toString()) {
      setSearchParams(nextParams, { replace: true });
    }
  }, [
    activeTab,
    time,
    selectedNationalities,
    selectedServices,
    searchParams,
    setSearchParams,
  ]);

  const tomorrowRosterReleased = canShowTomorrowRoster();

  const showTomorrowReleaseMessage =
    activeTab === "tomorrow" && !tomorrowRosterReleased;

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

  const currentRoster = useMemo(() => {
    if (activeTab === "today") {
      return rosterToday;
    }

    return tomorrowRosterReleased ? rosterTomorrow : [];
  }, [
    activeTab,
    rosterToday,
    rosterTomorrow,
    tomorrowRosterReleased,
  ]);

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
    [
      currentRoster,
      time,
      rosterDay,
      selectedNationalities,
      selectedServices,
    ]
  );

  const closeDropdowns = () => {
    setIsNationalityDropdownOpen(false);
    setIsServicesDropdownOpen(false);
  };

  const changeTime = (nextTime: ShiftStatus) => {
    setTime(nextTime);
    closeDropdowns();
  };

  const toggleNationality = (nationality: string) => {
    setSelectedNationalities((current) =>
      toggleSelection(current, nationality)
    );
  };

  const toggleService = (service: string) => {
    setSelectedServices((current) =>
      toggleSelection(current, service)
    );
  };

  const clearFilters = () => {
    setSelectedNationalities([]);
    setSelectedServices([]);
  };

  return {
    activeTab,
    setActiveTab,

    time,
    changeTime,

    shopToday,

    allNationalities,
    allServices,

    selectedNationalities,
    selectedServices,
    setSelectedNationalities,
    setSelectedServices,

    isNationalityDropdownOpen,
    isServicesDropdownOpen,
    setIsNationalityDropdownOpen,
    setIsServicesDropdownOpen,

    filteredRoster,
    showTomorrowReleaseMessage,

    toggleNationality,
    toggleService,
    clearFilters,
  };
}
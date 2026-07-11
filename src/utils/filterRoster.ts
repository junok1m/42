import type { RosterModel } from "../types";
import type { ShiftStatus } from "./rosterTime";
import { getShiftStatusOnDay } from "./rosterTime";

interface FilterRosterOptions {
  roster: RosterModel[];
  time: ShiftStatus;
  rosterDay: Date;
  selectedNationalities: string[];
  selectedServices: string[];
}

export function filterRoster({
  roster,
  time,
  rosterDay,
  selectedNationalities,
  selectedServices,
}: FilterRosterOptions): RosterModel[] {
  return roster.filter((model) => {
    if (
      time === "now" &&
      model.startTime &&
      model.endTime &&
      getShiftStatusOnDay(
        model.startTime,
        model.endTime,
        rosterDay
      ) !== "now"
    ) {
      return false;
    }

    if (
      selectedNationalities.length > 0 &&
      !selectedNationalities.includes(model.nationality)
    ) {
      return false;
    }

    if (selectedServices.length > 0) {
      const availableServices = new Set(
        (model.services ?? [])
          .filter((service) => service.available)
          .map((service) => service.name)
      );

      const hasAllSelectedServices = selectedServices.every((service) =>
        availableServices.has(service)
      );

      if (!hasAllSelectedServices) {
        return false;
      }
    }

    return true;
  });
}
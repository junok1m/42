import type { RosterModel } from "../types";

export function getNationalities(
  roster: RosterModel[]
): string[] {
  return [...new Set(roster.map((model) => model.nationality))].sort();
}

export function getServices(
  roster: RosterModel[]
): string[] {
  return [
    ...new Set(
      roster.flatMap((model) =>
        (model.services ?? [])
          .filter((service) => service.available)
          .map((service) => service.name)
      )
    ),
  ].sort();
}
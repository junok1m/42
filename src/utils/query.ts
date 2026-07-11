import type { ShiftStatus } from "./rosterTime";

export const parseCsv = (value: string | null): string[] =>
  (value ?? "")
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);

export const readTab = (
  value: string | null
): "today" | "tomorrow" =>
  value === "tomorrow" ? "tomorrow" : "today";

export const readTime = (value: string | null): ShiftStatus => {
  if (value === "now") return "now";
  return "today";
};
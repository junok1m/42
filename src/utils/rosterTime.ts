export type ShiftStatus = "now" | "today";

function parseHHMMSS(hhmmss: string) {
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

export function startOfDay(date: Date): Date {
  const result = new Date(date);
  result.setHours(0, 0, 0, 0);
  return result;
}

export function addDays(date: Date, days: number): Date {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

function makeDateOnDay(day: Date, hhmmss: string): Date {
  const { hh, mm, ss } = parseHHMMSS(hhmmss);
  const result = new Date(day);
  result.setHours(hh, mm, ss, 0);
  return result;
}

export function getShiftStatusOnDay(
  startHHMMSS: string,
  endHHMMSS: string,
  rosterDay: Date,
  now: Date = new Date()
): ShiftStatus {
  const dayStart = startOfDay(rosterDay);
  const startAt = makeDateOnDay(dayStart, startHHMMSS);

  const endParts = parseHHMMSS(endHHMMSS);
  const isMidnight =
    endParts.hh === 0 &&
    endParts.mm === 0 &&
    endParts.ss === 0;

  let endAt = makeDateOnDay(dayStart, endHHMMSS);

  if (
    isMidnight &&
    (startAt.getHours() !== 0 ||
      startAt.getMinutes() !== 0 ||
      startAt.getSeconds() !== 0)
  ) {
    endAt = addDays(dayStart, 1);
  }

  if (endAt.getTime() <= startAt.getTime()) {
    endAt = addDays(endAt, 1);
  }

  return now >= startAt && now < endAt ? "now" : "today";
}
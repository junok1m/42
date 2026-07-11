const SYDNEY_TIME_ZONE = "Australia/Sydney";

type SydneyDateTime = {
  year: number;
  month: number;
  day: number;
  hour: number;
  minute: number;
};

export function getSydneyDateTime(date = new Date()): SydneyDateTime {
  const parts = new Intl.DateTimeFormat("en-AU", {
    timeZone: SYDNEY_TIME_ZONE,
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hourCycle: "h23",
  }).formatToParts(date);

  const values = Object.fromEntries(
    parts
      .filter((part) => part.type !== "literal")
      .map((part) => [part.type, Number(part.value)])
  );

  return {
    year: values.year,
    month: values.month,
    day: values.day,
    hour: values.hour,
    minute: values.minute,
  };
}

export function canShowTomorrowRoster(date = new Date()): boolean {
  const { hour } = getSydneyDateTime(date);

  return hour >= 19;
}
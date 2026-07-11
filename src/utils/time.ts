export function formatTimeLabel(time: string): string {
    const [hourString, minuteString] = time.split(":");
  
    const hour = Number(hourString);
    const minute = Number(minuteString);
  
    if (
      !Number.isInteger(hour) ||
      !Number.isInteger(minute)
    ) {
      return time;
    }
  
    const period = hour >= 12 ? "PM" : "AM";
    const displayHour = hour % 12 || 12;
  
    return `${displayHour}:${String(minute).padStart(2, "0")} ${period}`;
  }
  
  export function formatWorkingTime(start: string, end: string): string {
    return `${formatTimeLabel(start)} - ${formatTimeLabel(end)}`;
  }
import type { ScheduleEvent } from "./api";

export function getScheduleByDays(schedule: ScheduleEvent[]) {
  const scheduleByDays: Array<ScheduleEvent[]> = [];
  const dates: string[] = [];

  for (let i = 0; i < schedule.length; i++) {
    const date = schedule[i].attributes.date.toString().slice(0, 10);

    if (!dates.includes(date)) {
      dates.push(date);
      scheduleByDays.push([schedule[i]]);
    } else {
      const index = dates.indexOf(date);
      scheduleByDays[index].push(schedule[i]);
    }
  }

  return scheduleByDays;
}
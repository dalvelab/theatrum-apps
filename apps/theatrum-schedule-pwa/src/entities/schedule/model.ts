import { ScheduleEventType } from "./api"

export const typeToSchemeMap: Record<ScheduleEventType, string> = {
  'спектакль': 'blue',
  'концерт': 'green',
  'банкет': 'purple',
  'репетиция': 'red',
  'прочее': 'orange',
}
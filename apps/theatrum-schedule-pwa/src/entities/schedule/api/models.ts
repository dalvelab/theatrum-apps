export type ScheduleEventType = 'концерт' | 'спектакль' | 'репетиция' | 'банкет' | 'прочее';

export type ScheduleEvent = {
  id: number;
  attributes: {
    title: string;
    date: Date;
    location: string;
    type: ScheduleEventType;
    people?: Person[];
    additional_info: string;
  }
}

export type Person = {
  name: string;
  role: string;
}
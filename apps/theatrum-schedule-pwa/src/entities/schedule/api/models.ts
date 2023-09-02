export type ScheduleEventType = 'концерт' | 'спектакль' | 'репетиция' | 'банкет' | 'прочее';

export type ScheduleEvent = {
  id: number;
  attributes: {
    title: string;
    date: Date;
    location: string;
    type: ScheduleEventType;
    people?: Actor[];
    additional_info: string;
  }
}

export type Actor = {
  role?: string;
  worker?: {
    data: Worker;
  };
}

export type Worker = {
  id: number;
  attributes: {
    name: string;
  }
}
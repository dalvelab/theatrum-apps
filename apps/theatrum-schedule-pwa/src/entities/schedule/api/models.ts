export type ScheduleEventType =
  | "концерт"
  | "спектакль"
  | "репетиция"
  | "банкет"
  | "прочее";

export type ScheduleEvent = {
  id: number;
  attributes: {
    title: string;
    date: Date;
    location: string;
    type: ScheduleEventType;
    people?: Actor[];
    additional_info: string;
    timeBadge: boolean;
  };
};

export type Actor = {
  role?: string;
  worker?: Worker;
};

export type Worker = {
  id: number;
  name: string;
};

export type InformationPost = {
  id: number;
  attributes: {
    title: string;
    description: string;
    createdAt: Date;
  };
};

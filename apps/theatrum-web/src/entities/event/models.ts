import type { StrapiImage } from "@/shared/models/image";
import { ProjectType } from "@/shared/models/project";

export type Season = "none" | "fazioli";

export type Event = {
  id: number;
  attributes: {
    age_limit: number;
    createdAt: Date;
    description: string;
    premiere: boolean;
    slug: string;
    small_description: string;
    project_type?: ProjectType;
    title: string;
    banner: StrapiImage;
    properties: string;
    gallery: {
      data: {
        id: number;
        attributes: {
          name: string;
          url: string;
          width?: number;
          height: number;
        };
      }[];
    };
    roles: Role[];
    production_team: Role[];
    promoted_events: {
      data: Afisha[];
    };
    season?: Season;
  };
};

export type Role = {
  id: number;
  role: string;
  name: string;
};

export type Ticket = {
  id: number;
  date: Date;
  link: string;
  paid: boolean;
};

export type Afisha = {
  id: number;
  attributes: {
    createdAt: Date;
    title: string;
    event: {
      data: Event;
    };
    tickets: Ticket[];
  };
};

export type Slider = {
  id: number;
  attributes: {
    slides: {
      data: {
        id: number;
        attributes: {
          event: {
            data: Event;
          };
          tickets: Ticket[];
          title: string;
        };
      }[];
    };
  };
};

export type Performance = {
  id: number;
  attributes: {
    archived: boolean;
    event: {
      data: Event;
    };
  };
};

import type { StrapiImage } from '@/shared/models/image';

export type Event = {
  id: number;
  attributes: {
    age_limit: number;
    createdAt: Date;
    description: string;
    premiere: boolean;
    pushkin_card: boolean;
    slug: string;
    small_description: string;
    title: string;
    banner: StrapiImage;
    properties: string;
    gallery: {
      data: StrapiImage[];
    };
    roles: Role[];
    production_team: Role[];
  }
}

export type Role = {
  id: number;
  role: string;
  name: string;
}

export type Ticket = {
  id: number;
  date: Date;
  link: string;
  paid: boolean;
}

export type Afisha = {
  id: number;
  attributes: {
    createdAt: Date;
    title: string;
    event: {
      data: Event;
    };
    tickets: Ticket[]
  }
}

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
        }
      }[]
    }
  }
}

export type Perfomance = {
  attributes: {
    archived: boolean;
    event: {
      data: Event;
    }
  }
}
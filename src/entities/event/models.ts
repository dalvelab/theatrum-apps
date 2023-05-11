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
    banner: {
      data: StrapiImage;
    }
    gallery: {
      data: StrapiImage[];
    };
    roles: [];
    production_team: [];
  }
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
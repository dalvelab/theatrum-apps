import type { StrapiImage } from "@/shared/models/image"; 

export type NewsType = 'info' | 'press';

export type News = {
  id: number;
  attributes: {
    image: StrapiImage;
    createdAt: Date;
    description: string;
    slug: string;
    title: string;
    type: NewsType;
    source?: {
      title: string;
      link?: string;
      publish_date?: Date;
    };
  }
}
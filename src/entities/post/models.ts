import type { StrapiImage } from "@/shared/models/image"; 

export type News = {
  id: number;
  attributes: {
    image: StrapiImage;
    createdAt: Date;
    description: string;
    slug: string;
    title: string;
    type: 'info' | 'press';
    source?: {
      title: string;
      link?: string;
      publish_date?: Date;
    };
  }
}
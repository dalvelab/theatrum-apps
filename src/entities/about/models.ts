import { StrapiImage } from "@/shared/models/image";

type AboutDescription = {
  id: number;
  button: 'none' | 'table_booking';
  text: string;
  image: StrapiImage;
}

type Management = {
  id: number;
  job: string;
  name: string;
  image: StrapiImage;
}

export type AboutPage = {
  id: number;
  attributes: {
    description: AboutDescription[];
    management: Management[];
  }
}
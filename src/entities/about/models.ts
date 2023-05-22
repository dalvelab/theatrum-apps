import { StrapiImage, StrapiFile } from "@/shared/models/image";

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

type Document = {
  id: number;
  name: string;
  file: {
    data: StrapiFile;
  }
}

export type Scene = {
  id: number;
  title: string;
  description: string;
  gallery: {
    data: {
      id: number;
      attributes: {
        name: string;
        url: string;
        width?: number;
        height: number;
      }
    }[]
  }
  documents: Document[];
}

export type AboutPage = {
  id: number;
  attributes: {
    description: AboutDescription[];
    management: Management[];
    registerDocuments: Document[];
    scenes: Scene[];
  }
}
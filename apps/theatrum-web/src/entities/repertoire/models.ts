import { StrapiImage } from "@/shared/models/image";
import { Event } from "../event/models";
import { ProjectType } from "@/shared/models/project";

export type Performance = {
  id: number;
  attributes: {
    archived: boolean;
    event: {
      data: Event;
    };
  };
};

export type Project = {
  id: number;
  attributes: {
    title: string;
    image: StrapiImage;
    project_type: ProjectType;
    description: string;
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
  };
};

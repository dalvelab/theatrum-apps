import { ContactType } from "@/shared/models/contact";

export type Contact = {
  type: ContactType;
  title?: string;
  contact: string;
};

export type Social = {
  id: number;
  type: "vk" | "odnoklassniki" | "telegram";
  link: string;
};

export type Footer = {
  id: number;
  attributes: {
    partners: {
      id: number;
      link: string;
      image: {
        data: {
          id: number;
          attributes: {
            name: string;
            url: string;
            width?: number;
            height: number;
          };
        };
      };
    }[];
    contacts: Contact[];
    working_time: string;
    address: string;
    socials: Social[];
  };
};

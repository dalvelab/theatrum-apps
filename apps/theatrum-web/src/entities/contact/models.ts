import { ContactType } from "@/shared/models/contact";
import { StrapiImage } from "@/shared/models/image";

export type Contact = {
  type: ContactType;
  title?: string;
  contact: string;
}

export type Contacts =  {
  id: number;
  attributes: {
    contacts: Contact[];
    image: StrapiImage;
    address: string;
    working_time: string;
  }
}
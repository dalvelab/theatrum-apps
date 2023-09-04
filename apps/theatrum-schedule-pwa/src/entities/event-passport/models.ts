export type EventPassport = {
  id: number;
  events: Passport[];
}

interface Passport {
  title: string;
  document: {
    id: number;
    name: string;
    url: string;
  };
}
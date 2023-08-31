export type EventPassport = {
  id: number;
  attributes: {
    events: Passport[];
  }
}

interface Passport {
  title: string;
  link: string;
}
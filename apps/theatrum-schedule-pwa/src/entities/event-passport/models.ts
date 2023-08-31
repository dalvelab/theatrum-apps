export type EventPassport = {
  id: number;
  events: Passport[];
}

interface Passport {
  title: string;
  link: string;
}
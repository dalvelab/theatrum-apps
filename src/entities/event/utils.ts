import { isVoid } from '@/shared/utils/mics';
import type { Afisha, Festival } from './models';
import { getformatDateLocale } from '@/shared/utils/formatDate';

// Функция сортирует мероприятия в Афише в зависимости от выбранного месяца 
export function getTicketsByMonth(afisha: Afisha[], filter?: string | string[]): Afisha[] {
  if (isVoid(filter) || afisha.length === 0 || filter === 'all' || typeof filter !== 'string') {
    return afisha;
  }

  return afisha
  .filter((event) => event.attributes.tickets
  .some((ticket) => getformatDateLocale(ticket.date).split(',').toString().substring(3, 5) === filter))
}

export function getFestivalGrid(festival: Festival[]) {
  const festivals: Array<Festival[]> = [];
  const dates: string[] = [];

  for (let i = 0; i < festival.length; i++) {
    const date = festival[i].attributes.date.toString().slice(0, 10);

    if(!dates.includes(date)) {
      dates.push(date);
      festivals.push([festival[i]]);
    } else {
      const index = dates.indexOf(date);
      festivals[index].push(festival[i]);
    }
  }

  return festivals;
}
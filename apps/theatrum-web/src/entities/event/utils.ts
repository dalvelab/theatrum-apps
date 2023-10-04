import { isVoid, getformatDateLocale } from 'platform';

import type { Afisha } from './models';

// Функция сортирует мероприятия в Афише в зависимости от выбранного месяца 
export function getTicketsByMonth(afisha: Afisha[], filter?: string | string[]): Afisha[] {
  if (isVoid(filter) || afisha.length === 0 || filter === 'all' || typeof filter !== 'string') {
    return afisha;
  }

  return afisha
  .filter((event) => event.attributes.tickets
  .some((ticket) =>  getformatDateLocale(ticket.date).split(',').toString().substring(3, 5) === filter))
}
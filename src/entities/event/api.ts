import qs from 'qs';

import { Afisha } from './models';

export type Meta = {
  pagination: {
    page: number;
    pageSize: number;
    pageCount: number;
    total: number;
  }
}

export type ApiResponse<Data, Meta> = {
  data: Data;
  meta: Meta;
}

export async function getAfisha(): Promise<ApiResponse<Afisha[], Meta>> {
  const query = qs.stringify(
    {
      populate: ['event', 'event.banner', 'event.gallery', 'event.production_team', 'event.roles', 'event.meta', 'tickets']
    }
  )
  const res = await fetch(`${process.env.DB_HOST}/afishas?${query}`);
  return res.json();
}
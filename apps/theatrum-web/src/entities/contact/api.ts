import qs from 'qs';
import type { ApiResponse, Meta } from 'platform';

import { Contacts } from './models';

export async function getContacts(): Promise<ApiResponse<Contacts, Meta>> {
  const query = qs.stringify(
    {
      populate: ['contacts', 'image']
    }
  )
  const res = await fetch(`${process.env.DB_HOST}/contact?${query}`);

  return res.json()
}
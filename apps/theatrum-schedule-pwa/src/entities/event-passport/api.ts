import qs from 'qs';

import type { ApiResponse, Meta } from 'platform';

import { EventPassport } from './models';

interface getEventPassportsParams {
  limit?: number;
}

export async function getEventPassports(params: getEventPassportsParams): Promise<ApiResponse<EventPassport, Meta>> {
  const query = qs.stringify(
    {
      pagination: {
        limit: params?.limit || 100,
      },
    }
  )
  const res = await fetch(`${process.env.DB_HOST}/corporate-event-passport?${query}`);

  return res.json()
}
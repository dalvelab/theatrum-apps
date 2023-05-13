import qs from 'qs';

import type {ApiResponse, Meta} from '@/shared/models/api';

import { News } from './models';

export async function getNews(): Promise<ApiResponse<News[], Meta>> {
  const query = qs.stringify(
    {
      pagination: {
        limit: 100,
      },
      populate: ['source', 'image']
    }
  )

  const res = await fetch(`${process.env.DB_HOST}/posts?${query}`);

  return res.json();
}
import qs from 'qs';

import type { ApiResponse, Meta } from '@/shared/models/api';

import { News } from './models';

interface getNewsParams {
  limit?: number;
}

export async function getNews(params: getNewsParams): Promise<ApiResponse<News[], Meta>> {
  const query = qs.stringify(
    {
      pagination: {
        limit: params.limit || 100,
      },
      sort: ['createdAt:desc'],
      populate: ['source', 'image']
    }
  )

  const res = await fetch(`${process.env.DB_HOST}/posts?${query}`);

  return res.json();
}

interface getSingleNews {
  id?: string;
}

export async function getSinglelNews(params: getSingleNews): Promise<ApiResponse<News, Meta>> {
  const query = qs.stringify(
    {
      populate: ['source', 'image']
    }
  )
  const res = await fetch(`${process.env.DB_HOST}/posts/${params.id}?${query}`);

  return res.json()
}
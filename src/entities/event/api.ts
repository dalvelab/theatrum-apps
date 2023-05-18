import qs from 'qs';

import type {ApiResponse, Meta} from '@/shared/models/api';

import { Afisha, Perfomance, Slider } from './models';

interface getAfishaParams {
  limit?: number;
}

export async function getAfisha(params: getAfishaParams): Promise<ApiResponse<Afisha[], Meta>> {
  const query = qs.stringify(
    {
      pagination: {
        limit: params?.limit || 100,
      },
      populate: ['event', 'event.banner', 'event.meta', 'tickets']
    }
  )
  const res = await fetch(`${process.env.DB_HOST}/afishas?${query}`);

  return res.json()
}

interface getSinglelAfisha {
  id?: string;
}

export async function getSinglelAfisha(params: getSinglelAfisha): Promise<ApiResponse<Afisha, Meta>> {
  const query = qs.stringify(
    {
      populate: ['event', 'event.banner', 'event.meta', 'tickets']
    }
  )
  const res = await fetch(`${process.env.DB_HOST}/afishas/${params.id}?${query}`);

  return res.json()
}

export async function getSlider(): Promise<ApiResponse<Slider, Meta>> {
  const query = qs.stringify(
    {
      populate: ['slides', 'slides.event', 'slides.event.banner', 'slides.tickets']
    }
  )
  const res = await fetch(`${process.env.DB_HOST}/slider?${query}`);

  return res.json();
}

export async function getPerfomances(params: getAfishaParams): Promise<ApiResponse<Perfomance[], Meta>> {
  const query = qs.stringify(
    {
      pagination: {
        limit: params?.limit || 100,
      },
      sort: ['event.title'],
      populate: ['event', 'event.banner', 'event.meta', 'tickets']
    }
  )
  const res = await fetch(`${process.env.DB_HOST}/perfomances?${query}`);

  return res.json()
}
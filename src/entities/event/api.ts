import qs from 'qs';

import type {ApiResponse, Meta} from '@/shared/models/api';

import { Afisha, Slider } from './models';

export async function getAfisha(): Promise<ApiResponse<Afisha[], Meta>> {
  const query = qs.stringify(
    {
      pagination: {
        limit: 100,
      },
      populate: ['event', 'event.banner', 'event.gallery', 'event.production_team', 'event.roles', 'event.meta', 'tickets']
    }
  )
  const res = await fetch(`${process.env.DB_HOST}/afishas?${query}`);
  return res.json();
}

export async function getSlider(): Promise<ApiResponse<Slider, Meta>> {
  const query = qs.stringify(
    {
      populate: ['slides', 'slides.event', 'slides.event.banner']
    }
  )
  const res = await fetch(`${process.env.DB_HOST}/slider?${query}`);
  return res.json();
}
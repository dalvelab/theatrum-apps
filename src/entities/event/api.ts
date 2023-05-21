import qs from 'qs';

import type {ApiResponse, Meta} from '@/shared/models/api';

import { Afisha, Performance, Slider } from './models';

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

interface GetSinglelAfisha {
  id?: string;
}

export async function getSinglelAfisha(params: GetSinglelAfisha): Promise<ApiResponse<Afisha, Meta>> {
  const query = qs.stringify(
    {
      populate: ['event', 'event.banner', 'event.meta', 'event.production_team', 'event.roles', 'tickets']
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

export async function getPerformances(params: getAfishaParams): Promise<ApiResponse<Performance[], Meta>> {
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

interface GetSinglelPerfomance {
  id?: string;
}

export async function getSinglelPerformance(params: GetSinglelPerfomance): Promise<ApiResponse<Performance, Meta>> {
  const query = qs.stringify(
    {
      populate: ['event', 'event.banner', 'event.meta', 'event.production_team', 'event.roles']
    }
  )
  const res = await fetch(`${process.env.DB_HOST}/perfomances/${params.id}?${query}`);

  return res.json()
}
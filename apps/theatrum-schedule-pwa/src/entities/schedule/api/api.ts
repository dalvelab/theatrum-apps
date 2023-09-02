import qs from 'qs';

import type { ApiResponse, Meta } from '@/shared/models/api';

import { ScheduleEvent } from './models';

interface getScheduleParams {
  limit?: number;
}

export async function getSchedule(params: getScheduleParams): Promise<ApiResponse<ScheduleEvent[], Meta>> {
  const query = qs.stringify(
    {
      pagination: {
        limit: params?.limit || 100,
      },
      populate: ['people', 'people.worker']
    }
  )
  const res = await fetch(`${process.env.DB_HOST}/corporate-schedules?${query}`);

  return res.json()
}

export async function getScheduleArchive(params: getScheduleParams): Promise<ApiResponse<ScheduleEvent[], Meta>> {
  const query = qs.stringify(
    {
      pagination: {
        limit: params?.limit || 100,
      },
      populate: ['people']
    }
  )
  const res = await fetch(`${process.env.DB_HOST}/corporate-schedule-archives?${query}`);

  return res.json()
}
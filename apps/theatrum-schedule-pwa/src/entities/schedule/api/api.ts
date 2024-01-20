import qs from 'qs';

import type { ApiResponse, Meta } from 'platform';

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

export async function getArchivedScheduleMonths(): Promise<ApiResponse<string[], Meta>> {
  const res = await fetch(`${process.env.DB_HOST}/corporate-schedule-archives`);

  return res.json();
}

interface getArchivedScheduleByMonthParams {
  id: string;
  limit?: number;
}

export async function getArchivedScheduleByMonth(params: getArchivedScheduleByMonthParams): Promise<ApiResponse<ScheduleEvent[], Meta>> {
  const query = qs.stringify(
    {
      pagination: {
        limit: params?.limit || 100,
      },
      populate: ['people', 'people.worker']
    }
  )
  const res = await fetch(`${process.env.DB_HOST}/corporate-schedule-archives/${params.id}?${query}`);

  return res.json()
}
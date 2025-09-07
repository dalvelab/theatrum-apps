import qs from "qs";

import type { ApiResponse, Meta } from "platform";

import { InformationPost, ScheduleEvent } from "./models";

interface getScheduleByMonthParams {
  id: string;
  limit?: number;
}

export async function getScheduleByMonths(): Promise<
  ApiResponse<string[], Meta>
> {
  const res = await fetch(`${process.env.DB_HOST}/corporate-schedules`);

  return res.json();
}

export async function getScheduleByMonth(
  params: getScheduleByMonthParams
): Promise<ApiResponse<ScheduleEvent[], Meta>> {
  const query = qs.stringify({
    pagination: {
      limit: params?.limit || 100,
    },
    populate: ["people", "people.worker"],
  });
  const res = await fetch(
    `${process.env.DB_HOST}/corporate-schedules/${params.id}?${query}`
  );

  return res.json();
}

export async function getArchivedScheduleMonths(): Promise<
  ApiResponse<string[], Meta>
> {
  const res = await fetch(`${process.env.DB_HOST}/corporate-schedule-archives`);

  return res.json();
}

export async function getArchivedScheduleByMonth(
  params: getScheduleByMonthParams
): Promise<ApiResponse<ScheduleEvent[], Meta>> {
  const query = qs.stringify({
    pagination: {
      limit: params?.limit || 100,
    },
    populate: ["people", "people.worker"],
  });
  const res = await fetch(
    `${process.env.DB_HOST}/corporate-schedule-archives/${params.id}?${query}`
  );

  return res.json();
}

export async function getInformation(): Promise<
  ApiResponse<InformationPost[], Meta>
> {
  const query = qs.stringify({
    pagination: {
      limit: 100,
    },
    sort: ["createdAt:desc"],
  });

  const res = await fetch(
    `${process.env.DB_HOST}/corporate-informations?${query}`
  );

  return res.json();
}

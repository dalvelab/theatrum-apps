import qs from "qs";
import type { ApiResponse, Meta } from "platform";
import { Project } from "./models";

export async function getProjects(): Promise<ApiResponse<Project[], Meta>> {
  const query = qs.stringify(
    {
      populate: ["image", "gallery"],
    },
    {
      encodeValuesOnly: true,
    }
  );

  const res = await fetch(`${process.env.DB_HOST}/projects?${query}`);

  return res.json();
}

interface getSingleProjectParams {
  id: string;
}

export async function getSingleProject(
  params: getSingleProjectParams
): Promise<ApiResponse<Project, Meta>> {
  const query = qs.stringify(
    {
      populate: ["image", "gallery", "project_type"],
    },
    {
      encodeValuesOnly: true,
    }
  );

  const res = await fetch(
    `${process.env.DB_HOST}/projects/${params.id}?${query}`
  );

  return res.json();
}

import qs from 'qs';

import type { ApiResponse, Meta } from '@/shared/models/api';

import { Footer } from './models';

export async function getFooter(): Promise<ApiResponse<Footer, Meta>> {
  const query = qs.stringify(
    {
      populate: ['partners', 'contacts', 'socials']
    }
  )
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/footer?${query}`);

  return res.json()
}
import qs from 'qs';
import type { ApiResponse, Meta } from 'platform';

import { Footer } from './models';

export async function getFooter(): Promise<ApiResponse<Footer, Meta>> {
  const query = qs.stringify(
    {
      populate: ['partners', 'contacts', 'socials']
    }
  )
  const res = await fetch(`/api/footer?${query}`);

  return res.json()
}
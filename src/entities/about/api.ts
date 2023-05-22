import qs from 'qs';

import type {ApiResponse, Meta} from '@/shared/models/api';

import { AboutPage } from './models';

export async function getAboutPage(): Promise<ApiResponse<AboutPage, Meta>> {
  const query = qs.stringify(
    {
      populate: 
      // {
      //   registerDocuments: {
      //     fields: ['file']
      //   },
      //   management: {
      //     fields: ['image']
      //   },
      //   scenes: {
      //     fields: ['documents', 'documents.file', 'gallery']
      //   },
      //   description: {
      //     fields: ['image']
      //   }
      // }
      [
        'registerDocuments', 
        'registerDocuments.file', 
        'management', 
        'management.image', 
        'scenes', 
        'scenes.documents',
        'scenes.documents.file',
        'scenes.gallery',
        'description', 
        'description.image'
      ]
    }
  )
  const res = await fetch(`${process.env.DB_HOST}/about-page?${query}`);

  return res.json()
}
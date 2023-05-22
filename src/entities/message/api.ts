import type {ApiResponse, Meta} from '@/shared/models/api';

import { FeedbackMessageResponse, Message } from './models';

export async function createFeedbackMessage(message: Message): Promise<ApiResponse<FeedbackMessageResponse, Meta>> {

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/messages`, {
    method: 'POST',
    cache: "no-cache", 
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      data: message
    })
  });

  return res.json()
}
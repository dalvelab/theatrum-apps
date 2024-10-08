import type { ApiResponse, Meta } from 'platform';

import { MessageResponse, Message } from './models';

export async function createMessage(message: Message): Promise<ApiResponse<MessageResponse, Meta>> {

  const res = await fetch(`/api/messages`, {
    method: "POST",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      data: message,
    }),
  });

  return res.json()
}
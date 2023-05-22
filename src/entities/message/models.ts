export type Message = {
  title: 'Обратная связь' | 'Бронирование'
  name: string;
  phone: string;
  email: string;
  body: string;
  status: 'new' | 'closed'
}

export type CreateMessage = {
  data: Message;
}

export type FeedbackMessageResponse = {
  id: number;
  attributes: Message;
}
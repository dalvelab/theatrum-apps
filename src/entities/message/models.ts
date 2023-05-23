export type Message = {
  title: 'Обратная связь' | 'Бронирование'
  name: string;
  phone: string;
  email: string;
  body: string;
  status: 'new' | 'closed'
}

export type MessageResponse = {
  id: number;
  attributes: Message;
}
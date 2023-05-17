export type ContatType = 'text' | 'email' | 'phone';

export type Contact = {
  type: ContatType;
  title?: string;
  contact: string;
}

export type Footer = {
  id: number;
  attributes: {
    partners: {
      data: {
        id: number;
        attributes: {
          name: string;
          url: string;
          width?: number;
          height: number;
        }
      }[]
    };
    contacts: Contact[];
  }
} 
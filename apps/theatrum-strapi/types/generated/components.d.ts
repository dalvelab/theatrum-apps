import type { Attribute, Schema } from '@strapi/strapi';

export interface AboutPerson extends Schema.Component {
  collectionName: 'components_about_people';
  info: {
    description: '';
    displayName: 'person';
  };
  attributes: {
    image: Attribute.Media<'images'> & Attribute.Required;
    job: Attribute.String;
    name: Attribute.String & Attribute.Required;
  };
}

export interface AboutScene extends Schema.Component {
  collectionName: 'components_about_scenes';
  info: {
    description: '';
    displayName: 'scene';
  };
  attributes: {
    description: Attribute.RichText & Attribute.Required;
    documents: Attribute.Component<'documents.advanced-document', true>;
    gallery: Attribute.Media<'images', true> & Attribute.Required;
    title: Attribute.String & Attribute.Required;
  };
}

export interface AboutSocial extends Schema.Component {
  collectionName: 'components_about_socials';
  info: {
    description: '';
    displayName: 'social';
  };
  attributes: {
    link: Attribute.String & Attribute.Required;
    type: Attribute.Enumeration<
      ['vk', 'telegram', 'instagram', 'odnoklassniki']
    > &
      Attribute.Required;
  };
}

export interface AboutTextBlock extends Schema.Component {
  collectionName: 'components_about_text_blocks';
  info: {
    description: '';
    displayName: 'TextBlock';
  };
  attributes: {
    button: Attribute.Enumeration<['none', 'table_booking']> &
      Attribute.Required &
      Attribute.DefaultTo<'none'>;
    image: Attribute.Media<'images'> & Attribute.Required;
    text: Attribute.Text & Attribute.Required;
  };
}

export interface ContactContact extends Schema.Component {
  collectionName: 'components_contact_contacts';
  info: {
    description: '';
    displayName: 'Contact';
  };
  attributes: {
    contact: Attribute.String & Attribute.Required;
    title: Attribute.String;
    type: Attribute.Enumeration<['text', 'email', 'phone']> &
      Attribute.DefaultTo<'text'>;
  };
}

export interface CorporateEventPassport extends Schema.Component {
  collectionName: 'components_corporate_event_passports';
  info: {
    description: '';
    displayName: 'EventPassport';
  };
  attributes: {
    document: Attribute.Media<'files'> & Attribute.Required;
    title: Attribute.String;
  };
}

export interface CorporateWorker extends Schema.Component {
  collectionName: 'components_corporate_workers';
  info: {
    description: '';
    displayName: 'Worker';
  };
  attributes: {
    role: Attribute.String;
    worker: Attribute.Relation<
      'corporate.worker',
      'oneToOne',
      'api::worker.worker'
    >;
  };
}

export interface DocumentsAdvancedDocument extends Schema.Component {
  collectionName: 'components_documents_advanced_documents';
  info: {
    description: '';
    displayName: 'AdvancedDocument';
  };
  attributes: {
    file: Attribute.Media<'files'> & Attribute.Required;
    name: Attribute.String & Attribute.Required;
  };
}

export interface EventRole extends Schema.Component {
  collectionName: 'components_event_roles';
  info: {
    description: '';
    displayName: 'role';
  };
  attributes: {
    name: Attribute.String & Attribute.Required;
    role: Attribute.String & Attribute.Required;
  };
}

export interface EventTicket extends Schema.Component {
  collectionName: 'components_event_tickets';
  info: {
    description: '';
    displayName: 'ticket';
  };
  attributes: {
    date: Attribute.DateTime & Attribute.Required;
    link: Attribute.String & Attribute.Required;
    paid: Attribute.Boolean & Attribute.Required & Attribute.DefaultTo<true>;
    title: Attribute.String & Attribute.Required & Attribute.Private;
  };
}

export interface FooterPartners extends Schema.Component {
  collectionName: 'components_footer_partners';
  info: {
    description: '';
    displayName: 'partner';
  };
  attributes: {
    image: Attribute.Media<'images'>;
    link: Attribute.String;
  };
}

export interface NewsSource extends Schema.Component {
  collectionName: 'components_news_sources';
  info: {
    description: '';
    displayName: 'source';
  };
  attributes: {
    link: Attribute.String;
    publish_date: Attribute.Date;
    title: Attribute.String & Attribute.Required;
  };
}

export interface SeoSeo extends Schema.Component {
  collectionName: 'components_seo_seos';
  info: {
    displayName: 'SEO';
  };
  attributes: {
    description: Attribute.String;
    keywords: Attribute.String;
    title: Attribute.String;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'about.person': AboutPerson;
      'about.scene': AboutScene;
      'about.social': AboutSocial;
      'about.text-block': AboutTextBlock;
      'contact.contact': ContactContact;
      'corporate.event-passport': CorporateEventPassport;
      'corporate.worker': CorporateWorker;
      'documents.advanced-document': DocumentsAdvancedDocument;
      'event.role': EventRole;
      'event.ticket': EventTicket;
      'footer.partners': FooterPartners;
      'news.source': NewsSource;
      'seo.seo': SeoSeo;
    }
  }
}

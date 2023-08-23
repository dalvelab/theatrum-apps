export type StrapiImage = {
  data: {
    id: number;
    attributes: {
      name: string;
      url: string;
      width?: number;
      height: number;
    }
  }
}

export type StrapiFile = {
  id: number;
  attributes: {
    name: string;
    url: string;
    size: number;
    mime: string;
  }
}
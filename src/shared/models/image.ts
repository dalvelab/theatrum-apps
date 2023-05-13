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
export type StrapiImage = {
  id: number;
  attributes: {
    name: string;
    url: string;
    width?: number;
    height: number;
  }
}
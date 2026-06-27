export type Meta = {
  pagination: {
    page: number;
    pageSize: number;
    pageCount: number;
    total: number;
  };
};

export type ApiResponse<Data, Meta> = {
  data: Data;
  meta: Meta;
  error?: {
    status: number;
    name: string;
    message: string;
    details: string;
  };
};

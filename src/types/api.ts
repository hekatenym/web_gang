export interface ApiResponse<T = any> {
  code: number;
  message: string;
  data?: T;
}

export interface PaginatedResponse<T> extends ApiResponse {
  data?: {
    items: T[];
    total: number;
    page: number;
    pageSize: number;
  };
}

export interface PageCreateInput {
  title: string;
  route: string;
  seo: {
    title: string;
    description: string;
    keywords: string;
  };
}

export interface PageUpdateInput extends Partial<PageCreateInput> {
  id: string;
}

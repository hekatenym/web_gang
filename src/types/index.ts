export * from './api';
export * from './page';
export * from './component';
export * from './editor';
export * from './store';

// 通用类型定义
export interface BaseEntity {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface PaginationParams {
  page: number;
  pageSize: number;
}

export interface SortParams {
  field: string;
  order: 'asc' | 'desc';
}

export interface QueryParams extends PaginationParams {
  sort?: SortParams;
  search?: string;
  filter?: Record<string, any>;
}
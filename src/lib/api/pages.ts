import { apiClient } from '@/lib/api-client';
import { IPage } from '@/models/page.model';

export interface UpdatePageData {
  title?: string;
  slug?: string;
  description?: string;
  seo?: {
    title: string;
    description: string;
    keywords: string[];
    ogImage?: string;
    canonicalUrl?: string;
  };
  status?: 'draft' | 'published' | 'archived';
  components?: any[];
  isTemplate?: boolean;
  version?: number;
}

export async function createPage(data: Partial<IPage>) {
  try {
    console.log('发送创建页面请求:', data);
    const response = await apiClient.post('/pages', data);
    console.log('创建页面响应:', response.data);
    return response.data;
  } catch (error: any) {
    console.error('创建页面失败:', error.response?.data || error.message);
    throw new Error(error.response?.data?.error || '创建页面失败');
  }
}

export async function savePage(pageId: string, data: Partial<IPage>) {
  try {
    const response = await apiClient.put(`/pages/${pageId}`, data);
    return response.data;
  } catch (error: any) {
    console.error('保存页面失败:', error.response?.data || error.message);
    throw error;
  }
}

export async function getPages(params?: { page?: number; pageSize?: number }) {
  try {
    const response = await apiClient.get('/pages', { params });
    return response.data;
  } catch (error: any) {
    console.error('获取页面列表失败:', error.response?.data || error.message);
    throw error;
  }
}

export async function getPage(pageId: string) {
  try {
    const response = await apiClient.get(`/pages/${pageId}`);
    return response.data;
  } catch (error: any) {
    console.error('获取页面失败:', error.response?.data || error.message);
    throw error;
  }
}

export async function updatePageStatus(pageId: string, status: 'draft' | 'published' | 'archived') {
  try {
    const response = await apiClient.patch(`/pages/${pageId}/status`, { status });
    return response.data;
  } catch (error: any) {
    console.error('更新页面状态失败:', error.response?.data || error.message);
    throw error;
  }
}

export async function updatePageSEO(pageId: string, seo: IPage['seo']) {
  try {
    const response = await apiClient.patch(`/pages/${pageId}/seo`, { seo });
    return response.data;
  } catch (error: any) {
    console.error('更新页面SEO失败:', error.response?.data || error.message);
    throw error;
  }
} 
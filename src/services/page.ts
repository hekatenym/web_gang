import { message } from 'antd';

export interface Page {
  _id: string;
  title: string;
  slug: string;
  description?: string;
  components: any[];
  seo?: {
    title?: string;
    description?: string;
    keywords?: string[];
    ogImage?: string;
    canonicalUrl?: string;
  };
  status: 'draft' | 'published';
  createdBy: string;
  isTemplate: boolean;
  version: number;
  createdAt: Date;
  updatedAt: Date;
}

// 获取页面数据
export async function getPage(id: string): Promise<Page> {
  try {
    const response = await fetch(`/api/pages/${id}`);
    if (!response.ok) {
      throw new Error('获取页面失败');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('获取页面失败:', error);
    message.error('获取页面失败');
    throw error;
  }
}

// 保存页面数据
export async function savePage(id: string, data: any) {
  try {
    const response = await fetch(`/api/pages/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('Failed to save page');
    }

    return await response.json();
  } catch (error) {
    throw error;
  }
}

// 创建新页面
export async function createPage(data: Partial<Page>): Promise<Page> {
  try {
    const response = await fetch('/api/pages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('创建页面失败');
    }

    return await response.json();
  } catch (error) {
    console.error('创建页面失败:', error);
    throw error;
  }
}

// 删除页面
export async function deletePage(id: string): Promise<void> {
  try {
    const response = await fetch(`/api/pages/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error('删除页面失败');
    }
  } catch (error) {
    console.error('删除页面失败:', error);
    throw error;
  }
}

// 获取页面列表
export async function getPages(params?: {
  page?: number;
  pageSize?: number;
  status?: string;
  search?: string;
}): Promise<{ data: Page[]; total: number }> {
  try {
    const queryParams = new URLSearchParams();
    if (params?.page) queryParams.set('page', params.page.toString());
    if (params?.pageSize) queryParams.set('pageSize', params.pageSize.toString());
    if (params?.status) queryParams.set('status', params.status);
    if (params?.search) queryParams.set('search', params.search);

    const response = await fetch(`/api/pages?${queryParams.toString()}`);
    if (!response.ok) {
      throw new Error('获取页面列表失败');
    }

    return await response.json();
  } catch (error) {
    console.error('获取页面列表失败:', error);
    throw error;
  }
} 
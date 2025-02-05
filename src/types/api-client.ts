import { ApiResponse, PaginatedResponse } from '@/types/api';

class ApiClient {
  private async request<T>(
    url: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'API request failed');
    }

    return data;
  }

  // 页面相关 API
  async getPages(page = 1, pageSize = 10) {
    return this.request<PaginatedResponse<any>>(`/api/pages?page=${page}&pageSize=${pageSize}`);
  }

  async getPage(id: string) {
    return this.request<any>(`/api/pages/${id}`);
  }

  async createPage(data: any) {
    return this.request('/api/pages', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updatePage(id: string, data: any) {
    return this.request(`/api/pages/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async deletePage(id: string) {
    return this.request(`/api/pages/${id}`, {
      method: 'DELETE',
    });
  }
}

export const apiClient = new ApiClient();
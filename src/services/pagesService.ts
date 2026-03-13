import api from './api';
import type { ApiResponse, Page, PageRequest } from '@/types';

export const pagesService = {
  async getAll(): Promise<Page[]> {
    const response = await api.get<ApiResponse<Page[]>>('/api/pages');
    return response.data.data ?? [];
  },

  async getBySlug(slug: string): Promise<Page> {
    // Ensure slug is trimmed and lowercased for backend compatibility
    const safeSlug = slug.trim().toLowerCase();
    const response = await api.get<ApiResponse<Page>>(`/api/pages/${safeSlug}`);
    if (!response.data.data) throw new Error('Page not found');
    return response.data.data;
  },

  async create(data: PageRequest): Promise<Page> {
    const response = await api.post<ApiResponse<Page>>('/api/pages', data);
    if (!response.data.data) throw new Error('Create failed: no page returned');
    return response.data.data;
  },

  async update(id: number, data: PageRequest): Promise<Page> {
    const response = await api.put<ApiResponse<Page>>(`/api/pages/${id}`, data);
    if (!response.data.data) throw new Error('Update failed: no page returned');
    return response.data.data;
  },

  async delete(id: number): Promise<void> {
    await api.delete(`/api/pages/${id}`);
  },
};

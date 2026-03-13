import api from './api';
import type { ApiResponse, MenuItem, MenuItemRequest, ReorderRequest } from '@/types';

export const menuService = {
  async getAll(): Promise<MenuItem[]> {
    const response = await api.get<ApiResponse<MenuItem[]>>('/api/menu');
    return response.data.data ?? [];
  },

  async create(data: MenuItemRequest): Promise<MenuItem> {
    const response = await api.post<ApiResponse<MenuItem>>('/api/menu', data);
    if (!response.data.data) throw new Error('Create failed: no menu item returned');
    return response.data.data;
  },

  async update(id: number, data: MenuItemRequest): Promise<MenuItem> {
    const response = await api.put<ApiResponse<MenuItem>>(`/api/menu/${id}`, data);
    if (!response.data.data) throw new Error('Update failed: no menu item returned');
    return response.data.data;
  },

  async reorder(data: ReorderRequest): Promise<void> {
    await api.put('/api/menu/reorder', data);
  },

  async delete(id: number): Promise<void> {
    await api.delete(`/api/menu/${id}`);
  },
};

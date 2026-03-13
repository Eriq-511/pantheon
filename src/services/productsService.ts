import api from './api';
import type { ApiResponse, Product } from '@/types';

interface ProductRequest {
  title: string;
  description: string;
  category: string;
  price: number;
  image: string;
}

export const productsService = {
  async getAll(category?: string): Promise<Product[]> {
    const response = await api.get<ApiResponse<Product[]>>('/api/products', {
      params: category ? { category } : undefined,
    });
    return response.data.data ?? [];
  },

  async create(data: ProductRequest): Promise<Product> {
    const response = await api.post<ApiResponse<Product>>('/api/products', data);
    if (!response.data.data) throw new Error('Create failed: no product returned');
    return response.data.data;
  },

  async updateImage(id: number, image: string): Promise<Product> {
    const response = await api.patch<ApiResponse<Product>>(`/api/products/${id}/image`, { image });
    if (!response.data.data) throw new Error('Image update failed: no product returned');
    return response.data.data;
  },
};

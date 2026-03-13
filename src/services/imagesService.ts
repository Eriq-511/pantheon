import api from './api';
import type { ApiResponse, CmsImage, ImageUpdateRequest } from '@/types';

export const imagesService = {
  async getAll(): Promise<CmsImage[]> {
    const response = await api.get<ApiResponse<CmsImage[]>>('/api/images');
    return response.data.data ?? [];
  },

  async upload(file: File, altText?: string): Promise<CmsImage> {
    const formData = new FormData();
    formData.append('file', file);
    if (altText) formData.append('altText', altText);

    const response = await api.post<ApiResponse<CmsImage>>(
      '/api/images/upload',
      formData,
      { headers: { 'Content-Type': 'multipart/form-data' } }
    );
    if (!response.data.data) throw new Error('Upload failed: no image data returned');
    return response.data.data;
  },

  async update(id: number, data: ImageUpdateRequest): Promise<CmsImage> {
    const response = await api.put<ApiResponse<CmsImage>>(
      `/api/images/${id}`,
      data
    );
    if (!response.data.data) throw new Error('Update failed: no image data returned');
    return response.data.data;
  },

  async delete(id: number): Promise<void> {
    await api.delete(`/api/images/${id}`);
  },
};

import api from './api';
import type { ApiResponse, LoginRequest, LoginResponse, RegisterRequest } from '@/types';

export const authService = {
  async login(credentials: LoginRequest): Promise<LoginResponse> {
    const response = await api.post<ApiResponse<LoginResponse>>(
      '/api/auth/login',
      credentials
    );
    if (!response.data.data) throw new Error('Login failed: no user data returned');
    return response.data.data;
  },

  async register(data: RegisterRequest): Promise<LoginResponse> {
    const response = await api.post<ApiResponse<LoginResponse>>(
      '/api/auth/register',
      data
    );
    if (!response.data.data) throw new Error('Registration failed: no user data returned');
    return response.data.data;
  },

  async logout(): Promise<void> {
    await api.post('/api/auth/logout');
  },

  async getMe(): Promise<LoginResponse> {
    const response = await api.get<ApiResponse<LoginResponse>>('/api/auth/me');
    if (!response.data.data) throw new Error('Not authenticated');
    return response.data.data;
  },
};

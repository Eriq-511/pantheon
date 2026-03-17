import api from './api';
import type { ApiResponse, LoginRequest, LoginResponse, RegisterRequest } from '@/types';

export const authService = {
  async login(credentials: LoginRequest): Promise<LoginResponse> {
    const response = await api.post<ApiResponse<LoginResponse>>(
      '/api/auth/login',
      credentials
    );
    if (!response.data.data) throw new Error('Login failed: no user data returned');
    // Set a readable (non-HttpOnly) cookie so Next.js middleware can gate /admin routes.
    // Real auth is still enforced by the backend on every API call.
    if (typeof window !== 'undefined') {
      const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toUTCString();
      document.cookie = `pantheon_auth=1; path=/; expires=${expires}; SameSite=Lax`;
    }
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
    if (typeof window !== 'undefined') {
      localStorage.removeItem('pantheon_jwt');
      // Clear the middleware routing cookie
      document.cookie = 'pantheon_auth=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Lax';
    }
  },

  async getMe(): Promise<LoginResponse> {
    const response = await api.get<ApiResponse<LoginResponse>>('/api/auth/me');
    if (!response.data.data) throw new Error('Not authenticated');
    return response.data.data;
  },
};

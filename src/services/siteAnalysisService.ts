import api from './api';
import type { ApiResponse, SiteAnalysisResult } from '@/types';

export const siteAnalysisService = {
  async analyze(url: string): Promise<SiteAnalysisResult> {
    const response = await api.post<ApiResponse<SiteAnalysisResult>>('/api/site-analysis', { url });
    if (!response.data.data) throw new Error('Analysis failed: no data returned');
    return response.data.data;
  },
};

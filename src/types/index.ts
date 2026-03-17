// ===== Auth =====

export interface User {
  id: number;
  username: string;
  role: 'ADMIN';
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface RegisterRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  id: number;
  username: string;
  role: 'ADMIN';
  token?: string;
  jwt?: string;
}

// ===== Pages =====

export interface Page {
  id: number;
  title: string;
  slug: string;
  content: string;
  status: 'draft' | 'published';
  metaTitle?: string;
  metaDescription?: string;
  ogImageUrl?: string;
  createdAt: string;
  updatedAt: string;
}

export interface PageRequest {
  title: string;
  slug: string;
  content: string;
  status: 'draft' | 'published';
  metaTitle?: string;
  metaDescription?: string;
  ogImageUrl?: string;
}

// ===== Images =====

export interface CmsImage {
  id: number;
  filename: string;
  cloudinaryUrl: string;
  cloudinaryPublicId: string;
  altText: string | null;
  uploadedAt: string;
}

export interface ImageUpdateRequest {
  altText: string;
}

// ===== Menu =====

export interface MenuItem {
  id: number;
  label: string;
  url: string | null;
  icon: string | null;
  orderIndex: number;
  pageId: number | null;
  pageSlug: string | null;
}

export interface MenuItemRequest {
  label: string;
  url?: string;
  icon?: string;
  orderIndex?: number;
  pageId?: number | null;
}

export interface ReorderItem {
  id: number;
  orderIndex: number;
}

export interface ReorderRequest {
  items: ReorderItem[];
}

// ===== Products (FakeStore API) =====

export interface ProductRating {
  rate: number;
  count: number;
}

export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: ProductRating;
}

// ===== Site Analysis =====

export interface SiteAnalysisResult {
  url: string;
  platformType: string;
  platformName: string;
  confidence: 'HIGH' | 'MEDIUM' | 'LOW';
  summary: string;
  capabilities: string[];
  detectedFeatures: string[];
  connectorStatus: 'full_api' | 'partial_api' | 'read_only' | 'none';
  recommendation: string;
}

export interface LinkAnalysisProfile {
  sourceKey: 'connectedUrl' | 'twitter' | 'facebook' | 'instagram' | 'linkedin' | 'github';
  label: string;
  url: string;
  platformType: string;
  platformName: string;
  connectorStatus: 'full_api' | 'partial_api' | 'read_only' | 'none' | '';
  summary: string;
  recommendation: string;
  confidence: 'HIGH' | 'MEDIUM' | 'LOW';
  updatedAt: string;
}

// ===== API Response Wrapper =====

export interface ApiResponse<T> {
  success: boolean;
  data?: T | null;
  message?: string;
  error?: string;
  status?: number;
}

// ===== Dashboard Stats =====

export interface StatsData {
  totalPages: number;
  totalImages: number;
  totalMenuItems: number;
}

// ===== Form Validation =====

export interface FormErrors {
  [key: string]: string;
}

// ===== Site Settings =====

export interface SiteSettings {
  siteName: string;
  footerText: string;
  logoUrl: string;
  siteConnection: {
    connectedUrl: string;
    platformType: string;
    platformName: string;
    connectorStatus: string;
    summary: string;
    recommendation: string;
    updatedAt: string;
  };
  analyzedLinks: LinkAnalysisProfile[];
  socialLinks: {
    twitter: string;
    facebook: string;
    instagram: string;
    linkedin: string;
    github: string;
  };
}

import api from './api';
import type { ApiResponse, LinkAnalysisProfile, SiteSettings } from '@/types';

/** Map frontend SiteSettings ↔ backend flat key-value pairs. */

function serializeProfiles(profiles: LinkAnalysisProfile[]): string {
  return JSON.stringify(profiles);
}

function parseProfiles(raw: string | undefined): LinkAnalysisProfile[] {
  if (!raw) return [];

  try {
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];

    return parsed
      .filter((item): item is LinkAnalysisProfile => !!item && typeof item === 'object')
      .map((item) => ({
        sourceKey: item.sourceKey,
        label: typeof item.label === 'string' ? item.label : '',
        url: typeof item.url === 'string' ? item.url : '',
        platformType: typeof item.platformType === 'string' ? item.platformType : '',
        platformName: typeof item.platformName === 'string' ? item.platformName : '',
        connectorStatus: typeof item.connectorStatus === 'string' ? item.connectorStatus : '',
        summary: typeof item.summary === 'string' ? item.summary : '',
        recommendation: typeof item.recommendation === 'string' ? item.recommendation : '',
        confidence: item.confidence === 'HIGH' || item.confidence === 'MEDIUM' || item.confidence === 'LOW'
          ? item.confidence
          : 'LOW',
        updatedAt: typeof item.updatedAt === 'string' ? item.updatedAt : '',
      }))
      .filter((item) => !!item.url);
  } catch {
    return [];
  }
}

function toFlat(s: SiteSettings): Record<string, string> {
  return {
    site_name:        s.siteName,
    footer_text:      s.footerText,
    logo_url:         s.logoUrl,
    connected_site_url:       s.siteConnection.connectedUrl,
    detected_platform_type:   s.siteConnection.platformType,
    detected_platform_name:   s.siteConnection.platformName,
    detected_connector_status: s.siteConnection.connectorStatus,
    detected_summary:         s.siteConnection.summary,
    detected_recommendation:  s.siteConnection.recommendation,
    detected_updated_at:      s.siteConnection.updatedAt,
    detected_link_profiles:   serializeProfiles(s.analyzedLinks),
    social_twitter:   s.socialLinks.twitter,
    social_facebook:  s.socialLinks.facebook,
    social_instagram: s.socialLinks.instagram,
    social_linkedin:  s.socialLinks.linkedin,
    social_github:    s.socialLinks.github,
  };
}

function fromFlat(data: Record<string, string>): SiteSettings {
  return {
    siteName:   data['site_name']        ?? '',
    footerText: data['footer_text']      ?? '',
    logoUrl:    data['logo_url']         ?? '',
    siteConnection: {
      connectedUrl: data['connected_site_url'] ?? '',
      platformType: data['detected_platform_type'] ?? '',
      platformName: data['detected_platform_name'] ?? '',
      connectorStatus: data['detected_connector_status'] ?? '',
      summary: data['detected_summary'] ?? '',
      recommendation: data['detected_recommendation'] ?? '',
      updatedAt: data['detected_updated_at'] ?? '',
    },
    analyzedLinks: parseProfiles(data['detected_link_profiles']),
    socialLinks: {
      twitter:   data['social_twitter']   ?? '',
      facebook:  data['social_facebook']  ?? '',
      instagram: data['social_instagram'] ?? '',
      linkedin:  data['social_linkedin']  ?? '',
      github:    data['social_github']    ?? '',
    },
  };
}

export const settingsService = {
  async get(): Promise<SiteSettings> {
    const response = await api.get<ApiResponse<Record<string, string>>>('/api/settings');
    return fromFlat(response.data.data ?? {});
  },

  async update(settings: SiteSettings): Promise<SiteSettings> {
    const response = await api.put<ApiResponse<Record<string, string>>>(
      '/api/settings',
      toFlat(settings)
    );
    return fromFlat(response.data.data ?? {});
  },

  async saveSiteProfile(
    settings: SiteSettings['siteConnection'],
    analyzedLinks: SiteSettings['analyzedLinks']
  ): Promise<void> {
    await api.put<ApiResponse<Record<string, string>>>('/api/settings', {
      connected_site_url: settings.connectedUrl,
      detected_platform_type: settings.platformType,
      detected_platform_name: settings.platformName,
      detected_connector_status: settings.connectorStatus,
      detected_summary: settings.summary,
      detected_recommendation: settings.recommendation,
      detected_updated_at: settings.updatedAt,
      detected_link_profiles: serializeProfiles(analyzedLinks),
    });
  },
};

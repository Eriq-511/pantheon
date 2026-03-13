'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  Save, Globe, Twitter, Facebook, Instagram, Linkedin, Github, AlertCircle,
} from 'lucide-react';
import { clsx } from 'clsx';
import toast from 'react-hot-toast';
import { settingsService } from '@/services/settingsService';
import { siteAnalysisService } from '@/services/siteAnalysisService';
import type { LinkAnalysisProfile, SiteSettings } from '@/types';

type SocialLinks = SiteSettings['socialLinks'];
type SettingsState = SiteSettings;
type AnalysisTarget = {
  sourceKey: LinkAnalysisProfile['sourceKey'];
  label: string;
  url: string;
};

const URL_RE = /^(https?:\/\/)[^\s$.?#].[^\s]*$/i;
const isValidUrl = (v: string) => v === '' || URL_RE.test(v);

const LINK_LABELS: Record<LinkAnalysisProfile['sourceKey'], string> = {
  connectedUrl: 'Primary Website',
  twitter: 'Twitter / X',
  facebook: 'Facebook',
  instagram: 'Instagram',
  linkedin: 'LinkedIn',
  github: 'GitHub',
};

function buildPrimaryConnection(
  currentUrl: string,
  profiles: LinkAnalysisProfile[]
): SettingsState['siteConnection'] {
  const primaryUrl = currentUrl.trim();
  const primaryProfile = primaryUrl
    ? profiles.find((profile) => profile.url === primaryUrl)
    : profiles[0];

  return {
    connectedUrl: primaryUrl,
    platformType: primaryProfile?.platformType || '',
    platformName: primaryProfile?.platformName || '',
    connectorStatus: primaryProfile?.connectorStatus || '',
    summary: primaryProfile?.summary || '',
    recommendation: primaryProfile?.recommendation || '',
    updatedAt: primaryProfile?.updatedAt || '',
  };
}

const DEFAULTS: SettingsState = {
  siteName: '',
  footerText: '',
  logoUrl: '',
  siteConnection: {
    connectedUrl: '',
    platformType: '',
    platformName: '',
    connectorStatus: '',
    summary: '',
    recommendation: '',
    updatedAt: '',
  },
  analyzedLinks: [],
  socialLinks: { twitter: '', facebook: '', instagram: '', linkedin: '', github: '' },
};

function validate(s: SettingsState): Record<string, string> {
  const e: Record<string, string> = {};
  if (!s.siteName.trim()) e.siteName = 'Site name is required';
  else if (s.siteName.length > 100) e.siteName = 'Max 100 characters';
  if (s.footerText.length > 500) e.footerText = 'Max 500 characters';
  if (!isValidUrl(s.logoUrl)) e.logoUrl = 'Must be a valid URL';
  if (!isValidUrl(s.siteConnection.connectedUrl)) e.connectedUrl = 'Must be a valid URL';
  (Object.keys(s.socialLinks) as (keyof SocialLinks)[]).forEach((k) => {
    if (!isValidUrl(s.socialLinks[k])) e[`social_${k}`] = 'Must be a valid URL';
  });
  return e;
}

const sectionCls =
  'bg-white dark:bg-[#071828] rounded-2xl border border-border dark:border-teal-900/60 p-6 space-y-4';

const inputCls = (hasErr: boolean) =>
  clsx(
    'w-full px-3 py-2 rounded-lg border text-sm transition-colors',
    'bg-white dark:bg-slate-800/60 text-text-primary dark:text-slate-100 placeholder:text-slate-400',
    'focus:outline-none focus:ring-2 focus:ring-teal/50',
    hasErr
      ? 'border-red-400 dark:border-red-500'
      : 'border-border dark:border-slate-600 hover:border-slate-400 dark:hover:border-slate-500'
  );

function FieldErr({ msg }: { msg?: string }) {
  if (!msg) return null;
  return (
    <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
      <AlertCircle size={11} />
      {msg}
    </p>
  );
}

const SOCIAL_ROWS: {
  key: keyof SocialLinks;
  label: string;
  placeholder: string;
  icon: React.ReactNode;
}[] = [
  { key: 'twitter',   label: 'Twitter / X', placeholder: 'https://twitter.com/yourhandle',    icon: <Twitter size={13} /> },
  { key: 'facebook',  label: 'Facebook',    placeholder: 'https://facebook.com/yourpage',      icon: <Facebook size={13} /> },
  { key: 'instagram', label: 'Instagram',   placeholder: 'https://instagram.com/yourhandle',   icon: <Instagram size={13} /> },
  { key: 'linkedin',  label: 'LinkedIn',    placeholder: 'https://linkedin.com/company/yours', icon: <Linkedin size={13} /> },
  { key: 'github',    label: 'GitHub',      placeholder: 'https://github.com/yourusername',    icon: <Github size={13} /> },
];

export default function SettingsPage() {
  const [form, setForm] = useState<SettingsState>(DEFAULTS);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState(false);
  const [isDirty, setIsDirty] = useState(false);
  const [loading, setLoading] = useState(true);
  const [profileStatus, setProfileStatus] = useState<'idle' | 'checking' | 'ready' | 'error'>('idle');
  const [profileNote, setProfileNote] = useState('');
  const lastAnalyzedRef = useRef('');

  useEffect(() => {
    settingsService.get()
      .then((s) => setForm(s))
      .catch(() => { /* keep defaults on error */ })
      .finally(() => setLoading(false));
  }, []);

  const set = (k: keyof Omit<SettingsState, 'socialLinks' | 'siteConnection'>, v: string) => {
    setForm((p) => ({ ...p, [k]: v }));
    setIsDirty(true);
    setErrors((p) => { const n = { ...p }; delete n[k]; return n; });
  };

  const setConnectionUrl = (v: string) => {
    setForm((p) => ({ ...p, siteConnection: { ...p.siteConnection, connectedUrl: v } }));
    setIsDirty(true);
    setErrors((p) => { const n = { ...p }; delete n.connectedUrl; return n; });
  };

  const setSocial = (k: keyof SocialLinks, v: string) => {
    setForm((p) => ({ ...p, socialLinks: { ...p.socialLinks, [k]: v } }));
    setIsDirty(true);
    setErrors((p) => { const n = { ...p }; delete n[`social_${k}`]; return n; });
  };

  const analysisTargets = useMemo<AnalysisTarget[]>(() => {
    const targets: AnalysisTarget[] = [];
    const seen = new Set<string>();

    const addTarget = (sourceKey: AnalysisTarget['sourceKey'], url: string) => {
      const normalizedUrl = url.trim();
      if (!normalizedUrl || !isValidUrl(normalizedUrl) || seen.has(normalizedUrl)) return;
      seen.add(normalizedUrl);
      targets.push({
        sourceKey,
        label: LINK_LABELS[sourceKey],
        url: normalizedUrl,
      });
    };

    addTarget('connectedUrl', form.siteConnection.connectedUrl);
    (Object.entries(form.socialLinks) as [keyof SocialLinks, string][]).forEach(([key, value]) => {
      addTarget(key, value);
    });

    return targets;
  }, [form.siteConnection.connectedUrl, form.socialLinks]);

  const analysisSignature = useMemo(
    () => analysisTargets.map((target) => `${target.sourceKey}:${target.url}`).join('|'),
    [analysisTargets]
  );

  useEffect(() => {
    if (loading) return;

    if (!analysisTargets.length) {
      setProfileStatus('idle');
      setProfileNote('');
      lastAnalyzedRef.current = '';
      setForm((prev) => ({
        ...prev,
        analyzedLinks: [],
        siteConnection: buildPrimaryConnection(prev.siteConnection.connectedUrl, []),
      }));
      return;
    }

    if (analysisSignature === lastAnalyzedRef.current) return;

    setProfileStatus('checking');
    const timeoutId = setTimeout(async () => {
      try {
        const settled = await Promise.allSettled(
          analysisTargets.map(async (target) => {
            const result = await siteAnalysisService.analyze(target.url);
            const updatedAt = new Date().toISOString();
            const profile: LinkAnalysisProfile = {
              sourceKey: target.sourceKey,
              label: target.label,
              url: target.url,
              platformType: result.platformType || '',
              platformName: result.platformName || '',
              connectorStatus: result.connectorStatus || '',
              summary: result.summary || '',
              recommendation: result.recommendation || '',
              confidence: result.confidence,
              updatedAt,
            };

            return profile;
          })
        );

        const profiles = settled
          .filter((entry): entry is PromiseFulfilledResult<LinkAnalysisProfile> => entry.status === 'fulfilled')
          .map((entry) => entry.value);

        const nextConnection = buildPrimaryConnection(form.siteConnection.connectedUrl, profiles);
        lastAnalyzedRef.current = analysisSignature;

        setForm((p) => ({ ...p, analyzedLinks: profiles, siteConnection: nextConnection }));
        setProfileStatus('ready');
        setProfileNote(`${profiles.length}/${analysisTargets.length} links analyzed successfully`);

        await settingsService.saveSiteProfile(nextConnection, profiles);
      } catch {
        setProfileStatus('error');
        setProfileNote('Could not detect any site profiles right now.');
      }
    }, 800);

    return () => clearTimeout(timeoutId);
  }, [analysisTargets, analysisSignature, form.siteConnection.connectedUrl, loading]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate(form);
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setSaving(true);
    try {
      const saved = await settingsService.update(form);
      setForm(saved);
      setIsDirty(false);
      toast.success('Settings saved!');
    } catch {
      toast.error('Failed to save settings. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="text-2xl font-bold text-text-primary dark:text-white">Settings</h1>
        <p className="text-text-muted dark:text-slate-400 mt-1 text-sm">
          Configure your site identity, links, and connection profile.
        </p>
      </div>

      {loading ? (
        <div className="space-y-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-12 bg-slate-100 dark:bg-slate-800 rounded-xl animate-pulse" />
          ))}
        </div>
      ) : (
        <form onSubmit={handleSubmit} noValidate className="space-y-6">
          <div className={sectionCls}>
            <h2 className="text-xs font-semibold text-text-muted dark:text-slate-400 uppercase tracking-wider flex items-center gap-2">
              <Globe size={13} /> Site Identity
            </h2>

            <div>
              <label className="block text-sm font-medium text-text-primary dark:text-slate-300 mb-1">
                Site Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={form.siteName}
                onChange={(e) => set('siteName', e.target.value)}
                placeholder="My Awesome Site"
                maxLength={100}
                className={inputCls(!!errors.siteName)}
              />
              <FieldErr msg={errors.siteName} />
            </div>

            <div>
              <label className="block text-sm font-medium text-text-primary dark:text-slate-300 mb-1">
                Logo URL
              </label>
              <input
                type="text"
                value={form.logoUrl}
                onChange={(e) => set('logoUrl', e.target.value)}
                placeholder="https://example.com/logo.png"
                className={inputCls(!!errors.logoUrl)}
              />
              <FieldErr msg={errors.logoUrl} />
            </div>

            <div>
              <label className="block text-sm font-medium text-text-primary dark:text-slate-300 mb-1">
                Primary Website URL
              </label>
              <input
                type="text"
                value={form.siteConnection.connectedUrl}
                onChange={(e) => setConnectionUrl(e.target.value)}
                placeholder="https://example.com"
                className={inputCls(!!errors.connectedUrl)}
              />
              <FieldErr msg={errors.connectedUrl} />
              {(profileStatus !== 'idle' || profileNote) && (
                <p
                  className={clsx(
                    'mt-1 text-xs',
                    profileStatus === 'error'
                      ? 'text-red-500'
                      : profileStatus === 'checking'
                      ? 'text-amber-500 dark:text-amber-400'
                      : 'text-teal dark:text-teal-400'
                  )}
                >
                  {profileStatus === 'checking'
                    ? `Checking ${analysisTargets.length} link${analysisTargets.length === 1 ? '' : 's'}...`
                    : profileNote}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-text-primary dark:text-slate-300 mb-1">
                Footer Text
              </label>
              <textarea
                value={form.footerText}
                onChange={(e) => set('footerText', e.target.value)}
                rows={3}
                maxLength={500}
                className={clsx(inputCls(!!errors.footerText), 'resize-none')}
                placeholder="Copyright 2026 My Awesome Site. All rights reserved."
              />
              <div className="flex justify-between mt-1">
                <FieldErr msg={errors.footerText} />
                <span
                  className={clsx(
                    'text-xs ml-auto',
                    form.footerText.length > 460 ? 'text-amber-500' : 'text-text-muted dark:text-slate-500'
                  )}
                >
                  {form.footerText.length}/500
                </span>
              </div>
            </div>
          </div>

          <div className={sectionCls}>
            <h2 className="text-xs font-semibold text-text-muted dark:text-slate-400 uppercase tracking-wider">
              Social Links
            </h2>
            {SOCIAL_ROWS.map(({ key, label, placeholder, icon }) => (
              <div key={key}>
                <label className="block text-sm font-medium text-text-primary dark:text-slate-300 mb-1">
                  <span className="inline-flex items-center gap-1.5">
                    {icon}
                    {label}
                  </span>
                </label>
                <input
                  type="text"
                  value={form.socialLinks[key]}
                  onChange={(e) => setSocial(key, e.target.value)}
                  placeholder={placeholder}
                  className={inputCls(!!errors[`social_${key}`])}
                />
                <FieldErr msg={errors[`social_${key}`]} />
              </div>
            ))}
            {form.analyzedLinks.length > 0 && (
              <div className="rounded-xl border border-border dark:border-slate-700 p-4 bg-surface-muted/50 dark:bg-slate-800/40">
                <p className="text-xs font-semibold text-text-muted dark:text-slate-400 uppercase tracking-wider mb-3">
                  Detected Link Profiles
                </p>
                <div className="space-y-3">
                  {form.analyzedLinks.map((profile) => (
                    <div key={`${profile.sourceKey}:${profile.url}`} className="rounded-lg border border-border dark:border-slate-700 p-3 bg-white/80 dark:bg-slate-900/30">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="text-sm font-medium text-text-primary dark:text-slate-200">{profile.label}</p>
                          <p className="text-xs text-text-muted dark:text-slate-500 break-all">{profile.url}</p>
                        </div>
                        <span className="shrink-0 rounded-full bg-teal/10 px-2 py-1 text-[11px] font-medium text-teal dark:text-teal-400">
                          {profile.platformName || 'Detected'}
                        </span>
                      </div>
                      {profile.summary && (
                        <p className="mt-2 text-xs text-text-muted dark:text-slate-400 leading-relaxed">{profile.summary}</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="flex items-center gap-4">
            <button
              type="submit"
              disabled={saving || !isDirty}
              className={clsx(
                'inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium text-sm transition-all',
                'bg-teal text-white hover:bg-teal-dark shadow-sm',
                'disabled:opacity-50 disabled:cursor-not-allowed'
              )}
            >
              {saving ? (
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <Save size={15} />
              )}
              {saving ? 'Saving...' : 'Save Settings'}
            </button>
            {isDirty && (
              <span className="text-xs text-amber-500 dark:text-amber-400 animate-pulse">
                Unsaved changes
              </span>
            )}
          </div>
        </form>
      )}
    </div>
  );
}
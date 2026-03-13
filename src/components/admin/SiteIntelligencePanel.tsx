'use client';

import { useState } from 'react';
import { Bot, Globe, BookOpen, ShoppingBag, Layout, Users, Search, AlertCircle } from 'lucide-react';
import { clsx } from 'clsx';
import toast from 'react-hot-toast';
import { siteAnalysisService } from '@/services/siteAnalysisService';
import type { SiteAnalysisResult } from '@/types';

function platformIcon(type: string) {
  if (['wordpress', 'ghost', 'blogger', 'custom_blog', 'news'].includes(type)) return BookOpen;
  if (['shopify', 'woocommerce', 'custom_ecommerce'].includes(type)) return ShoppingBag;
  if (['wix', 'squarespace', 'webflow', 'portfolio'].includes(type)) return Layout;
  if (type === 'social_profile') return Users;
  return Globe;
}

function ResultCard({ result }: { result: SiteAnalysisResult }) {
  const confidenceCls =
    result.confidence === 'HIGH'
      ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
      : result.confidence === 'MEDIUM'
      ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400'
      : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400';

  const connectorMap: Record<string, { label: string; cls: string }> = {
    full_api: {
      label: 'Full API',
      cls: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
    },
    partial_api: {
      label: 'Partial API',
      cls: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
    },
    read_only: {
      label: 'Read Only',
      cls: 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400',
    },
    none: {
      label: 'No Connector',
      cls: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
    },
  };
  const connector = connectorMap[result.connectorStatus] ?? {
    label: result.connectorStatus,
    cls: 'bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-300',
  };

  const PlatformIcon = platformIcon(result.platformType);

  return (
    <div className="mt-2 rounded-xl border border-teal/30 dark:border-teal-900/50 bg-teal/5 dark:bg-[#0a1f30] p-4 space-y-4">
      {/* Platform header */}
      <div className="flex items-start gap-3">
        <div className="p-2.5 rounded-lg bg-teal/10 text-teal shrink-0">
          <PlatformIcon size={16} />
        </div>
        <div className="flex-1 min-w-0 space-y-1">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-semibold text-text-primary dark:text-white">
              {result.platformName}
            </span>
            <span className={clsx('text-xs px-2 py-0.5 rounded-full font-medium', confidenceCls)}>
              {result.confidence} confidence
            </span>
            <span className={clsx('text-xs px-2 py-0.5 rounded-full font-medium', connector.cls)}>
              {connector.label}
            </span>
          </div>
          <p className="text-xs text-text-muted dark:text-slate-500 truncate">{result.url}</p>
        </div>
      </div>

      {/* Summary */}
      <p className="text-sm text-text-primary dark:text-slate-300 leading-relaxed">
        {result.summary}
      </p>

      {/* Capabilities & Features */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {result.capabilities.length > 0 && (
          <div>
            <p className="text-xs font-semibold text-text-muted dark:text-slate-400 uppercase tracking-wider mb-1.5">
              Pantheon can manage
            </p>
            <div className="flex flex-wrap gap-1">
              {result.capabilities.map((c) => (
                <span
                  key={c}
                  className="text-xs px-2 py-0.5 rounded-full bg-teal/10 text-teal dark:text-teal-300 font-medium"
                >
                  {c}
                </span>
              ))}
            </div>
          </div>
        )}
        {result.detectedFeatures.length > 0 && (
          <div>
            <p className="text-xs font-semibold text-text-muted dark:text-slate-400 uppercase tracking-wider mb-1.5">
              Detected features
            </p>
            <div className="flex flex-wrap gap-1">
              {result.detectedFeatures.map((f) => (
                <span
                  key={f}
                  className="text-xs px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-700 text-text-muted dark:text-slate-300"
                >
                  {f}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Recommendation */}
      {result.recommendation && (
        <div className="flex items-start gap-2 p-3 rounded-lg bg-white/60 dark:bg-slate-800/50 border border-border dark:border-slate-700">
          <Bot size={13} className="text-teal shrink-0 mt-0.5" />
          <p className="text-xs text-text-muted dark:text-slate-400 leading-relaxed">
            {result.recommendation}
          </p>
        </div>
      )}
    </div>
  );
}

export default function SiteIntelligencePanel() {
  const [url, setUrl] = useState('');
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState<SiteAnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleAnalyze = async () => {
    const trimmed = url.trim();
    if (!trimmed) return;
    setAnalyzing(true);
    setResult(null);
    setError(null);
    try {
      const analysis = await siteAnalysisService.analyze(trimmed);
      setResult(analysis);
    } catch (err: any) {
      const msg =
        err.response?.data?.error || 'Analysis failed. Check the URL is publicly accessible.';
      setError(msg);
      toast.error(msg);
    } finally {
      setAnalyzing(false);
    }
  };

  return (
    <div className="bg-white dark:bg-[#071828] rounded-2xl border border-border dark:border-teal-900/60 p-6 space-y-4">
      <div>
        <h2 className="text-xs font-semibold text-text-muted dark:text-slate-400 uppercase tracking-wider flex items-center gap-2">
          <Bot size={13} /> Site Intelligence
        </h2>
        <p className="text-sm text-text-muted dark:text-slate-400 mt-1">
          Enter any website URL — Gemini AI will analyse its platform, detect its features, and tell
          you exactly how Pantheon can connect to and manage it.
        </p>
      </div>

      <div className="flex gap-2">
        <input
          type="text"
          value={url}
          onChange={(e) => {
            setUrl(e.target.value);
            setError(null);
          }}
          onKeyDown={(e) => e.key === 'Enter' && !analyzing && url.trim() && handleAnalyze()}
          placeholder="https://example.com"
          className="flex-1 px-3 py-2 rounded-lg border border-border dark:border-slate-600 bg-white dark:bg-slate-800/60 text-sm text-text-primary dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-teal/50 transition-colors"
        />
        <button
          type="button"
          onClick={handleAnalyze}
          disabled={analyzing || !url.trim()}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-white bg-teal hover:bg-teal-dark transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed shrink-0"
        >
          {analyzing ? (
            <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            <Search size={14} />
          )}
          {analyzing ? 'Analysing…' : 'Analyse'}
        </button>
      </div>

      {analyzing && (
        <div className="flex items-center gap-3 py-3 px-4 rounded-xl bg-teal/5 border border-teal/20 dark:border-teal/10">
          <span className="w-4 h-4 border-2 border-teal/30 border-t-teal rounded-full animate-spin shrink-0" />
          <p className="text-sm text-text-muted dark:text-slate-400">
            Fetching site data and analysing with Gemini…
          </p>
        </div>
      )}

      {error && (
        <div className="flex items-start gap-2 px-4 py-3 text-sm text-red-600 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800">
          <AlertCircle size={14} className="shrink-0 mt-0.5" />
          {error}
        </div>
      )}

      {result && <ResultCard result={result} />}
    </div>
  );
}

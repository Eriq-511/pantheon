'use client';

import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { clsx } from 'clsx';
import type { MenuItemRequest, Page } from '@/types';

interface MenuFormProps {
  initialData?: {
    label?: string;
    url?: string;
    icon?: string;
    pageId?: number | null;
  };
  pages: Page[];
  onSubmit: (data: MenuItemRequest) => void;
  onCancel: () => void;
  loading?: boolean;
  errors?: Record<string, string>;
}

export default function MenuForm({
  initialData,
  pages,
  onSubmit,
  onCancel,
  loading = false,
  errors = {},
}: MenuFormProps) {
  const [label, setLabel] = useState(initialData?.label || '');
  const [url, setUrl] = useState(initialData?.url || '');
  const [icon, setIcon] = useState(initialData?.icon || '');
  const [pageId, setPageId] = useState<number | null>(initialData?.pageId ?? null);
  const [linkType, setLinkType] = useState<'url' | 'page'>(
    initialData?.pageId ? 'page' : 'url'
  );

  const [localErrors, setLocalErrors] = useState<Record<string, string | undefined>>({});
  const allErrors = { ...localErrors, ...errors };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs: Record<string, string> = {};
    const trimmedLabel = label.trim();
    if (!trimmedLabel) errs.label = 'Label is required';
    else if (trimmedLabel.length > 100) errs.label = 'Label must be 100 characters or less';
    if (linkType === 'url' && url.trim()) {
      const protocol = url.trim().toLowerCase().split(':')[0];
      if (['javascript', 'data', 'vbscript'].includes(protocol))
        errs.url = 'URL uses a disallowed protocol';
      else if (url.trim().length > 500)
        errs.url = 'URL must be 500 characters or less';
    }
    if (icon.trim().length > 50) errs.icon = 'Icon name must be 50 characters or less';
    if (Object.keys(errs).length) { setLocalErrors(errs); return; }
    setLocalErrors({});
    onSubmit({
      label: trimmedLabel,
      url: linkType === 'url' ? url.trim() || undefined : undefined,
      icon: icon.trim() || undefined,
      pageId: linkType === 'page' ? pageId : null,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Label */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Label <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          value={label}
          onChange={(e) => setLabel(e.target.value)}
          placeholder="e.g. Home, About, Contact"
          className={clsx(
            'w-full px-3 py-2 rounded-lg border text-sm bg-white dark:bg-slate-800 text-gray-900 dark:text-white',
            'focus:outline-none focus:ring-2 focus:ring-teal',
            allErrors.label ? 'border-red-400' : 'border-gray-300 dark:border-slate-600'
          )}
        />
        {allErrors.label && <p className="text-red-500 text-xs mt-1">{allErrors.label}</p>}
      </div>

      {/* Link Type */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Link To
        </label>
        <div className="flex gap-4 mb-3">
          {(['url', 'page'] as const).map((type) => (
            <label key={type} className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="linkType"
                value={type}
                checked={linkType === type}
                onChange={() => setLinkType(type)}
                className="accent-teal"
              />
              <span className="text-sm text-gray-700 dark:text-gray-300 capitalize">{type}</span>
            </label>
          ))}
        </div>

        {linkType === 'url' ? (
          <>
            <input
              type="text"
              value={url}
              onChange={(e) => { setUrl(e.target.value); setLocalErrors((p) => ({ ...p, url: undefined })); }}
              placeholder="https://example.com or /about"
              className={clsx(
                'w-full px-3 py-2 rounded-lg border text-sm',
                'bg-white dark:bg-slate-800 text-gray-900 dark:text-white',
                'focus:outline-none focus:ring-2 focus:ring-teal',
                allErrors.url ? 'border-red-400 dark:border-red-500' : 'border-gray-300 dark:border-slate-600'
              )}
            />
            {allErrors.url && <p className="text-red-500 text-xs mt-1">{allErrors.url}</p>}
          </>
        ) : (
          <select
            value={pageId ?? ''}
            onChange={(e) => setPageId(e.target.value ? Number(e.target.value) : null)}
            className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-slate-600 text-sm
                       bg-white dark:bg-slate-800 text-gray-900 dark:text-white
                       focus:outline-none focus:ring-2 focus:ring-teal"
          >
            <option value="">Select a page…</option>
            {pages.map((p) => (
              <option key={p.id} value={p.id}>
                {p.title} ({p.slug})
              </option>
            ))}
          </select>
        )}
      </div>

      {/* Icon (optional) */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Icon <span className="text-gray-400 text-xs">(optional — e.g. "home", "info")</span>
        </label>
        <input
          type="text"
          value={icon}
          onChange={(e) => setIcon(e.target.value)}
          maxLength={50}
          placeholder="Icon name (optional)"
          className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-slate-600 text-sm
                     bg-white dark:bg-slate-800 text-gray-900 dark:text-white
                     focus:outline-none focus:ring-2 focus:ring-teal"
        />
        {allErrors.icon && <p className="text-red-500 text-xs mt-1">{allErrors.icon}</p>}
      </div>

      {/* Actions */}
      <div className="flex justify-end gap-3 pt-2">
        <button
          type="button"
          onClick={onCancel}
          disabled={loading}
          className="px-4 py-2 text-sm font-medium rounded-lg text-gray-700 dark:text-gray-300
                     bg-gray-100 dark:bg-slate-700 hover:bg-gray-200 dark:hover:bg-slate-600
                     transition-colors disabled:opacity-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={loading}
          className="px-5 py-2 text-sm font-medium rounded-lg text-white bg-teal hover:bg-teal-dark
                     transition-colors disabled:opacity-50 flex items-center gap-2"
        >
          {loading && (
            <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
          )}
          Save Item
        </button>
      </div>
    </form>
  );
}

'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import Placeholder from '@tiptap/extension-placeholder';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import {
  Bold, Italic, UnderlineIcon, Heading1, Heading2, Heading3,
  List, ListOrdered, Link2, Unlink, RotateCcw, AlignLeft, AlignCenter, AlignRight,
  Search, Image as ImageIcon,
} from 'lucide-react';
import { clsx } from 'clsx';
import { useState, useEffect } from 'react';
import type { PageRequest } from '@/types';

interface PageFormProps {
  initialData?: Partial<PageRequest>;
  onSubmit: (data: PageRequest) => void;
  onCancel: () => void;
  loading?: boolean;
  errors?: Record<string, string>;
}

type Tab = 'content' | 'seo' | 'publish';

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

function ToolbarButton({
  onClick,
  active,
  title,
  children,
}: {
  onClick: () => void;
  active?: boolean;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      title={title}
      onClick={onClick}
      className={clsx(
        'p-1.5 rounded text-sm transition-colors',
        active
          ? 'bg-teal-light text-teal-deep dark:bg-teal/20 dark:text-teal-300'
          : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-slate-700'
      )}
    >
      {children}
    </button>
  );
}

const SEO_TITLE_MAX = 60;
const SEO_DESC_MAX = 160;

export default function PageForm({
  initialData,
  onSubmit,
  onCancel,
  loading = false,
  errors = {},
}: PageFormProps) {
  const [activeTab, setActiveTab] = useState<Tab>('content');
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [slugManuallyEdited, setSlugManuallyEdited] = useState(false);
  const [status, setStatus] = useState<'draft' | 'published'>('draft');
  const [metaTitle, setMetaTitle] = useState('');
  const [metaDescription, setMetaDescription] = useState('');
  const [ogImageUrl, setOgImageUrl] = useState('');

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title || '');
      setSlug(initialData.slug || '');
      setStatus(initialData.status || 'draft');
      setMetaTitle(initialData.metaTitle || '');
      setMetaDescription(initialData.metaDescription || '');
      setOgImageUrl(initialData.ogImageUrl || '');
      if (initialData.slug) setSlugManuallyEdited(true);
    }
  }, []); // eslint-disable-line

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
      Link.configure({ openOnClick: false }),
      Placeholder.configure({ placeholder: 'Write your page content here…' }),
    ],
    content: initialData?.content || '',
    editorProps: {
      attributes: { class: 'tiptap-editor' },
    },
  });

  const handleTitleChange = (val: string) => {
    setTitle(val);
    if (!slugManuallyEdited) setSlug(generateSlug(val));
  };

  const addLink = () => {
    const url = window.prompt('Enter URL:');
    if (!url || !editor) return;
    const trimmed = url.trim();
    const protocol = trimmed.toLowerCase().split(':')[0];
    if (['javascript', 'data', 'vbscript'].includes(protocol)) return;
    editor.chain().focus().setLink({ href: trimmed }).run();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      title,
      slug,
      content: editor?.getHTML() || '',
      status,
      ...(metaTitle ? { metaTitle } : {}),
      ...(metaDescription ? { metaDescription } : {}),
      ...(ogImageUrl ? { ogImageUrl } : {}),
    });
  };

  const tabs: { id: Tab; label: string }[] = [
    { id: 'content', label: 'Content' },
    { id: 'seo',     label: 'SEO' },
    { id: 'publish', label: 'Publish' },
  ];

  const inputCls = (hasError: boolean) => clsx(
    'w-full px-3 py-2 rounded-lg border text-sm bg-white dark:bg-slate-800 text-gray-900 dark:text-white',
    'focus:outline-none focus:ring-2 focus:ring-teal',
    hasError ? 'border-red-400 dark:border-red-500' : 'border-gray-300 dark:border-slate-600'
  );

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Title */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Title <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          value={title}
          onChange={(e) => handleTitleChange(e.target.value)}
          placeholder="Page title"
          maxLength={200}
          className={inputCls(!!errors.title)}
        />
        {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title}</p>}
      </div>

      {/* Slug */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Slug <span className="text-red-500">*</span>
        </label>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-400">/</span>
          <input
            type="text"
            value={slug}
            onChange={(e) => { setSlug(e.target.value); setSlugManuallyEdited(true); }}
            placeholder="page-slug"
            maxLength={200}
            className={clsx(inputCls(!!errors.slug), 'flex-1 font-mono')}
          />
          {slugManuallyEdited && (
            <button
              type="button"
              onClick={() => { setSlug(generateSlug(title)); setSlugManuallyEdited(false); }}
              title="Reset slug from title"
              className="p-2 rounded-lg text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors"
            >
              <RotateCcw size={15} />
            </button>
          )}
        </div>
        {errors.slug && <p className="text-red-500 text-xs mt-1">{errors.slug}</p>}
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 dark:border-slate-700">
        <nav className="flex gap-1" aria-label="Page form tabs">
          {tabs.map(({ id, label }) => (
            <button
              key={id}
              type="button"
              onClick={() => setActiveTab(id)}
              className={clsx(
                'px-4 py-2 text-sm font-medium rounded-t-lg transition-colors -mb-px border-b-2',
                activeTab === id
                  ? 'border-teal text-teal dark:text-teal-400 bg-teal-light/30 dark:bg-teal/10'
                  : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
              )}
            >
              {label}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab: Content */}
      {activeTab === 'content' && (
        <div>
          {/* Toolbar */}
          <div className="flex flex-wrap items-center gap-1 px-3 py-2 bg-gray-50 dark:bg-slate-800 border border-b-0 border-gray-300 dark:border-slate-600 rounded-t-lg">
            <ToolbarButton onClick={() => editor?.chain().focus().toggleBold().run()} active={editor?.isActive('bold')} title="Bold">
              <Bold size={14} />
            </ToolbarButton>
            <ToolbarButton onClick={() => editor?.chain().focus().toggleItalic().run()} active={editor?.isActive('italic')} title="Italic">
              <Italic size={14} />
            </ToolbarButton>
            <ToolbarButton onClick={() => editor?.chain().focus().toggleUnderline().run()} active={editor?.isActive('underline')} title="Underline">
              <UnderlineIcon size={14} />
            </ToolbarButton>
            <span className="w-px h-5 bg-gray-300 dark:bg-slate-600 mx-0.5" />
            <ToolbarButton onClick={() => editor?.chain().focus().toggleHeading({ level: 1 }).run()} active={editor?.isActive('heading', { level: 1 })} title="Heading 1">
              <Heading1 size={14} />
            </ToolbarButton>
            <ToolbarButton onClick={() => editor?.chain().focus().toggleHeading({ level: 2 }).run()} active={editor?.isActive('heading', { level: 2 })} title="Heading 2">
              <Heading2 size={14} />
            </ToolbarButton>
            <ToolbarButton onClick={() => editor?.chain().focus().toggleHeading({ level: 3 }).run()} active={editor?.isActive('heading', { level: 3 })} title="Heading 3">
              <Heading3 size={14} />
            </ToolbarButton>
            <span className="w-px h-5 bg-gray-300 dark:bg-slate-600 mx-0.5" />
            <ToolbarButton onClick={() => editor?.chain().focus().toggleBulletList().run()} active={editor?.isActive('bulletList')} title="Bullet List">
              <List size={14} />
            </ToolbarButton>
            <ToolbarButton onClick={() => editor?.chain().focus().toggleOrderedList().run()} active={editor?.isActive('orderedList')} title="Ordered List">
              <ListOrdered size={14} />
            </ToolbarButton>
            <span className="w-px h-5 bg-gray-300 dark:bg-slate-600 mx-0.5" />
            <ToolbarButton onClick={() => editor?.chain().focus().setTextAlign('left').run()} active={editor?.isActive({ textAlign: 'left' })} title="Align Left">
              <AlignLeft size={14} />
            </ToolbarButton>
            <ToolbarButton onClick={() => editor?.chain().focus().setTextAlign('center').run()} active={editor?.isActive({ textAlign: 'center' })} title="Align Center">
              <AlignCenter size={14} />
            </ToolbarButton>
            <ToolbarButton onClick={() => editor?.chain().focus().setTextAlign('right').run()} active={editor?.isActive({ textAlign: 'right' })} title="Align Right">
              <AlignRight size={14} />
            </ToolbarButton>
            <span className="w-px h-5 bg-gray-300 dark:bg-slate-600 mx-0.5" />
            <ToolbarButton onClick={addLink} active={editor?.isActive('link')} title="Add Link">
              <Link2 size={14} />
            </ToolbarButton>
            <ToolbarButton onClick={() => editor?.chain().focus().unsetLink().run()} title="Remove Link">
              <Unlink size={14} />
            </ToolbarButton>
          </div>
          <EditorContent editor={editor} />
          {errors.content && <p className="text-red-500 text-xs mt-1">{errors.content}</p>}
        </div>
      )}

      {/* Tab: SEO */}
      {activeTab === 'seo' && (
        <div className="space-y-4 py-1">
          <p className="text-xs text-text-muted dark:text-slate-400 flex items-center gap-1.5">
            <Search size={12} />
            These fields help search engines understand your page.
          </p>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Meta Title</label>
              <span className={clsx('text-xs', metaTitle.length > SEO_TITLE_MAX ? 'text-red-500' : 'text-text-muted dark:text-slate-500')}>
                {metaTitle.length}/{SEO_TITLE_MAX}
              </span>
            </div>
            <input
              type="text"
              value={metaTitle}
              onChange={(e) => setMetaTitle(e.target.value)}
              placeholder="Leave blank to use page title"
              maxLength={70}
              className={inputCls(metaTitle.length > SEO_TITLE_MAX)}
            />
            <p className="text-xs text-text-muted dark:text-slate-500 mt-1">Optimal: 50–60 characters</p>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Meta Description</label>
              <span className={clsx('text-xs', metaDescription.length > SEO_DESC_MAX ? 'text-red-500' : 'text-text-muted dark:text-slate-500')}>
                {metaDescription.length}/{SEO_DESC_MAX}
              </span>
            </div>
            <textarea
              value={metaDescription}
              onChange={(e) => setMetaDescription(e.target.value)}
              placeholder="A concise summary for search engine results"
              rows={3}
              maxLength={180}
              className={clsx(inputCls(metaDescription.length > SEO_DESC_MAX), 'resize-none')}
            />
            <p className="text-xs text-text-muted dark:text-slate-500 mt-1">Optimal: 120–160 characters</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 flex items-center gap-1.5">
              <ImageIcon size={13} /> OG Image URL
            </label>
            <input
              type="text"
              value={ogImageUrl}
              onChange={(e) => setOgImageUrl(e.target.value)}
              placeholder="https://example.com/og-image.png (1200×630)"
              className={inputCls(false)}
            />
            {ogImageUrl && (
              <div className="mt-2 rounded-lg overflow-hidden border border-gray-200 dark:border-slate-700 aspect-video max-h-32 bg-surface-muted dark:bg-slate-800">
                <img src={ogImageUrl} alt="OG preview" className="w-full h-full object-cover" onError={(e) => (e.currentTarget.style.display = 'none')} />
              </div>
            )}
          </div>
        </div>
      )}

      {/* Tab: Publish */}
      {activeTab === 'publish' && (
        <div className="space-y-4 py-1">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
              Publication Status
            </label>
            <div className="space-y-2">
              {([  
                { value: 'draft',     label: 'Draft',     desc: 'Save but not visible on your site' },
                { value: 'published', label: 'Published', desc: 'Visible to visitors immediately' },
              ] as const).map(({ value, label, desc }) => (
                <label
                  key={value}
                  className={clsx(
                    'flex items-start gap-3 p-3 rounded-xl border cursor-pointer transition-colors',
                    status === value
                      ? 'border-teal bg-teal-light/20 dark:bg-teal/10 dark:border-teal/40'
                      : 'border-gray-200 dark:border-slate-700 hover:bg-surface-muted dark:hover:bg-slate-800/60'
                  )}
                >
                  <input
                    type="radio"
                    name="status"
                    value={value}
                    checked={status === value}
                    onChange={() => setStatus(value)}
                    className="mt-0.5 accent-teal"
                  />
                  <div>
                    <p className="text-sm font-medium text-gray-800 dark:text-gray-200">{label}</p>
                    <p className="text-xs text-text-muted dark:text-slate-500">{desc}</p>
                  </div>
                </label>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="flex justify-end gap-3 pt-2 border-t border-gray-100 dark:border-slate-700">
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
                     transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
        >
          {loading && (
            <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          )}
          Save Page
        </button>
      </div>
    </form>
  );
}

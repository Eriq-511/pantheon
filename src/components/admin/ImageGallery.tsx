'use client';

import { useState } from 'react';
import { Trash2, Edit2, Check, X, UploadCloud, Copy, CheckCheck, Package } from 'lucide-react';
import { clsx } from 'clsx';
import type { CmsImage, Product } from '@/types';
import ConfirmDialog from './ConfirmDialog';

interface ImageGalleryProps {
  images: CmsImage[];
  loading?: boolean;
  onDelete: (id: number) => void;
  onUpdateAlt: (id: number, altText: string) => void;
  deleting?: number | null;
  products?: Product[];
  onAssignToProduct?: (imageUrl: string, productId: number) => Promise<void>;
}

function ImageCard({
  image,
  onDelete,
  onUpdateAlt,
  deleting,
  products,
  onAssignToProduct,
}: {
  image: CmsImage;
  onDelete: (id: number) => void;
  onUpdateAlt: (id: number, alt: string) => void;
  deleting?: number | null;
  products?: Product[];
  onAssignToProduct?: (imageUrl: string, productId: number) => Promise<void>;
}) {
  const [editingAlt, setEditingAlt] = useState(false);
  const [altValue, setAltValue] = useState(image.altText || '');
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [copied, setCopied] = useState(false);
  const [assignOpen, setAssignOpen] = useState(false);
  const [assignProductId, setAssignProductId] = useState('');
  const [assigning, setAssigning] = useState(false);

  const handleAssign = async () => {
    if (!onAssignToProduct || !assignProductId) return;
    setAssigning(true);
    try {
      await onAssignToProduct(image.cloudinaryUrl, Number(assignProductId));
      setAssignOpen(false);
      setAssignProductId('');
    } finally {
      setAssigning(false);
    }
  };

  const saveAlt = () => {
    onUpdateAlt(image.id, altValue.trim());
    setEditingAlt(false);
  };

  const cancelAlt = () => {
    setAltValue(image.altText || '');
    setEditingAlt(false);
  };

  const copyUrl = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(image.cloudinaryUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {/* clipboard blocked */}
  };

  return (
    <>
      <div className="group relative rounded-xl border border-gray-200 dark:border-slate-700 overflow-hidden bg-white dark:bg-[#071828] shadow-sm hover:shadow-md dark:hover:shadow-teal/5 transition-shadow">
        {/* Image */}
        <div className="relative aspect-video bg-gray-100 dark:bg-slate-800">
          <img
            src={image.cloudinaryUrl}
            alt={image.altText || image.filename}
            className="w-full h-full object-cover"
          />

          {/* Overlay Actions */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
            <button
              onClick={copyUrl}
              className={clsx(
                'p-2 rounded-lg shadow transition-colors',
                copied
                  ? 'bg-green-500 text-white'
                  : 'bg-white/90 text-gray-700 hover:bg-white'
              )}
              title="Copy image URL"
            >
              {copied ? <CheckCheck size={14} /> : <Copy size={14} />}
            </button>
            <button
              onClick={() => setEditingAlt(true)}
              className="p-2 rounded-lg bg-white/90 text-gray-700 hover:bg-white transition-colors shadow"
              title="Edit alt text"
            >
              <Edit2 size={14} />
            </button>
            <button
              onClick={() => setConfirmDelete(true)}
              className="p-2 rounded-lg bg-red-500/90 text-white hover:bg-red-600 transition-colors shadow"
              title="Delete image"
            >
              <Trash2 size={14} />
            </button>
            {products && products.length > 0 && onAssignToProduct && (
              <button
                onClick={(e) => { e.stopPropagation(); setAssignOpen((v) => !v); }}
                className="p-2 rounded-lg bg-white/90 text-gray-700 hover:bg-white transition-colors shadow"
                title="Assign to product"
              >
                <Package size={14} />
              </button>
            )}
          </div>
        </div>

        {/* Info */}
        <div className="p-3">
          <p className="text-xs font-medium text-gray-700 dark:text-gray-300 truncate" title={image.filename}>
            {image.filename}
          </p>
          <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">
            {new Date(image.uploadedAt).toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: 'numeric' })}
          </p>

          {/* Alt text */}
          {editingAlt ? (
            <div className="mt-2 flex items-center gap-1">
              <input
                type="text"
                value={altValue}
                onChange={(e) => setAltValue(e.target.value)}
                placeholder="Alt text…"
                maxLength={255}
                autoFocus
                className="flex-1 px-2 py-1 text-xs rounded border border-gray-300 dark:border-slate-600
                           bg-white dark:bg-slate-700 text-gray-900 dark:text-white
                           focus:outline-none focus:ring-1 focus:ring-teal"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') saveAlt();
                  if (e.key === 'Escape') cancelAlt();
                }}
              />
              <button onClick={saveAlt} className="p-1 rounded text-green-600 hover:bg-green-50 dark:hover:bg-green-900/20">
                <Check size={13} />
              </button>
              <button onClick={cancelAlt} className="p-1 rounded text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20">
                <X size={13} />
              </button>
            </div>
          ) : (
            <p
              className="text-xs text-gray-400 dark:text-gray-500 mt-1 italic truncate cursor-pointer hover:text-teal dark:hover:text-teal-400 transition-colors"
              onClick={() => setEditingAlt(true)}
              title="Click to edit alt text"
            >
              {image.altText || '+ Add alt text'}
            </p>
          )}
          {assignOpen && products && (
            <div className="mt-2 flex items-center gap-1">
              <select
                value={assignProductId}
                onChange={(e) => setAssignProductId(e.target.value)}
                className="flex-1 px-2 py-1 text-xs rounded border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-teal"
              >
                <option value="">Select product…</option>
                {products.map((p) => (
                  <option key={p.id} value={String(p.id)}>{p.title}</option>
                ))}
              </select>
              <button
                onClick={handleAssign}
                disabled={!assignProductId || assigning}
                className="p-1 rounded text-green-600 hover:bg-green-50 dark:hover:bg-green-900/20 disabled:opacity-40"
              >
                {assigning
                  ? <span className="w-3 h-3 border border-green-600/30 border-t-green-600 rounded-full animate-spin inline-block" />
                  : <Check size={13} />}
              </button>
              <button
                onClick={() => { setAssignOpen(false); setAssignProductId(''); }}
                className="p-1 rounded text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20"
              >
                <X size={13} />
              </button>
            </div>
          )}
        </div>
      </div>

      <ConfirmDialog
        isOpen={confirmDelete}
        title="Delete Image"
        message={`Delete "${image.filename}"? This will permanently remove it from Cloudinary.`}
        confirmLabel="Delete"
        onConfirm={() => { setConfirmDelete(false); onDelete(image.id); }}
        onCancel={() => setConfirmDelete(false)}
        loading={deleting === image.id}
      />
    </>
  );
}

export default function ImageGallery({
  images,
  loading = false,
  onDelete,
  onUpdateAlt,
  deleting,
  products,
  onAssignToProduct,
}: ImageGalleryProps) {
  if (loading) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {[...Array(10)].map((_, i) => (
          <div key={i} className="rounded-xl border border-gray-200 dark:border-slate-700 overflow-hidden animate-pulse">
            <div className="aspect-video bg-gray-200 dark:bg-slate-700" />
            <div className="p-3 space-y-2">
              <div className="h-3 bg-gray-200 dark:bg-slate-700 rounded w-3/4" />
              <div className="h-2.5 bg-gray-200 dark:bg-slate-700 rounded w-1/2" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (images.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center rounded-2xl border-2 border-dashed border-gray-200 dark:border-slate-700">
        <UploadCloud size={40} className="text-gray-300 dark:text-slate-600 mb-3" />
        <p className="text-gray-500 dark:text-gray-400 font-medium">No images found</p>
        <p className="text-gray-400 dark:text-gray-500 text-sm mt-1">Upload images or adjust your search filters</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
      {images.map((img) => (
        <ImageCard
          key={img.id}
          image={img}
          onDelete={onDelete}
          onUpdateAlt={onUpdateAlt}
          deleting={deleting}
          products={products}
          onAssignToProduct={onAssignToProduct}
        />
      ))}
    </div>
  );
}

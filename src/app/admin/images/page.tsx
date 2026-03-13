'use client';

import { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useDropzone } from 'react-dropzone';
import { UploadCloud, RefreshCw, Search, X } from 'lucide-react';
import { clsx } from 'clsx';
import ImageGallery from '@/components/admin/ImageGallery';
import { fetchImages, uploadImage, updateImage, deleteImage } from '@/store/slices/imagesSlice';
import { productsService } from '@/services/productsService';
import type { AppDispatch, RootState } from '@/store/store';
import type { Product } from '@/types';
import toast from 'react-hot-toast';

const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp'];
const ALLOWED_EXTENSIONS = '.jpg,.jpeg,.png,.webp';
const MAX_SIZE = 5 * 1024 * 1024; // 5 MB

export default function ImagesAdminPage() {
  const dispatch = useDispatch<AppDispatch>();
  const { images, loading, uploading, error } = useSelector((s: RootState) => s.images);

  const [deleting, setDeleting] = useState<number | null>(null);
  const [search, setSearch] = useState('');
  const [products, setProducts] = useState<Product[]>([]);

  const fetchProducts = useCallback(async () => {
    try {
      const data = await productsService.getAll();
      setProducts(data);
    } catch { /* silent */ }
  }, []);

  useEffect(() => {
    dispatch(fetchImages());
    fetchProducts();
  }, [dispatch, fetchProducts]);

  const processFile = useCallback(async (file: File) => {
    if (!ALLOWED_TYPES.includes(file.type)) {
      toast.error('Invalid file type. Please upload a JPG, PNG, or WebP image.');
      return;
    }
    if (file.size > MAX_SIZE) {
      toast.error('File too large. Maximum size is 5 MB.');
      return;
    }
    try {
      await dispatch(uploadImage({ file })).unwrap();
      toast.success(`"${file.name}" uploaded successfully`);
    } catch (err: any) {
      toast.error(err || 'Upload failed. Please try again.');
    }
  }, [dispatch]);

  const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
    onDrop: (accepted) => accepted.forEach(processFile),
    accept: { 'image/jpeg': [], 'image/png': [], 'image/webp': [] },
    maxSize: MAX_SIZE,
    multiple: true,
    noClick: true,   // we manage the click ourselves
    noKeyboard: true,
  });

  const handleDelete = async (id: number) => {
    setDeleting(id);
    try {
      await dispatch(deleteImage(id)).unwrap();
      toast.success('Image deleted');
    } catch {
      toast.error('Failed to delete image');
    } finally {
      setDeleting(null);
    }
  };

  const handleUpdateAlt = async (id: number, altText: string) => {
    try {
      await dispatch(updateImage({ id, data: { altText } })).unwrap();
      toast.success('Alt text updated');
    } catch {
      toast.error('Failed to update alt text');
    }
  };

  const handleAssignToProduct = async (imageUrl: string, productId: number) => {
    try {
      await productsService.updateImage(productId, imageUrl);
      toast.success('Product image updated');
    } catch {
      toast.error('Failed to update product image');
    }
  };

  const filtered = search.trim()
    ? images.filter(img =>
        img.filename.toLowerCase().includes(search.toLowerCase()) ||
        (img.altText || '').toLowerCase().includes(search.toLowerCase())
      )
    : images;

  return (
    <div {...getRootProps()} className="relative">
      {/* Drop overlay */}
      {isDragActive && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-teal/10 backdrop-blur-sm border-4 border-dashed border-teal rounded-2xl m-4 pointer-events-none">
          <div className="text-center">
            <UploadCloud size={48} className="text-teal mx-auto mb-3" />
            <p className="text-lg font-semibold text-teal">Drop images to upload</p>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-text-primary dark:text-white">Images</h2>
          <p className="text-sm text-text-muted dark:text-slate-400 mt-0.5">
            {images.length} image{images.length !== 1 ? 's' : ''} · drag files anywhere to upload
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => dispatch(fetchImages())}
            disabled={loading}
            className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-text-muted
                       bg-white dark:bg-slate-800 border border-border dark:border-slate-700
                       hover:bg-surface-muted dark:hover:bg-slate-700 transition-colors"
          >
            <RefreshCw size={14} className={loading ? 'animate-spin' : ''} />
            Refresh
          </button>
          <button
            onClick={open}
            disabled={uploading}
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-white
                       bg-teal hover:bg-teal-dark transition-colors shadow-sm
                       disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {uploading ? (
              <>
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Uploading…
              </>
            ) : (
              <>
                <UploadCloud size={15} />
                Upload Image
              </>
            )}
          </button>
          <input {...getInputProps()} />
        </div>
      </div>

      {/* Search */}
      <div className="relative mb-5 max-w-sm">
        <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted dark:text-slate-500 pointer-events-none" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by filename or alt text…"
          className="w-full pl-9 pr-8 py-2 text-sm rounded-xl border border-border dark:border-slate-700
                     bg-white dark:bg-slate-800 text-text-primary dark:text-slate-200
                     placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-teal/40"
        />
        {search && (
          <button
            onClick={() => setSearch('')}
            className="absolute right-2.5 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-primary dark:hover:text-white transition-colors"
          >
            <X size={13} />
          </button>
        )}
      </div>

      {/* Global error */}
      {error && (
        <div className="mb-4 px-4 py-3 text-sm text-red-600 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800">
          {error}
        </div>
      )}

      <ImageGallery
        images={filtered}
        loading={loading}
        onDelete={handleDelete}
        onUpdateAlt={handleUpdateAlt}
        deleting={deleting}
        products={products}
        onAssignToProduct={handleAssignToProduct}
      />
    </div>
  );
}

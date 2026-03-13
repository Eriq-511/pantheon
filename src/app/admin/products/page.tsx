'use client';

import { useState, useEffect, useMemo, useRef } from 'react';
import { RefreshCw, X, Star, Search, Filter, Plus, UploadCloud } from 'lucide-react';
import { clsx } from 'clsx';
import toast from 'react-hot-toast';
import { imagesService } from '@/services/imagesService';
import { productsService } from '@/services/productsService';
import type { Product } from '@/types';

const FEATURED_KEY = 'pantheon_featured_products';

interface NewProductForm {
  title: string;
  description: string;
  category: string;
  price: string;
  image: string;
}

function loadFeatured(): Set<number> {
  try {
    const raw = localStorage.getItem(FEATURED_KEY);
    return raw ? new Set(JSON.parse(raw) as number[]) : new Set();
  } catch {
    return new Set();
  }
}

function saveFeatured(ids: Set<number>) {
  localStorage.setItem(FEATURED_KEY, JSON.stringify([...ids]));
}

const CATEGORIES = ['all', "men's clothing", "women's clothing", 'jewelery', 'electronics'];

export default function ProductsAdminPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selected, setSelected] = useState<Product | null>(null);
  const [featured, setFeatured] = useState<Set<number>>(new Set());
  const [showCreate, setShowCreate] = useState(false);
  const [saving, setSaving] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');
  const newImgRef = useRef<HTMLInputElement>(null);
  const editImgRef = useRef<HTMLInputElement>(null);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');
  const [newProduct, setNewProduct] = useState<NewProductForm>({
    title: '',
    description: '',
    category: "women's clothing",
    price: '',
    image: '',
  });

  useEffect(() => {
    setFeatured(loadFeatured());
    fetchProducts();
  }, []);

  useEffect(() => {
    if (selected) {
      setSelectedImage(selected.image || '');
    }
  }, [selected]);

  const fetchProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await productsService.getAll();
      setProducts(data);
    } catch (err: any) {
      setError(err.response?.data?.error || err.message || 'Failed to load products');
      toast.error('Could not load products from backend');
    } finally {
      setLoading(false);
    }
  };

  const handleNewProductImageUpload = async (file: File) => {
    setUploadingImage(true);
    try {
      const uploaded = await imagesService.upload(file);
      setNewProduct((prev) => ({ ...prev, image: uploaded.cloudinaryUrl }));
      toast.success('Image uploaded');
    } catch {
      toast.error('Image upload failed');
    } finally {
      setUploadingImage(false);
    }
  };

  const handleEditImageUpload = async (file: File) => {
    setUploadingImage(true);
    try {
      const uploaded = await imagesService.upload(file);
      setSelectedImage(uploaded.cloudinaryUrl);
      toast.success('Image uploaded');
    } catch {
      toast.error('Image upload failed');
    } finally {
      setUploadingImage(false);
    }
  };

  const createProduct = async () => {
    const title = newProduct.title.trim();
    const description = newProduct.description.trim();
    const categoryValue = newProduct.category.trim();
    const priceValue = Number(newProduct.price);
    const imageValue = newProduct.image.trim();

    if (!title || !description || !categoryValue || Number.isNaN(priceValue) || priceValue <= 0 || !imageValue) {
      toast.error('Please provide title, description, category, valid price, and image');
      return;
    }

    setSaving(true);
    try {
      const created = await productsService.create({
        title,
        description,
        category: categoryValue,
        price: priceValue,
        image: imageValue,
      });
      setProducts((prev) => [created, ...prev]);
      setShowCreate(false);
      setNewProduct({
        title: '',
        description: '',
        category: "women's clothing",
        price: '',
        image: '',
      });
      toast.success('Product created');
    } catch (err: any) {
      toast.error(err.response?.data?.error || 'Failed to create product');
    } finally {
      setSaving(false);
    }
  };

  const updateSelectedImage = async () => {
    if (!selected) return;
    const image = selectedImage.trim();
    if (!image) {
      toast.error('Image URL is required');
      return;
    }

    setSaving(true);
    try {
      const updated = await productsService.updateImage(selected.id, image);
      setProducts((prev) => prev.map((p) => (p.id === updated.id ? updated : p)));
      setSelected(updated);
      toast.success('Product image updated');
    } catch (err: any) {
      toast.error(err.response?.data?.error || 'Failed to update image');
    } finally {
      setSaving(false);
    }
  };

  const toggleFeatured = (id: number) => {
    setFeatured((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
        toast.success('Removed from featured');
      } else {
        next.add(id);
        toast.success('Marked as featured');
      }
      saveFeatured(next);
      return next;
    });
  };

  const filtered = useMemo(() => {
    let list = products;
    if (category !== 'all') list = list.filter((p) => p.category === category);
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter((p) => p.title.toLowerCase().includes(q) || p.category.toLowerCase().includes(q));
    }
    return list;
  }, [products, category, search]);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-text-primary dark:text-white">Products</h2>
          <p className="text-sm text-text-muted dark:text-slate-400 mt-0.5">
            {products.length} products from backend
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowCreate((prev) => !prev)}
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-white bg-teal hover:bg-teal-dark transition-colors"
          >
            <Plus size={14} />
            Add Product
          </button>
          <button
            onClick={fetchProducts}
            disabled={loading}
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium
                       text-text-primary dark:text-slate-200
                       bg-white dark:bg-slate-800 border border-border dark:border-slate-700
                       hover:bg-surface-muted dark:hover:bg-slate-700 transition-colors disabled:opacity-60"
          >
            <RefreshCw size={14} className={loading ? 'animate-spin' : ''} />
            Refresh
          </button>
        </div>
      </div>

      {showCreate && (
        <div className="mb-5 rounded-2xl border border-border dark:border-slate-700 bg-white dark:bg-[#071828] p-4 sm:p-5 space-y-3">
          <h3 className="text-sm font-semibold text-text-primary dark:text-white">Create Product</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <input
              type="text"
              value={newProduct.title}
              onChange={(e) => setNewProduct((prev) => ({ ...prev, title: e.target.value }))}
              placeholder="Title"
              className="px-3 py-2 rounded-xl border border-border dark:border-slate-700 bg-white dark:bg-slate-800 text-sm"
            />
            <input
              type="number"
              min="0"
              step="0.01"
              value={newProduct.price}
              onChange={(e) => setNewProduct((prev) => ({ ...prev, price: e.target.value }))}
              placeholder="Price (USD)"
              className="px-3 py-2 rounded-xl border border-border dark:border-slate-700 bg-white dark:bg-slate-800 text-sm"
            />
            <select
              value={newProduct.category}
              onChange={(e) => setNewProduct((prev) => ({ ...prev, category: e.target.value }))}
              className="px-3 py-2 rounded-xl border border-border dark:border-slate-700 bg-white dark:bg-slate-800 text-sm"
            >
              {CATEGORIES.filter((c) => c !== 'all').map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
            <button
              type="button"
              onClick={() => newImgRef.current?.click()}
              disabled={uploadingImage}
              className="flex items-center justify-center gap-2 px-3 py-2 rounded-xl border border-dashed border-teal text-teal text-sm font-medium hover:bg-teal/5 transition-colors disabled:opacity-60"
            >
              {uploadingImage
                ? <span className="w-4 h-4 border-2 border-teal/30 border-t-teal rounded-full animate-spin" />
                : <UploadCloud size={14} />}
              {uploadingImage ? 'Uploading…' : 'Upload Image'}
            </button>
            <input
              ref={newImgRef}
              type="file"
              accept=".jpg,.jpeg,.png,.webp"
              className="hidden"
              onChange={(e) => { const f = e.target.files?.[0]; if (f) handleNewProductImageUpload(f); e.target.value = ''; }}
            />
            <textarea
              value={newProduct.description}
              onChange={(e) => setNewProduct((prev) => ({ ...prev, description: e.target.value }))}
              placeholder="Description"
              rows={3}
              className="sm:col-span-2 px-3 py-2 rounded-xl border border-border dark:border-slate-700 bg-white dark:bg-slate-800 text-sm"
            />
            <input
              type="text"
              value={newProduct.image}
              onChange={(e) => setNewProduct((prev) => ({ ...prev, image: e.target.value }))}
              placeholder="Or paste image URL"
              className="sm:col-span-2 px-3 py-2 rounded-xl border border-border dark:border-slate-700 bg-white dark:bg-slate-800 text-sm"
            />
            {newProduct.image && (
              <div className="sm:col-span-2 flex items-center gap-3 p-2 rounded-xl border border-border dark:border-slate-700 bg-surface-muted dark:bg-slate-900">
                <img src={newProduct.image} alt="preview" className="w-14 h-14 object-contain rounded-lg bg-white p-1 shrink-0" />
                <span className="text-xs text-text-muted dark:text-slate-400 break-all line-clamp-2">{newProduct.image}</span>
              </div>
            )}
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={createProduct}
              disabled={saving}
              className="px-4 py-2 rounded-lg text-sm font-medium text-white bg-teal hover:bg-teal-dark transition-colors disabled:opacity-60"
            >
              Save Product
            </button>
            <button
              onClick={() => setShowCreate(false)}
              className="px-4 py-2 rounded-lg text-sm font-medium border border-border dark:border-slate-700 text-text-primary dark:text-slate-300"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      <div className="flex flex-col sm:flex-row gap-3 mb-5">
        <div className="relative flex-1 max-w-sm">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted dark:text-slate-500 pointer-events-none" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search products..."
            className="w-full pl-9 pr-3 py-2 text-sm rounded-xl border border-border dark:border-slate-700
                       bg-white dark:bg-slate-800 text-text-primary dark:text-slate-200
                       placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-teal/40"
          />
        </div>
        <div className="relative">
          <Filter size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted dark:text-slate-500 pointer-events-none" />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="pl-8 pr-8 py-2 text-sm rounded-xl border border-border dark:border-slate-700
                       bg-white dark:bg-slate-800 text-text-primary dark:text-slate-200
                       focus:outline-none focus:ring-2 focus:ring-teal/40 appearance-none"
          >
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>{c === 'all' ? 'All categories' : c}</option>
            ))}
          </select>
        </div>
      </div>

      {error && (
        <div className="mb-4 px-4 py-3 text-sm text-red-600 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800 flex items-center justify-between">
          {error}
          <button onClick={fetchProducts} className="text-xs underline ml-3 hover:no-underline shrink-0">Retry</button>
        </div>
      )}

      {loading ? (
        <div className="rounded-2xl border border-border dark:border-slate-700 overflow-hidden">
          <div className="bg-surface-muted dark:bg-slate-800 px-4 py-3 grid grid-cols-6 gap-4">
            {['', 'Title', 'Category', 'Price', 'Rating', 'Featured'].map((h, i) => (
              <div key={i} className={clsx('text-xs font-semibold text-text-muted dark:text-slate-400 uppercase', i === 0 && 'w-12')}>{h}</div>
            ))}
          </div>
          {[...Array(6)].map((_, i) => (
            <div key={i} className="px-4 py-3 grid grid-cols-6 gap-4 border-t border-gray-100 dark:border-slate-800 animate-pulse items-center">
              <div className="w-12 h-12 bg-gray-200 dark:bg-slate-700 rounded-lg" />
              <div className="h-4 bg-gray-200 dark:bg-slate-700 rounded col-span-1" />
              <div className="h-4 bg-gray-200 dark:bg-slate-700 rounded w-24" />
              <div className="h-4 bg-gray-200 dark:bg-slate-700 rounded w-14" />
              <div className="h-4 bg-gray-200 dark:bg-slate-700 rounded w-12" />
              <div className="h-6 bg-gray-200 dark:bg-slate-700 rounded w-8" />
            </div>
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-border dark:border-teal-900/60 overflow-hidden shadow-sm">
          <table className="w-full text-sm">
            <thead className="bg-surface-muted dark:bg-slate-800">
              <tr>
                {['Image', 'Title', 'Category', 'Price', 'Rating', 'Featured'].map((h) => (
                  <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-text-muted dark:text-slate-400 uppercase tracking-wider">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-[#071828] divide-y divide-gray-100 dark:divide-slate-800">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-4 py-12 text-center text-text-muted dark:text-slate-500 text-sm">
                    No products found.
                  </td>
                </tr>
              ) : filtered.map((p) => (
                <tr key={p.id} className="hover:bg-surface-muted dark:hover:bg-slate-800/60 transition-colors">
                  <td className="px-4 py-3">
                    <button
                      onClick={() => setSelected(p)}
                      className="w-12 h-12 rounded-lg border border-gray-100 dark:border-slate-700 bg-white p-1 flex-shrink-0 hover:shadow-md transition-shadow"
                    >
                      <img src={p.image} alt={p.title} className="w-full h-full object-contain" />
                    </button>
                  </td>
                  <td className="px-4 py-3 max-w-[200px]">
                    <button
                      onClick={() => setSelected(p)}
                      className="text-left font-medium text-text-primary dark:text-slate-200 hover:text-teal dark:hover:text-teal-400 transition-colors line-clamp-2"
                    >
                      {p.title}
                    </button>
                  </td>
                  <td className="px-4 py-3">
                    <span className="inline-flex px-2 py-0.5 rounded-full text-xs font-medium bg-teal-light/50 text-teal-deep dark:bg-teal/10 dark:text-teal-300 capitalize whitespace-nowrap">
                      {p.category}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="font-semibold text-text-primary dark:text-white">UGX {(p.price * 3700).toLocaleString('en-UG', { maximumFractionDigits: 0 })}</span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1">
                      <Star size={12} className="text-yellow-400 fill-yellow-400 shrink-0" />
                      <span className="text-text-primary dark:text-slate-300">{p.rating.rate}</span>
                      <span className="text-text-muted dark:text-slate-500 text-xs">({p.rating.count})</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => toggleFeatured(p.id)}
                      title={featured.has(p.id) ? 'Remove from featured' : 'Mark as featured'}
                      className={clsx(
                        'w-8 h-8 rounded-lg flex items-center justify-center transition-all',
                        featured.has(p.id)
                          ? 'bg-yellow-400/20 text-yellow-500 hover:bg-yellow-400/30'
                          : 'text-gray-300 dark:text-slate-600 hover:text-yellow-400 hover:bg-yellow-400/10'
                      )}
                    >
                      <Star size={15} className={featured.has(p.id) ? 'fill-yellow-400' : ''} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setSelected(null)} />
          <div className="relative bg-white dark:bg-[#071828] rounded-2xl shadow-2xl w-full max-w-lg z-10 max-h-[90vh] overflow-y-auto border border-border dark:border-teal-900/60">
            <button
              onClick={() => setSelected(null)}
              className="absolute top-4 right-4 p-1.5 rounded-lg text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-slate-700 z-10 transition-colors"
            >
              <X size={18} />
            </button>

            <div className="flex items-center justify-center p-8 bg-surface-muted dark:bg-slate-800 rounded-t-2xl h-56">
              <img src={selectedImage || selected.image} alt={selected.title} className="max-h-40 max-w-full object-contain" />
            </div>

            <div className="p-6">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-teal-light/50 text-teal-deep dark:bg-teal/10 dark:text-teal-300 capitalize">
                  {selected.category}
                </span>
                {featured.has(selected.id) && (
                  <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400 flex items-center gap-1">
                    <Star size={10} className="fill-yellow-500 text-yellow-500" /> Featured
                  </span>
                )}
              </div>
              <h3 className="text-lg font-semibold text-text-primary dark:text-white mb-3">{selected.title}</h3>
              <div className="mb-4">
                <label className="block text-xs font-medium text-text-muted dark:text-slate-400 mb-1.5 uppercase tracking-wide">
                  Product image
                </label>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => editImgRef.current?.click()}
                    disabled={uploadingImage}
                    className="flex items-center gap-2 px-3 py-2 rounded-xl border border-dashed border-teal text-teal text-sm font-medium hover:bg-teal/5 transition-colors disabled:opacity-60"
                  >
                    {uploadingImage
                      ? <span className="w-4 h-4 border-2 border-teal/30 border-t-teal rounded-full animate-spin" />
                      : <UploadCloud size={14} />}
                    {uploadingImage ? 'Uploading…' : 'Upload Image'}
                  </button>
                  <input
                    ref={editImgRef}
                    type="file"
                    accept=".jpg,.jpeg,.png,.webp"
                    className="hidden"
                    onChange={(e) => { const f = e.target.files?.[0]; if (f) handleEditImageUpload(f); e.target.value = ''; }}
                  />
                </div>
                <input
                  type="text"
                  value={selectedImage}
                  onChange={(e) => setSelectedImage(e.target.value)}
                  placeholder="Or paste an image URL"
                  className="mt-2 w-full px-3 py-2 rounded-xl border border-border dark:border-slate-700 bg-white dark:bg-slate-800 text-sm text-text-primary dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-teal/40"
                />
                <button
                  onClick={updateSelectedImage}
                  disabled={saving}
                  className="mt-2 px-3 py-1.5 rounded-lg text-sm font-medium text-white bg-teal hover:bg-teal-dark transition-colors disabled:opacity-60"
                >
                  Save Image
                </button>
              </div>
              <p className="text-sm text-text-muted dark:text-slate-400 leading-relaxed mb-4">{selected.description}</p>
              <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-slate-700">
                <span className="text-2xl font-bold text-text-primary dark:text-white">UGX {(selected.price * 3700).toLocaleString('en-UG', { maximumFractionDigits: 0 })}</span>
                <div className="flex items-center gap-1.5">
                  <Star size={15} className="text-yellow-400 fill-yellow-400" />
                  <span className="font-semibold text-text-primary dark:text-slate-300">{selected.rating.rate}</span>
                  <span className="text-text-muted dark:text-slate-500 text-sm">/ 5 ({selected.rating.count} reviews)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

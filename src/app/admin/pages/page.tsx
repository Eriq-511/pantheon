'use client';

import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Plus, Edit2, Trash2, X } from 'lucide-react';
import DataTable from '@/components/admin/DataTable';
import PageForm from '@/components/admin/PageForm';
import ConfirmDialog from '@/components/admin/ConfirmDialog';
import { fetchPages, createPage, updatePage, deletePage } from '@/store/slices/pagesSlice';
import type { AppDispatch, RootState } from '@/store/store';
import type { Page, PageRequest } from '@/types';
import { clsx } from 'clsx';

type Modal = { mode: 'create' } | { mode: 'edit'; page: Page } | null;

export default function PagesAdminPage() {
  const dispatch = useDispatch<AppDispatch>();
  const { pages, loading, error } = useSelector((s: RootState) => s.pages);

  const [modal, setModal] = useState<Modal>(null);
  const [deleting, setDeleting] = useState<number | null>(null);
  const [savingPage, setSavingPage] = useState(false);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [serverError, setServerError] = useState<string | null>(null);

  useEffect(() => { dispatch(fetchPages()); }, [dispatch]);

  const validateForm = (data: PageRequest) => {
    const errs: Record<string, string> = {};
    if (!data.title.trim())   errs.title   = 'Title is required';
    if (!data.slug.trim())    errs.slug    = 'Slug is required';
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(data.slug))
      errs.slug = 'Slug must be lowercase, hyphens, and numbers only';
    if (!data.content || data.content === '<p></p>')
      errs.content = 'Content is required';
    return errs;
  };

  const handleSave = async (data: PageRequest) => {
    const errs = validateForm(data);
    if (Object.keys(errs).length) { setFormErrors(errs); return; }
    setFormErrors({});
    setSavingPage(true);
    setServerError(null);

    try {
      if (modal?.mode === 'create') {
        await dispatch(createPage(data)).unwrap();
      } else if (modal?.mode === 'edit') {
        await dispatch(updatePage({ id: modal.page.id, data })).unwrap();
      }
      setModal(null);
    } catch (err: any) {
      setServerError(err?.message || err || 'Failed to save page');
    } finally {
      setSavingPage(false);
    }
  };

  const handleDelete = async (id: number) => {
    setDeleting(id);
    try {
      await dispatch(deletePage(id)).unwrap();
    } catch {/* error shown via state */}
    finally { setDeleting(null); }
  };

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Pages</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
            Manage your site pages and content
          </p>
        </div>
        <button
          onClick={() => { setModal({ mode: 'create' }); setFormErrors({}); setServerError(null); }}
          className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-white bg-teal hover:bg-teal-dark transition-colors shadow-sm"
        >
          <Plus size={16} />
          New Page
        </button>
      </div>

      {/* Global error */}
      {error && (
        <div className="mb-4 px-4 py-3 text-sm text-red-600 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800">
          {error}
        </div>
      )}

      <DataTable<Page>
        loading={loading}
        data={pages}
        keyExtractor={(p) => p.id}
        emptyMessage="No pages yet. Create your first page!"
        columns={[
          {
            key: 'title',
            label: 'Title',
            render: (p) => (
              <div>
                <p className="font-medium text-gray-900 dark:text-white">{p.title}</p>
                <p className="text-xs text-gray-400">/{p.slug}</p>
              </div>
            ),
          },
          {
            key: 'status',
            label: 'Status',
            render: (p) => (
              <span className={clsx(
                'inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium',
                p.status === 'published'
                  ? 'bg-status-published text-white'
                  : 'bg-status-draft text-white'
              )}>
                {p.status}
              </span>
            ),
          },
          {
            key: 'updatedAt',
            label: 'Last Updated',
            render: (p) => (
              <span className="text-xs text-gray-500">
                {new Date(p.updatedAt).toLocaleDateString()}
              </span>
            ),
          },
          {
            key: 'actions',
            label: 'Actions',
            className: 'text-right',
            render: (p) => (
              <div className="flex items-center justify-end gap-2">
                <button
                  onClick={() => { setModal({ mode: 'edit', page: p }); setFormErrors({}); setServerError(null); }}
                  className="p-1.5 rounded-lg text-gray-500 hover:bg-gray-100 hover:text-teal transition-colors"
                  title="Edit"
                >
                  <Edit2 size={15} />
                </button>
                <button
                  onClick={() => handleDelete(p.id)}
                  className="p-1.5 rounded-lg text-gray-500 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-600 transition-colors"
                  title="Delete"
                >
                  {deleting === p.id
                    ? <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                    : <Trash2 size={15} />
                  }
                </button>
              </div>
            ),
          },
        ]}
      />

      {/* Modal */}
      {modal && (
        <div className="fixed inset-0 z-50 flex items-start justify-center p-4 pt-16 overflow-y-auto">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setModal(null)} />
          <div className="relative bg-white dark:bg-slate-800 rounded-2xl shadow-2xl w-full max-w-3xl z-10 p-6 mb-8">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {modal.mode === 'create' ? 'Create New Page' : `Edit: ${modal.page.title}`}
              </h3>
              <button onClick={() => setModal(null)} className="p-1.5 rounded-lg text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-slate-700">
                <X size={18} />
              </button>
            </div>

            {serverError && (
              <div className="mb-4 px-4 py-2.5 text-sm text-red-600 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800">
                {serverError}
              </div>
            )}

            <PageForm
              initialData={modal.mode === 'edit' ? modal.page : undefined}
              onSubmit={handleSave}
              onCancel={() => setModal(null)}
              loading={savingPage}
              errors={formErrors}
            />
          </div>
        </div>
      )}
    </div>
  );
}

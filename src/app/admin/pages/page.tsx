'use client';


import DynamicContentForm from '@/components/admin/DynamicContentForm';
import { useState } from 'react';
import type { ContentEntry } from '@/components/admin/DynamicContentForm';
export default function AdminPages() {
  const [showForm, setShowForm] = useState(false);
  const [lastEntry, setLastEntry] = useState<ContentEntry | null>(null);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Dynamic Content</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
            Manage your dynamic content types and entries
          </p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-white bg-teal hover:bg-teal-dark transition-colors shadow-sm"
        >
          Add Entry
        </button>
      </div>

      {showForm && (
        <div className="fixed inset-0 z-50 flex items-start justify-center p-4 pt-16 overflow-y-auto">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setShowForm(false)} />
          <div className="relative bg-white dark:bg-slate-800 rounded-2xl shadow-2xl w-full max-w-3xl z-10 p-6 mb-8">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Create Dynamic Content Entry
              </h3>
              <button onClick={() => setShowForm(false)} className="p-1.5 rounded-lg text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-slate-700">
                <X size={18} />
              </button>
            </div>
            <DynamicContentForm
              onSubmit={(entry) => { setLastEntry(entry); setShowForm(false); }}
              onCancel={() => setShowForm(false)}
            />
          </div>
        </div>
      )}
      {/* TODO: List and manage entries here */}
      {lastEntry && (
        <div className="mt-4 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg text-green-800 dark:text-green-200">
          Last entry submitted: <pre className="text-xs whitespace-pre-wrap">{JSON.stringify(lastEntry, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}
import { X } from 'lucide-react';

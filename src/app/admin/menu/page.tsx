'use client';

import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Plus, GripVertical, Edit2, Trash2, Save, X } from 'lucide-react';
import MenuForm from '@/components/admin/MenuForm';
import ConfirmDialog from '@/components/admin/ConfirmDialog';
import {
  fetchMenu,
  createMenuItem,
  updateMenuItem,
  reorderMenu,
  deleteMenuItem,
  setItemsOptimistic,
} from '@/store/slices/menuSlice';
import { fetchPages } from '@/store/slices/pagesSlice';
import type { AppDispatch, RootState } from '@/store/store';
import type { MenuItem, MenuItemRequest } from '@/types';

type Modal = { mode: 'create' } | { mode: 'edit'; item: MenuItem } | null;

function SortableMenuItem({
  item,
  onEdit,
  onDelete,
}: {
  item: MenuItem;
  onEdit: (item: MenuItem) => void;
  onDelete: (item: MenuItem) => void;
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id: item.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="flex items-center gap-3 px-4 py-3 bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 shadow-sm group"
    >
      {/* Drag Handle */}
      <button
        {...attributes}
        {...listeners}
        className="cursor-grab active:cursor-grabbing text-gray-300 dark:text-slate-600 hover:text-gray-500 dark:hover:text-slate-400 transition-colors"
        title="Drag to reorder"
      >
        <GripVertical size={18} />
      </button>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-gray-800 dark:text-gray-200">{item.label}</p>
        <p className="text-xs text-gray-400 dark:text-gray-500 truncate">
          {item.pageSlug ? `→ /${item.pageSlug}` : item.url || '—'}
        </p>
      </div>

      {/* Order badge */}
      <span className="text-xs text-gray-400 dark:text-gray-500 font-mono w-6 text-center">
        {item.orderIndex}
      </span>

      {/* Actions */}
      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          onClick={() => onEdit(item)}
          className="p-1.5 rounded-lg text-gray-500 hover:bg-gray-100 dark:hover:bg-slate-700 hover:text-teal transition-colors"
          title="Edit"
        >
          <Edit2 size={14} />
        </button>
        <button
          onClick={() => onDelete(item)}
          className="p-1.5 rounded-lg text-gray-500 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-600 transition-colors"
          title="Delete"
        >
          <Trash2 size={14} />
        </button>
      </div>
    </div>
  );
}

export default function MenuAdminPage() {
  const dispatch = useDispatch<AppDispatch>();
  const { items, loading, error } = useSelector((s: RootState) => s.menu);
  const { pages } = useSelector((s: RootState) => s.pages);

  const [modal, setModal] = useState<Modal>(null);
  const [deleteTarget, setDeleteTarget] = useState<MenuItem | null>(null);
  const [saving, setSaving] = useState(false);
  const [ordering, setOrdering] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [hasReordered, setHasReordered] = useState(false);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  useEffect(() => {
    dispatch(fetchMenu());
    dispatch(fetchPages());
  }, [dispatch]);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIdx = items.findIndex((i) => i.id === active.id);
    const newIdx = items.findIndex((i) => i.id === over.id);
    const reordered = arrayMove(items, oldIdx, newIdx).map((item, idx) => ({
      ...item,
      orderIndex: idx,
    }));
    dispatch(setItemsOptimistic(reordered));
    setHasReordered(true);
  };

  const saveOrder = async () => {
    setOrdering(true);
    try {
      await dispatch(reorderMenu({
        items: items.map((item, idx) => ({ id: item.id, orderIndex: idx })),
      })).unwrap();
      setHasReordered(false);
    } catch (err: any) {
      setServerError(err || 'Failed to save order');
    } finally {
      setOrdering(false);
    }
  };

  const handleSave = async (data: MenuItemRequest) => {
    if (!data.label.trim()) return;
    setSaving(true);
    setServerError(null);
    try {
      if (modal?.mode === 'create') {
        await dispatch(createMenuItem({ ...data, orderIndex: items.length })).unwrap();
      } else if (modal?.mode === 'edit') {
        await dispatch(updateMenuItem({ id: modal.item.id, data })).unwrap();
      }
      setModal(null);
    } catch (err: any) {
      setServerError(err || 'Failed to save menu item');
    } finally {
      setSaving(false);
    }
  };

  const handleConfirmDelete = async () => {
    if (!deleteTarget) return;
    try {
      await dispatch(deleteMenuItem(deleteTarget.id)).unwrap();
    } catch {/* error via state */}
    finally { setDeleteTarget(null); }
  };

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Menu</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
            Drag items to reorder. Click Save Order when done.
          </p>
        </div>
        <div className="flex items-center gap-3">
          {hasReordered && (
            <button
              onClick={saveOrder}
              disabled={ordering}
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-white
                         bg-green-600 hover:bg-green-700 transition-colors shadow-sm disabled:opacity-60"
            >
              {ordering ? (
                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
              ) : <Save size={15} />}
              Save Order
            </button>
          )}
          <button
            onClick={() => { setModal({ mode: 'create' }); setServerError(null); }}
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-white bg-teal hover:bg-teal-dark transition-colors shadow-sm"
          >
            <Plus size={16} />
            Add Item
          </button>
        </div>
      </div>

      {/* Error */}
      {(error || serverError) && (
        <div className="mb-4 px-4 py-3 text-sm text-red-600 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800">
          {error || serverError}
        </div>
      )}

      {/* Sortable List */}
      {loading ? (
        <div className="space-y-3">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-14 bg-gray-100 dark:bg-slate-700 rounded-xl animate-pulse" />
          ))}
        </div>
      ) : items.length === 0 ? (
        <div className="py-16 text-center rounded-xl border-2 border-dashed border-gray-200 dark:border-slate-700">
          <p className="text-gray-400 dark:text-gray-500 text-sm">No menu items yet. Add your first!</p>
        </div>
      ) : (
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext items={items.map((i) => i.id)} strategy={verticalListSortingStrategy}>
            <div className="space-y-2">
              {items.map((item) => (
                <SortableMenuItem
                  key={item.id}
                  item={item}
                  onEdit={(i) => { setModal({ mode: 'edit', item: i }); setServerError(null); }}
                  onDelete={(i) => setDeleteTarget(i)}
                />
              ))}
            </div>
          </SortableContext>
        </DndContext>
      )}

      {/* Modal */}
      {modal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setModal(null)} />
          <div className="relative bg-white dark:bg-slate-800 rounded-2xl shadow-2xl w-full max-w-md z-10 p-6">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {modal.mode === 'create' ? 'Add Menu Item' : 'Edit Menu Item'}
              </h3>
              <button onClick={() => setModal(null)} className="p-1.5 rounded-lg text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-slate-700">
                <X size={18} />
              </button>
            </div>
            {serverError && (
              <div className="mb-4 text-sm text-red-600 bg-red-50 dark:bg-red-900/20 px-3 py-2 rounded-lg">
                {serverError}
              </div>
            )}
            <MenuForm
              initialData={modal.mode === 'edit' ? {
                label: modal.item.label,
                url: modal.item.url ?? undefined,
                icon: modal.item.icon ?? undefined,
                pageId: modal.item.pageId,
              } : undefined}
              pages={pages}
              onSubmit={handleSave}
              onCancel={() => setModal(null)}
              loading={saving}
            />
          </div>
        </div>
      )}

      {/* Delete Confirm */}
      <ConfirmDialog
        isOpen={!!deleteTarget}
        title="Delete Menu Item"
        message={`Delete "${deleteTarget?.label}"? This cannot be undone.`}
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
}

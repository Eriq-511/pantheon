import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { geminiGenerate } from '@/services/geminiService';

interface ContentType {
  id: number;
  name: string;
  description?: string;
}

interface ContentField {
  id: number;
  contentTypeId: number;
  name: string;
  label: string;
  type: string;
  required: boolean;
}

export interface ContentEntry {
  id?: number;
  contentTypeId: number;
  data: Record<string, any>;
}

interface DynamicContentFormProps {
  initialContentTypeId?: number;
  initialEntry?: ContentEntry;
  onSubmit: (entry: ContentEntry) => void;
  onCancel: () => void;
}

const DynamicContentForm: React.FC<DynamicContentFormProps> = ({
  initialContentTypeId,
  initialEntry,
  onSubmit,
  onCancel,
}) => {
  const [contentTypes, setContentTypes] = useState<ContentType[]>([]);
  const [fields, setFields] = useState<ContentField[]>([]);
  const [selectedTypeId, setSelectedTypeId] = useState<number | undefined>(initialContentTypeId);
  const [formData, setFormData] = useState<Record<string, any>>(initialEntry?.data || {});
  const [loading, setLoading] = useState(false);
  const [aiLoading, setAiLoading] = useState<string | null>(null);

  useEffect(() => {
    axios.get('/api/content-types').then(res => setContentTypes(res.data));
  }, []);

  useEffect(() => {
    if (selectedTypeId) {
      axios.get(`/api/content-fields?contentTypeId=${selectedTypeId}`)
        .then(res => setFields(res.data));
    } else {
      setFields([]);
    }
  }, [selectedTypeId]);

  const handleChange = (field: ContentField, value: any) => {
    setFormData(prev => ({ ...prev, [field.name]: value }));
  };

  const handleAISuggest = async (field: ContentField) => {
    setAiLoading(field.name);
    try {
      const prompt = `Suggest a value for the field "${field.label}" of type "${field.type}" for a ${contentTypes.find(t => t.id === selectedTypeId)?.name || 'content type'}.`;
      const suggestion = await geminiGenerate(prompt);
      setFormData(prev => ({ ...prev, [field.name]: suggestion }));
    } catch (err) {
      alert('AI suggestion failed.');
    } finally {
      setAiLoading(null);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTypeId) return;
    setLoading(true);
    onSubmit({
      ...initialEntry,
      contentTypeId: selectedTypeId,
      data: formData,
    });
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1">Content Type</label>
        <select
          value={selectedTypeId || ''}
          onChange={e => setSelectedTypeId(Number(e.target.value))}
          className="w-full px-3 py-2 rounded border"
        >
          <option value="">Select type...</option>
          {contentTypes.map(type => (
            <option key={type.id} value={type.id}>{type.name}</option>
          ))}
        </select>
      </div>
      {fields.map(field => (
        <div key={field.id} className="flex items-center gap-2">
          <div className="flex-1">
            <label className="block text-sm font-medium mb-1">{field.label}</label>
            <input
              type={field.type === 'number' ? 'number' : 'text'}
              required={field.required}
              value={formData[field.name] || ''}
              onChange={e => handleChange(field, e.target.value)}
              className="w-full px-3 py-2 rounded border"
            />
          </div>
          <button
            type="button"
            className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs"
            disabled={aiLoading === field.name}
            onClick={() => handleAISuggest(field)}
            title="Suggest with AI"
          >
            {aiLoading === field.name ? 'AI…' : 'Suggest'}
          </button>
        </div>
      ))}
      <div className="flex gap-2">
        <button type="submit" className="px-4 py-2 bg-teal-600 text-white rounded" disabled={loading}>
          {loading ? 'Saving...' : 'Save'}
        </button>
        <button type="button" className="px-4 py-2 bg-gray-200 rounded" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
};

export default DynamicContentForm;

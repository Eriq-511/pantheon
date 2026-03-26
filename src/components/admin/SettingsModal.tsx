
import React, { useState } from 'react';

interface Entity {
  id: string;
  type: string;
  name: string;
  url: string;
  status: string;
}

interface SettingsModalProps {
  open: boolean;
  onClose: () => void;
  entities: Entity[];
  onConnect: (type: string, data: { url: string }) => void;
  onDisconnect: (id: string) => void;
}

const SettingsModal: React.FC<SettingsModalProps> = ({ open, onClose, entities, onConnect, onDisconnect }) => {
  const [type, setType] = useState('website');
  const [url, setUrl] = useState('');
  const [error, setError] = useState('');

  if (!open) return null;

  const handleConnect = (e: React.FormEvent) => {
    e.preventDefault();
    if (!url.trim()) {
      setError('Please enter a valid URL or username.');
      return;
    }
    setError('');
    onConnect(type, { url });
    setUrl('');
    setType('website');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg w-full max-w-md p-6 relative">
        <button
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-900 dark:hover:text-white"
          onClick={onClose}
          aria-label="Close"
        >
          <span aria-hidden="true">&times;</span>
        </button>
        <h3 className="text-lg font-bold mb-4">Connect Website or Social Account</h3>
        <form onSubmit={handleConnect} className="mb-6">
          <div className="mb-2">
            <label className="block text-sm font-medium mb-1">Type</label>
            <select
              className="w-full border rounded px-2 py-1"
              value={type}
              onChange={e => setType(e.target.value)}
            >
              <option value="website">Website</option>
              <option value="instagram">Instagram</option>
              <option value="facebook">Facebook</option>
              <option value="x">X (Twitter)</option>
              <option value="tiktok">TikTok</option>
            </select>
          </div>
          <div className="mb-2">
            <label className="block text-sm font-medium mb-1">
              {type === 'website' ? 'Site URL' : 'Username or Page URL'}
            </label>
            <input
              className="w-full border rounded px-2 py-1"
              type="text"
              value={url}
              onChange={e => setUrl(e.target.value)}
              placeholder={type === 'website' ? 'https://yoursite.com' : 'username or profile/page URL'}
            />
          </div>
          {error && <div className="text-red-600 text-sm mb-2">{error}</div>}
          <button
            type="submit"
            className="mt-2 px-4 py-2 bg-teal-600 text-white rounded w-full"
          >
            Connect
          </button>
        </form>
        <div>
          <h4 className="font-semibold mb-2">Connected</h4>
          {entities.length === 0 ? (
            <div className="text-gray-500 text-sm">No sites or accounts connected yet.</div>
          ) : (
            <ul className="divide-y divide-gray-200 dark:divide-slate-700">
              {entities.map(entity => (
                <li key={entity.id} className="flex items-center justify-between py-2">
                  <div>
                    <span className="font-medium capitalize">{entity.type}</span>
                    <span className="ml-2 text-gray-600 dark:text-gray-300 text-sm">{entity.name}</span>
                  </div>
                  <button
                    className="text-red-600 hover:underline text-sm"
                    onClick={() => onDisconnect(entity.id)}
                  >
                    Disconnect
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default SettingsModal;

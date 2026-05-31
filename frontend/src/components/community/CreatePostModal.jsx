import React, { useState } from 'react';
import { X, Image as ImageIcon, MapPin } from 'lucide-react';
import api from '../../services/api';

const CreatePostModal = ({ isOpen, onClose, onPostCreated }) => {
  const [imageUrl, setImageUrl] = useState('');
  const [caption, setCaption] = useState('');
  const [location, setLocation] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!imageUrl) {
      setError('Image URL is required');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await api.post('/community/posts', {
        imageUrl,
        caption,
        location
      });

      if (response.data.success) {
        onPostCreated(response.data.post);
        setImageUrl('');
        setCaption('');
        setLocation('');
        onClose();
      }
    } catch (err) {
      console.error('Error creating post:', err);
      setError(err.response?.data?.message || 'Failed to create post');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm transition-opacity">
      <div className="bg-slate-900 rounded-2xl w-full max-w-lg border border-slate-800 shadow-2xl transform transition-all relative overflow-hidden">
        <div className="flex items-center justify-between p-4 border-b border-slate-800">
          <h2 className="text-xl font-bold text-white">Share a Travel Moment</h2>
          <button 
            onClick={onClose}
            className="p-1 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          {error && (
            <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm">
              {error}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">Image URL</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <ImageIcon size={18} className="text-slate-500" />
              </div>
              <input
                type="url"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                className="block w-full pl-10 bg-slate-800 border border-slate-700 rounded-xl py-2.5 text-white placeholder-slate-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
                placeholder="https://example.com/image.jpg"
                required
              />
            </div>
            {imageUrl && (
              <div className="mt-3 aspect-video bg-slate-800 rounded-xl overflow-hidden border border-slate-700">
                <img 
                  src={imageUrl} 
                  alt="Preview" 
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.parentElement.classList.add('flex', 'items-center', 'justify-center');
                    e.target.parentElement.innerHTML = '<span class="text-slate-500 text-sm">Invalid Image URL</span>';
                  }}
                />
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">Caption</label>
            <textarea
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              className="block w-full bg-slate-800 border border-slate-700 rounded-xl py-2.5 px-3 text-white placeholder-slate-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none resize-none"
              placeholder="Write a caption..."
              rows={3}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">Location (Optional)</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <MapPin size={18} className="text-slate-500" />
              </div>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="block w-full pl-10 bg-slate-800 border border-slate-700 rounded-xl py-2.5 text-white placeholder-slate-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
                placeholder="Where was this taken?"
              />
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={loading || !imageUrl}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl py-3 font-semibold hover:from-blue-500 hover:to-indigo-500 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-900 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-blue-500/20"
            >
              {loading ? 'Posting...' : 'Share Moment'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePostModal;

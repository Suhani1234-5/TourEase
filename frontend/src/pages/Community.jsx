import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Camera, RefreshCw } from 'lucide-react';
import api from '../services/api';
import PostCard from '../components/community/PostCard';
import CreatePostModal from '../components/community/CreatePostModal';

const Community = () => {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const observer = useRef();
  
  const lastPostElementRef = useCallback(node => {
    if (loading) return;
    if (observer.current) observer.current.disconnect();
    
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        setPage(prevPage => prevPage + 1);
      }
    });
    
    if (node) observer.current.observe(node);
  }, [loading, hasMore]);

  const fetchPosts = async (pageNum, reset = false) => {
    try {
      setLoading(true);
      const res = await api.get(`/community/feed?page=${pageNum}&limit=5`);
      
      if (res.data.success) {
        setPosts(prev => reset ? res.data.posts : [...prev, ...res.data.posts]);
        setHasMore(res.data.hasMore);
      }
    } catch (err) {
      console.error('Error fetching feed:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts(page);
  }, [page]);

  const handlePostCreated = (newPost) => {
    // Add new post to top of feed
    setPosts(prev => [newPost, ...prev]);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const refreshFeed = () => {
    setPage(1);
    fetchPosts(1, true);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-8 sticky top-20 z-10 bg-[#0a0a0a]/80 backdrop-blur-md p-4 rounded-2xl border border-slate-800 shadow-xl">
          <div>
            <h1 className="text-2xl font-bold text-white bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-400">
              Community Feed
            </h1>
            <p className="text-slate-400 text-sm">Discover and share travel moments</p>
          </div>
          
          <div className="flex space-x-3">
            <button 
              onClick={refreshFeed}
              disabled={loading}
              className="p-2.5 rounded-xl bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 transition-all disabled:opacity-50"
            >
              <RefreshCw size={20} className={loading && page === 1 ? "animate-spin" : ""} />
            </button>
            <button 
              onClick={() => setIsModalOpen(true)}
              className="flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-2.5 rounded-xl font-medium hover:from-blue-500 hover:to-indigo-500 transition-all shadow-lg shadow-blue-500/20"
            >
              <Camera size={20} />
              <span className="hidden sm:inline">Share</span>
            </button>
          </div>
        </div>

        {/* Feed */}
        <div className="space-y-6">
          {posts.map((post, index) => {
            if (posts.length === index + 1) {
              return (
                <div ref={lastPostElementRef} key={post._id}>
                  <PostCard post={post} />
                </div>
              );
            } else {
              return <PostCard key={post._id} post={post} />;
            }
          })}
          
          {loading && (
            <div className="py-8 flex justify-center">
              <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}
          
          {!hasMore && posts.length > 0 && (
            <div className="py-8 text-center text-slate-500">
              You've reached the end of the feed!
            </div>
          )}
          
          {!loading && posts.length === 0 && (
            <div className="py-20 text-center">
              <div className="w-20 h-20 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4">
                <Camera size={32} className="text-slate-400" />
              </div>
              <h3 className="text-xl font-medium text-white mb-2">No moments yet</h3>
              <p className="text-slate-400">Be the first to share your travel experience!</p>
            </div>
          )}
        </div>

      </div>

      <CreatePostModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onPostCreated={handlePostCreated} 
      />
    </div>
  );
};

export default Community;

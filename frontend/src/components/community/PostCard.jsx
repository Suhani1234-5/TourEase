import React, { useState } from 'react';
import { Heart, MessageCircle, MapPin, Send } from 'lucide-react';
import api from '../../services/api';

const PostCard = ({ post, onLikeToggle }) => {
  const [isLiked, setIsLiked] = useState(post.isLikedByMe);
  const [likesCount, setLikesCount] = useState(post.likesCount);
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState(post.recentComments || []);
  const [newComment, setNewComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleLike = async () => {
    // Optimistic UI update
    const prevLiked = isLiked;
    const prevCount = likesCount;
    
    setIsLiked(!prevLiked);
    setLikesCount(prevLiked ? prevCount - 1 : prevCount + 1);

    try {
      await api.post(`/community/posts/${post._id}/like`);
      if (onLikeToggle) {
         onLikeToggle(post._id, !prevLiked);
      }
    } catch (err) {
      // Revert on failure
      console.error('Failed to toggle like', err);
      setIsLiked(prevLiked);
      setLikesCount(prevCount);
    }
  };

  const loadMoreComments = async () => {
    try {
      const res = await api.get(`/community/posts/${post._id}/comments`);
      if (res.data.success) {
        setComments(res.data.comments);
        setShowComments(true);
      }
    } catch (err) {
      console.error('Failed to load comments', err);
    }
  };

  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    setIsSubmitting(true);
    try {
      const res = await api.post(`/community/posts/${post._id}/comments`, {
        text: newComment
      });
      
      if (res.data.success) {
        setComments([res.data.comment, ...comments]);
        setNewComment('');
        setShowComments(true);
      }
    } catch (err) {
      console.error('Failed to add comment', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-lg transition-transform hover:-translate-y-1 hover:shadow-xl hover:border-slate-700 duration-300">
      {/* Header */}
      <div className="p-4 flex items-center space-x-3">
        <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-500 to-indigo-500 p-0.5 flex-shrink-0">
          <div className="w-full h-full rounded-full overflow-hidden bg-slate-900 flex items-center justify-center">
            {post.author?.avatar ? (
              <img src={post.author.avatar} alt={post.author.name} className="w-full h-full object-cover" />
            ) : (
              <span className="text-white text-sm font-bold">{post.author?.name?.charAt(0) || '?'}</span>
            )}
          </div>
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-white font-semibold truncate">{post.author?.name || 'Traveler'}</p>
          {post.location && (
            <p className="text-slate-400 text-xs flex items-center mt-0.5">
              <MapPin size={12} className="mr-1" />
              {post.location}
            </p>
          )}
        </div>
        <div className="text-slate-500 text-xs">
          {formatDate(post.createdAt)}
        </div>
      </div>

      {/* Image */}
      <div className="aspect-square sm:aspect-video w-full bg-slate-950 overflow-hidden relative group">
        <img 
          src={post.imageUrl} 
          alt={post.caption} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        {/* Double tap to like overlay (could be implemented) */}
      </div>

      {/* Actions */}
      <div className="p-4">
        <div className="flex items-center space-x-4 mb-3">
          <button 
            onClick={handleLike}
            className={`flex items-center space-x-1.5 transition-colors ${isLiked ? 'text-pink-500' : 'text-slate-300 hover:text-white'}`}
          >
            <Heart size={24} className={isLiked ? 'fill-current scale-110 transition-transform' : ''} />
            <span className="font-semibold">{likesCount}</span>
          </button>
          
          <button 
            onClick={() => showComments ? setShowComments(false) : loadMoreComments()}
            className="flex items-center space-x-1.5 text-slate-300 hover:text-white transition-colors"
          >
            <MessageCircle size={24} />
            <span className="font-semibold">{comments.length > 0 ? comments.length : ''}</span>
          </button>
        </div>

        {/* Caption */}
        {post.caption && (
          <div className="mb-3">
            <span className="text-white font-semibold mr-2">{post.author?.name}</span>
            <span className="text-slate-300">{post.caption}</span>
          </div>
        )}

        {/* Comments Section */}
        {comments.length > 0 && !showComments && (
          <button 
            onClick={loadMoreComments}
            className="text-slate-400 text-sm mb-3 hover:text-slate-300"
          >
            View all comments
          </button>
        )}

        {showComments && (
          <div className="space-y-3 mb-4 mt-2 max-h-60 overflow-y-auto custom-scrollbar pr-2">
            {comments.map(comment => (
              <div key={comment._id} className="text-sm">
                <span className="text-white font-semibold mr-2">
                  {comment.commentAuthor?.name || comment.user?.name || 'User'}
                </span>
                <span className="text-slate-300 break-words">{comment.text}</span>
              </div>
            ))}
          </div>
        )}

        {/* Add Comment Input */}
        <form onSubmit={handleAddComment} className="flex items-center mt-2 border-t border-slate-800 pt-3">
          <input 
            type="text" 
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Add a comment..."
            className="flex-1 bg-transparent border-none text-sm text-white placeholder-slate-500 focus:ring-0 outline-none"
          />
          <button 
            type="submit" 
            disabled={!newComment.trim() || isSubmitting}
            className="text-blue-500 font-semibold text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:text-blue-400 transition-colors"
          >
            <Send size={18} />
          </button>
        </form>
      </div>
    </div>
  );
};

export default PostCard;

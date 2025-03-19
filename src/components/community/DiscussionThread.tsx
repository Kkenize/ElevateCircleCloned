import React, { useState } from 'react';
import { MessageSquare, ThumbsUp, Share2 } from 'lucide-react';
import type { Discussion } from '../../utils/discussionsApi';
import { likeDiscussion, addReply } from '../../utils/discussionsApi';
import DiscussionReply from './DiscussionReply';

interface DiscussionThreadProps {
  discussion: Discussion;
  onUpdate: () => void;
}

export default function DiscussionThread({ discussion, onUpdate }: DiscussionThreadProps) {
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [replyContent, setReplyContent] = useState('');
  const [authorName, setAuthorName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const formattedDate = new Date(discussion.created_at).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const handleLike = async () => {
    try {
      await likeDiscussion(discussion.id);
      onUpdate();
    } catch (error) {
      console.error('Error liking discussion:', error);
    }
  };

  const handleSubmitReply = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      if (authorName.trim().length < 2) {
        setError('Please enter your name (minimum 2 characters)');
        return;
      }

      if (replyContent.trim().length < 5) {
        setError('Reply must be at least 5 characters long');
        return;
      }

      await addReply(discussion.id, authorName.trim(), replyContent.trim());
      setReplyContent('');
      setShowReplyForm(false);
      onUpdate();
    } catch (err) {
      setError('Failed to post reply. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="border border-gold-800 rounded-lg p-4 hover:border-gold-600 transition-colors">
      <h3 className="text-lg font-semibold text-white">{discussion.title}</h3>
      <p className="text-sm text-gold-400 mb-2">Posted by {discussion.author_name} on {formattedDate}</p>
      <p className="text-gray-300 mb-4">{discussion.content}</p>
      
      <div className="flex items-center justify-between text-sm mb-4">
        <div className="flex space-x-4">
          <button
            onClick={handleLike}
            className="flex items-center text-gray-400 hover:text-gold-400"
          >
            <ThumbsUp className="h-4 w-4 mr-1" />
            <span>{discussion.likes}</span>
          </button>
          <button
            onClick={() => setShowReplyForm(!showReplyForm)}
            className="flex items-center text-gray-400 hover:text-gold-400"
          >
            <MessageSquare className="h-4 w-4 mr-1" />
            <span>Reply</span>
          </button>
          <button className="flex items-center text-gray-400 hover:text-gold-400">
            <Share2 className="h-4 w-4 mr-1" />
            <span>Share</span>
          </button>
        </div>
      </div>

      {showReplyForm && (
        <form onSubmit={handleSubmitReply} className="mb-4">
          <div className="mb-3">
            <input
              type="text"
              value={authorName}
              onChange={(e) => setAuthorName(e.target.value)}
              placeholder="Your name"
              className="w-full px-4 py-2 bg-black border border-gold-800 rounded-lg text-white placeholder-gold-700 focus:outline-none focus:border-gold-500 focus:ring-2 focus:ring-gold-500/50"
              disabled={isSubmitting}
            />
          </div>
          <div className="mb-3">
            <textarea
              value={replyContent}
              onChange={(e) => setReplyContent(e.target.value)}
              placeholder="Write your reply..."
              rows={3}
              className="w-full px-4 py-2 bg-black border border-gold-800 rounded-lg text-white placeholder-gold-700 focus:outline-none focus:border-gold-500 focus:ring-2 focus:ring-gold-500/50"
              disabled={isSubmitting}
            />
          </div>
          {error && <p className="text-red-500 text-sm mb-3">{error}</p>}
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setShowReplyForm(false)}
              className="px-4 py-2 text-gold-400 hover:text-gold-300"
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-4 py-2 bg-gold-500 text-black rounded-lg hover:bg-gold-400 transition-colors font-semibold disabled:opacity-50"
            >
              {isSubmitting ? 'Posting...' : 'Post Reply'}
            </button>
          </div>
        </form>
      )}

      {discussion.replies && discussion.replies.length > 0 && (
        <div className="mt-6 space-y-4">
          {discussion.replies.map((reply) => (
            <DiscussionReply key={reply.id} reply={reply} />
          ))}
        </div>
      )}
    </div>
  );
}
import React, { useState } from 'react';
import { X } from 'lucide-react';
import { supabase } from '../../utils/supabase';

interface CreateDiscussionFormProps {
  onClose: () => void;
  onSuccess: () => void;
}

export default function CreateDiscussionForm({ onClose, onSuccess }: CreateDiscussionFormProps) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [authorName, setAuthorName] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Basic content moderation
  const forbiddenWords = ["badword1", "badword2", "inappropriate"];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      // Validate author name
      if (authorName.trim().length < 2) {
        setError('Please enter your name (minimum 2 characters)');
        setIsSubmitting(false);
        return;
      }

      // Validate title
      if (title.trim().length < 5) {
        setError('Title must be at least 5 characters long');
        setIsSubmitting(false);
        return;
      }

      // Validate content
      if (content.trim().length < 20) {
        setError('Content must be at least 20 characters long');
        setIsSubmitting(false);
        return;
      }

      // Content moderation
      const hasForbiddenWords = forbiddenWords.some(word =>
        content.toLowerCase().includes(word) || title.toLowerCase().includes(word)
      );

      if (hasForbiddenWords) {
        setError('Post contains inappropriate language.');
        setIsSubmitting(false);
        return;
      }

      // Insert discussion into database
      const { error: supabaseError } = await supabase
        .from('discussions')
        .insert([{
          author_name: authorName.trim(),
          title: title.trim(),
          content: content.trim(),
          flagged: false,
          likes: 0
        }]);

      if (supabaseError) {
        throw supabaseError;
      }

      // Success
      onSuccess();
      onClose();
    } catch (err) {
      console.error('Error creating discussion:', err);
      setError('An error occurred while creating the discussion. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-black border border-gold-800 rounded-lg p-6 max-w-2xl w-full relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gold-400 hover:text-gold-300 transition-colors"
        >
          <X className="h-6 w-6" />
        </button>

        <h2 className="text-2xl font-bold text-gold-500 mb-6">Create New Discussion</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="authorName" className="block text-sm font-medium text-gold-400 mb-1">
              Your Name
            </label>
            <input
              type="text"
              id="authorName"
              value={authorName}
              onChange={(e) => setAuthorName(e.target.value)}
              className="w-full px-4 py-2 bg-black border border-gold-800 rounded-lg text-white placeholder-gold-700 focus:outline-none focus:border-gold-500 focus:ring-2 focus:ring-gold-500/50"
              placeholder="Enter your name"
              disabled={isSubmitting}
            />
          </div>

          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gold-400 mb-1">
              Title
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-2 bg-black border border-gold-800 rounded-lg text-white placeholder-gold-700 focus:outline-none focus:border-gold-500 focus:ring-2 focus:ring-gold-500/50"
              placeholder="Enter a descriptive title"
              disabled={isSubmitting}
            />
          </div>

          <div>
            <label htmlFor="content" className="block text-sm font-medium text-gold-400 mb-1">
              Content
            </label>
            <textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={6}
              className="w-full px-4 py-2 bg-black border border-gold-800 rounded-lg text-white placeholder-gold-700 focus:outline-none focus:border-gold-500 focus:ring-2 focus:ring-gold-500/50"
              placeholder="Share your thoughts, questions, or insights..."
              disabled={isSubmitting}
            />
          </div>

          {error && (
            <p className="text-red-500 text-sm">{error}</p>
          )}

          <div className="flex justify-end pt-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2 bg-gold-500 text-black rounded-lg hover:bg-gold-400 transition-colors font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Creating...' : 'Create Discussion'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
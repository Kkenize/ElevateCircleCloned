import React, { useState, useEffect } from 'react';
import DiscussionThread from '../components/community/DiscussionThread';
import CreateDiscussionForm from '../components/community/CreateDiscussionForm';
import LiveEventSection from '../components/community/LiveEventSection';
import SectionHeader from '../components/ui/SectionHeader';
import { fetchDiscussions, type Discussion } from '../utils/discussionsApi';
import { PlusCircle } from 'lucide-react';

export default function CommunityPage() {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [discussions, setDiscussions] = useState<Discussion[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const loadDiscussions = async () => {
    try {
      setLoading(true);
      const data = await fetchDiscussions();
      setDiscussions(data);
      setError('');
    } catch (err) {
      console.error('Error loading discussions:', err);
      setError('Failed to load discussions. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDiscussions();
  }, []);

  return (
    <div className="py-12 bg-black min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          title="Community Hub"
          description="Connect, collaborate, and grow with peers"
          light
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Live Event Section */}
          <LiveEventSection />

          {/* Discussions Section */}
          <div className="lg:col-span-2">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-gold-500">Discussions</h2>
              <button
                onClick={() => setShowCreateForm(true)}
                className="flex items-center px-4 py-2 bg-gold-500 text-black rounded-lg hover:bg-gold-400 transition-colors font-semibold"
              >
                <PlusCircle className="h-5 w-5 mr-2" />
                New Post
              </button>
            </div>

            {loading ? (
              <div className="text-gold-400 text-center py-8">Loading discussions...</div>
            ) : error ? (
              <div className="text-red-500 text-center py-8">{error}</div>
            ) : discussions.length > 0 ? (
              <div className="space-y-4">
                {discussions.map(discussion => (
                  <DiscussionThread
                    key={discussion.id}
                    discussion={discussion}
                    onUpdate={loadDiscussions}
                  />
                ))}
              </div>
            ) : (
              <div className="text-gold-400 text-center py-8">
                No discussions yet. Be the first to start a conversation!
              </div>
            )}
          </div>
        </div>

        {showCreateForm && (
          <CreateDiscussionForm
            onClose={() => setShowCreateForm(false)}
            onSuccess={loadDiscussions}
          />
        )}
      </div>
    </div>
  );
}
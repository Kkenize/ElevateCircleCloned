import React from 'react';
import VideoCard from '../ui/VideoCard';
import SectionHeader from '../ui/SectionHeader';

const featuredVideos = [
  {
    id: '1',
    title: 'Breaking into Tech as a Self-Taught Developer',
    expert: 'Sarah Chen, Senior Engineer at Google',
    duration: '45 minutes',
    tags: ['Tech', 'Career Change', 'Software Development'],
    thumbnail: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=1600',
  },
  {
    id: '2',
    title: 'Building a Successful Startup from Scratch',
    expert: 'Michael Rodriguez, Founder & CEO',
    duration: '38 minutes',
    tags: ['Entrepreneurship', 'Startups', 'Leadership'],
    thumbnail: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&q=80&w=1600',
  },
  {
    id: '3',
    title: 'Navigating Your First Year in Finance',
    expert: 'Emily Wong, Investment Banker',
    duration: '42 minutes',
    tags: ['Finance', 'Career Tips', 'Banking'],
    thumbnail: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=1600',
  },
];

export default function FeaturedSection() {
  return (
    <section className="py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          title="Featured This Week"
          description="Trending interviews and most-watched content from our community."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredVideos.map((video) => (
            <VideoCard key={video.id} video={video} />
          ))}
        </div>
      </div>
    </section>
  );
}
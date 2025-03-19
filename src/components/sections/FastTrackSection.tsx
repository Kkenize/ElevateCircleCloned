import React from 'react';
import VideoGrid from '../ui/VideoGrid';
import SectionHeader from '../ui/SectionHeader';

const fastTrackVideos = [
  {
    id: '1',
    title: 'Resume Writing Tips That Get You Noticed',
    expert: 'David Miller, HR Director',
    duration: '4 minutes',
    tags: ['Resume', 'Job Search', 'Career Tips'],
    thumbnail: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&q=80&w=1600',
  },
  // Add more fast track videos...
];

export default function FastTrackSection() {
  return (
    <section className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          title="Fast Track"
          description="Quick, actionable advice to help you level up specific career skills."
        />
        <VideoGrid videos={fastTrackVideos} />
      </div>
    </section>
  );
}
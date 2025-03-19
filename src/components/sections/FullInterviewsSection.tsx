import React from 'react';
import VideoGrid from '../ui/VideoGrid';
import SectionHeader from '../ui/SectionHeader';

const interviews = [
  {
    id: '1',
    title: 'From College to Silicon Valley',
    expert: 'James Wilson, Product Manager at Apple',
    duration: '42 minutes',
    tags: ['Tech', 'Product Management', 'Career Growth'],
    thumbnail: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=1600',
  },
  // Add more interviews...
];

export default function FullInterviewsSection() {
  return (
    <section className="py-12 bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          title="Full Interviews"
          description="In-depth conversations with industry leaders sharing their journey, insights, and advice."
          light
        />
        <VideoGrid videos={interviews} />
      </div>
    </section>
  );
}
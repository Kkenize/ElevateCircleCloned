import React from 'react';
import VideoCard from '../components/ui/VideoCard';
import SectionHeader from '../components/ui/SectionHeader';

const fastTrackVideos = [
  {
    id: '1',
    title: 'Key Leadership Traits for Scaling Your Company',
    expert: 'Kevin Moran, Co-Founder of Beam & Former MLB Pitcher',
    duration: '2.5 minutes',
    tags: ['Leadership', 'Business Growth', 'Team Building'],
    thumbnail: 'https://i.ytimg.com/vi/kcYzAxIqpXA/maxresdefault.jpg',
    videoUrl: 'https://youtu.be/kcYzAxIqpXA'
  },
  {
    id: '2',
    title: 'Embracing Challenge: Growth Through Adversity',
    expert: 'Fabia Maramotti, International Business Expert & Ultra-Cyclist',
    duration: '3 minutes',
    tags: ['Personal Growth', 'Mindset', 'Resilience'],
    thumbnail: 'https://i.ytimg.com/vi/0TdFd99_MMo/maxresdefault.jpg',
    videoUrl: 'https://youtu.be/0TdFd99_MMo'
  },
  {
    id: '3',
    title: 'Building Long-Term Success Through Job Loyalty',
    expert: 'Jake Seau, Pre Construction Manager',
    duration: '7 minutes',
    tags: ['Career Growth', 'Real Estate', 'Professional Development'],
    thumbnail: 'https://i.ytimg.com/vi/LQdJ7P4EkVM/maxresdefault.jpg',
    videoUrl: 'https://youtu.be/LQdJ7P4EkVM'
  },
  {
    id: '4',
    title: 'Overcoming Burnout: Lessons from Investment Banking',
    expert: 'Andrew Stranick, Managing Partner at Bloom Ventures',
    duration: '6.5 minutes',
    tags: ['Mental Health', 'Career Growth', 'Work-Life Balance'],
    thumbnail: 'https://i.ytimg.com/vi/jQqbmg8-nI8/maxresdefault.jpg',
    videoUrl: 'https://youtu.be/jQqbmg8-nI8'
  },
  {
    id: '5',
    title: 'Building Mental Resilience: Bouncing Back from Setbacks',
    expert: 'Ray Santiago, Sports Psychologist',
    duration: '4.5 minutes',
    tags: ['Mental Health', 'Resilience', 'Psychology'],
    thumbnail: 'https://i.ytimg.com/vi/qn8Omgq1H0I/maxresdefault.jpg',
    videoUrl: 'https://youtu.be/qn8Omgq1H0I'
  },
  {
    id: '6',
    title: 'Common Startup Mistakes and How to Avoid Them',
    expert: 'Frank Golden, Founder of Golden Ventures',
    duration: '1.5 minutes',
    tags: ['Startups', 'Entrepreneurship', 'Business Strategy'],
    thumbnail: 'https://i.ytimg.com/vi/EUKoeznZhMA/maxresdefault.jpg',
    videoUrl: 'https://youtu.be/EUKoeznZhMA'
  },
  {
    id: '7',
    title: 'Understanding Crypto Investment: A Predictable Approach',
    expert: 'Casey Caruso, Managing Partner at Topology Ventures',
    duration: '2.5 minutes',
    tags: ['Crypto', 'Investment', 'Finance', 'Risk Management'],
    thumbnail: 'https://i.ytimg.com/vi/ORU_di0PM2U/maxresdefault.jpg',
    videoUrl: 'https://youtu.be/ORU_di0PM2U'
  },
  {
    id: '8',
    title: 'Building Relationships in Sports Business',
    expert: 'Brad Blank, NFL Sports Agent',
    duration: '3.5 minutes',
    tags: ['Sports Business', 'Networking', 'Relationship Building', 'Professional Development'],
    thumbnail: 'https://i.ytimg.com/vi/hwsICZtnoqE/maxresdefault.jpg',
    videoUrl: 'https://youtu.be/hwsICZtnoqE'
  },
  {
    id: '9',
    title: 'Keys to Successful Entrepreneurship',
    expert: 'Christian Nicholson, Founder of ZypRun',
    duration: '2 minutes',
    tags: ['Entrepreneurship', 'Startups', 'Leadership', 'Business Strategy'],
    thumbnail: 'https://i.ytimg.com/vi/NmZaIBLMcCU/maxresdefault.jpg',
    videoUrl: 'https://youtube.com/shorts/NmZaIBLMcCU'
  }
];

export default function FastTrackPage() {
  const handleVideoClick = (videoUrl?: string) => {
    if (videoUrl && videoUrl !== '#') {
      window.open(videoUrl, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div className="bg-black min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          title="Fast Track"
          description="Quick, actionable advice to help you level up specific career skills."
          light
        />

        {/* Trending Now */}
        <div className="mb-12">
          <h2 className="text-xl font-semibold text-gold-500 mb-6">Trending Now</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {fastTrackVideos.slice(0, 3).map((video) => (
              <div 
                key={video.id}
                onClick={() => handleVideoClick(video.videoUrl)}
                className="cursor-pointer"
              >
                <VideoCard key={video.id} video={video} />
              </div>
            ))}
          </div>
        </div>

        {/* Latest Videos */}
        <div>
          <h2 className="text-xl font-semibold text-gold-500 mb-6">Latest Videos</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {fastTrackVideos.map((video) => (
              <div 
                key={video.id}
                onClick={() => handleVideoClick(video.videoUrl)}
                className="cursor-pointer"
              >
                <VideoCard key={video.id} video={video} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
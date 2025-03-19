import React from 'react';
import VideoCard from '../components/ui/VideoCard';
import SectionHeader from '../components/ui/SectionHeader';

const interviews = [
  {
    id: '1',
    title: 'Venture Capital, Programming & Crypto Investment',
    expert: 'Casey Caruso, Managing Partner at Topology Ventures',
    duration: '34 minutes',
    tags: ['Venture Capital', 'Programming', 'Crypto', 'Investment'],
    thumbnail: 'https://i.imgur.com/p2DsKRw.png',
    videoUrl: 'https://youtu.be/tY-DEv9t1u8'
  },
  {
    id: '2',
    title: 'Entrepreneurship, Founding Companies, and Building Teams',
    expert: 'Christian Nicholson, Founder of ZypRun',
    duration: '29 minutes',
    tags: ['Entrepreneurship', 'Leadership', 'Startups', 'Team Building'],
    thumbnail: 'https://i.ytimg.com/vi/z8S70Jh2o1o/maxresdefault.jpg',
    videoUrl: 'https://youtu.be/z8S70Jh2o1o'
  },
  {
    id: '3',
    title: 'Sports Agency, Sports Business, Business Law',
    expert: 'Brad Blank, NFL Sports Agent ($1.2B Contracts Negotiated)',
    duration: '38 minutes',
    tags: ['Sports Business', 'Law', 'Negotiation', 'Career Growth'],
    thumbnail: 'https://i.ytimg.com/vi/7U8oNBEnaRY/maxresdefault.jpg',
    videoUrl: 'https://youtu.be/7U8oNBEnaRY'
  },
  {
    id: '4',
    title: 'Startups, Consulting & Early Stage Business Growth',
    expert: 'Frank Golden, Founder of Golden Ventures',
    duration: '27 minutes',
    tags: ['Startups', 'Consulting', 'Angel Investing', 'Business Growth'],
    thumbnail: 'https://i.ytimg.com/vi/x0XFa1nYAVM/maxresdefault.jpg',
    videoUrl: 'https://youtu.be/x0XFa1nYAVM'
  },
  {
    id: '5',
    title: 'Commercial Real Estate, Career Development & The Killer Mindset',
    expert: 'Jake Seau, Pre Construction Manager',
    duration: '49 minutes',
    tags: ['Real Estate', 'Career Development', 'Mindset', 'Construction'],
    thumbnail: 'https://i.ytimg.com/vi/Fd2yehj1aOE/maxresdefault.jpg',
    videoUrl: 'https://youtu.be/Fd2yehj1aOE'
  },
  {
    id: '6',
    title: 'Growth Mindset, Breaking Social Norms & International Business',
    expert: 'Fabia Maramotti, International Business Expert & Ultra-Cyclist',
    duration: '36 minutes',
    tags: ['International Business', 'Growth Mindset', 'Leadership', 'Achievement'],
    thumbnail: 'https://i.ytimg.com/vi/z8qZjfYZsDs/maxresdefault.jpg',
    videoUrl: 'https://youtu.be/z8qZjfYZsDs'
  },
  {
    id: '7',
    title: 'Starting a Company & Career Transitions',
    expert: 'Kevin Moran, Co-Founder of Beam & Former MLB Pitcher',
    duration: '26 minutes',
    tags: ['Entrepreneurship', 'Career Transitions', 'Sports', 'Mindset'],
    thumbnail: 'https://i.ytimg.com/vi/fMohRNGbxG8/maxresdefault.jpg',
    videoUrl: 'https://youtu.be/fMohRNGbxG8'
  },
  {
    id: '8',
    title: 'Career Development, High Motor Lifestyle & Successful Life Principles',
    expert: 'Andrew Stranick, Managing Partner at Bloom Ventures',
    duration: '49 minutes',
    tags: ['Career Development', 'Life Principles', 'Success', 'Leadership'],
    thumbnail: 'https://i.ytimg.com/vi/xOvDe178Fzs/maxresdefault.jpg',
    videoUrl: 'https://youtu.be/xOvDe178Fzs'
  },
  {
    id: '9',
    title: 'Psychological Stress, Overcoming Setbacks & High Pressure Performance',
    expert: 'Ray Santiago, Sports Psychologist',
    duration: '45 minutes',
    tags: ['Psychology', 'Sports', 'Mental Health', 'Performance'],
    thumbnail: 'https://i.ytimg.com/vi/gx6Sod0c0yU/maxresdefault.jpg',
    videoUrl: 'https://youtu.be/gx6Sod0c0yU'
  },
  {
    id: '10',
    title: 'Sales, GTM Strategies & The Startup Ecosystem',
    expert: 'Nicholas Casale, VP of Sales at Airops',
    duration: '43 minutes',
    tags: ['Sales', 'GTM Strategy', 'Startups', 'Business Growth'],
    thumbnail: 'https://i.ytimg.com/vi/40D-MZUEmTs/maxresdefault.jpg',
    videoUrl: 'https://youtu.be/40D-MZUEmTs'
  },
  {
    id: '11',
    title: 'Training, Health Optimization & High Performance Mental Resilience',
    expert: 'Ray Bailey, Professional Powerlifter & Trainer',
    duration: '19 minutes',
    tags: ['Fitness', 'Mental Health', 'Performance', 'Training'],
    thumbnail: 'https://i.ytimg.com/vi/fcv9P9J0NC0/maxresdefault.jpg',
    videoUrl: 'https://youtu.be/fcv9P9J0NC0'
  }
];

export default function FullInterviewsPage() {
  const handleVideoClick = (videoUrl: string) => {
    if (videoUrl && videoUrl !== '#') {
      window.open(videoUrl, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div className="bg-black min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          title="Full Interviews"
          description="In-depth conversations with industry leaders sharing their journey, insights, and advice."
          light
        />

        {/* Featured Interviews */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {interviews.map((video) => (
            <div 
              key={video.id} 
              onClick={() => handleVideoClick(video.videoUrl)}
              className="cursor-pointer"
            >
              <VideoCard video={video} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
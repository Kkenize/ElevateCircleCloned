import React from 'react';
import VideoCard from './VideoCard';

interface Video {
  id: string;
  title: string;
  expert: string;
  duration: string;
  tags: string[];
  thumbnail: string;
}

interface VideoGridProps {
  videos: Video[];
}

export default function VideoGrid({ videos }: VideoGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {videos.map((video) => (
        <VideoCard key={video.id} video={video} />
      ))}
    </div>
  );
}
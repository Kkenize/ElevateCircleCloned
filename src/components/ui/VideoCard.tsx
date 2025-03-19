import React from 'react';
import { Play, Clock, Tag } from 'lucide-react';

interface Video {
  id: string;
  title: string;
  expert: string;
  duration: string;
  tags: string[];
  thumbnail: string;
  videoUrl?: string;
}

interface VideoCardProps {
  video: Video;
}

export default function VideoCard({ video }: VideoCardProps) {
  return (
    <div className="bg-black border border-gold-800 rounded-lg overflow-hidden hover:border-gold-600 transition-all duration-300 hover:transform hover:scale-[1.02]">
      <div className="relative aspect-video">
        <img 
          src={video.thumbnail}
          alt={video.title}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-30 hover:bg-opacity-20 transition-opacity duration-200 flex items-center justify-center">
          <Play className="h-12 w-12 text-white opacity-80 hover:opacity-100 transition-opacity" />
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-lg mb-2 text-white">{video.title}</h3>
        <p className="text-gold-400 mb-3">with {video.expert}</p>
        <div className="flex items-center text-sm text-gray-400 mb-3">
          <Clock className="h-4 w-4 mr-1" />
          <span>{video.duration}</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {video.tags.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gold-900 text-gold-300"
            >
              <Tag className="h-3 w-3 mr-1" />
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
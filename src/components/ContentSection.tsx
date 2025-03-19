import React from 'react';
import { Play, Clock, Tag } from 'lucide-react';

interface Video {
  id: string;
  title: string;
  expert: string;
  duration: string;
  tags: string[];
  thumbnail: string;
}

interface ContentSectionProps {
  title: string;
  description: string;
  videos: Video[];
}

export default function ContentSection({ title, description, videos }: ContentSectionProps) {
  return (
    <section className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">{title}</h2>
        <p className="text-lg text-gray-600 mb-8">{description}</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {videos.map((video) => (
            <div key={video.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="relative">
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-full h-48 object-cover"
                />
                <button className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 hover:bg-opacity-50 transition-opacity duration-200">
                  <Play className="h-12 w-12 text-white" />
                </button>
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-lg mb-2">{video.title}</h3>
                <p className="text-gray-600 mb-3">with {video.expert}</p>
                <div className="flex items-center text-sm text-gray-500 mb-3">
                  <Clock className="h-4 w-4 mr-1" />
                  <span>{video.duration}</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {video.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800"
                    >
                      <Tag className="h-3 w-3 mr-1" />
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
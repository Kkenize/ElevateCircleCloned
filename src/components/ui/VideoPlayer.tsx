import React from 'react';
import { Play, Maximize2, Volume2 } from 'lucide-react';

interface VideoPlayerProps {
  videoId: string;
  title: string;
  onEngagement?: (type: 'view' | 'complete' | 'share') => void;
}

export default function VideoPlayer({ videoId, title, onEngagement }: VideoPlayerProps) {
  return (
    <div className="relative aspect-video bg-black rounded-lg overflow-hidden">
      <iframe
        src={`https://www.youtube.com/embed/${videoId}`}
        title={title}
        className="absolute inset-0 w-full h-full"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        onLoad={() => onEngagement?.('view')}
      />
      
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
        <div className="flex items-center justify-between text-white">
          <div className="flex items-center space-x-4">
            <button className="p-2 hover:bg-white/20 rounded-full transition-colors">
              <Play className="h-5 w-5" />
            </button>
            <button className="p-2 hover:bg-white/20 rounded-full transition-colors">
              <Volume2 className="h-5 w-5" />
            </button>
          </div>
          <button className="p-2 hover:bg-white/20 rounded-full transition-colors">
            <Maximize2 className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
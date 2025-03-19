import React from 'react';
import { Users, Calendar, MapPin } from 'lucide-react';

interface Workshop {
  id: string;
  title: string;
  organizer: string;
  date: string;
  type: string;
  participants: number;
  description: string;
}

interface WorkshopCardProps {
  workshop: Workshop;
}

export default function WorkshopCard({ workshop }: WorkshopCardProps) {
  return (
    <div className="border border-gold-800 rounded-lg p-4 hover:border-gold-600 transition-colors">
      <h3 className="text-lg font-semibold text-white">{workshop.title}</h3>
      <p className="text-gray-300 text-sm mb-3">{workshop.description}</p>
      
      <div className="flex items-center justify-between text-sm text-gray-400">
        <div className="flex items-center">
          <Users className="h-4 w-4 mr-1" />
          <span>{workshop.participants} interested</span>
        </div>
        <div className="flex items-center">
          <Calendar className="h-4 w-4 mr-1" />
          <span>{workshop.date}</span>
        </div>
        <div className="flex items-center">
          <MapPin className="h-4 w-4 mr-1" />
          <span>{workshop.type}</span>
        </div>
      </div>
    </div>
  );
}
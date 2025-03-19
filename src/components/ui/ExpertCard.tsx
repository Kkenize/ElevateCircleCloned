import React from 'react';
import { LinkedinIcon } from 'lucide-react';

interface Expert {
  id: string;
  name: string;
  role: string;
  company: string;
  expertise: string[];
  image: string;
  bio: string;
  linkedinUrl?: string;
}

interface ExpertCardProps {
  expert: Expert;
}

export default function ExpertCard({ expert }: ExpertCardProps) {
  const handleLinkedInClick = () => {
    if (expert.linkedinUrl) {
      window.open(expert.linkedinUrl, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div className="bg-black border border-gold-800 rounded-lg overflow-hidden hover:border-gold-600 transition-colors">
      <div className="relative h-48">
        <img
          src={expert.image}
          alt={expert.name}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold text-white">{expert.name}</h3>
        <p className="text-gold-400 font-medium">{expert.role}</p>
        <p className="text-gray-400 mb-4">{expert.company}</p>
        <p className="text-gray-300 mb-4">{expert.bio}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {expert.expertise.map((skill) => (
            <span
              key={skill}
              className="px-2 py-1 bg-gold-900 text-gold-300 rounded-full text-sm"
            >
              {skill}
            </span>
          ))}
        </div>
        <div className="flex justify-end">
          <button 
            onClick={handleLinkedInClick}
            className={`flex items-center gap-2 px-4 py-2 border border-gold-500 text-gold-500 rounded-lg hover:bg-gold-900 transition-colors ${
              !expert.linkedinUrl ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            disabled={!expert.linkedinUrl}
          >
            <LinkedinIcon className="h-4 w-4" />
            LinkedIn
          </button>
        </div>
      </div>
    </div>
  );
}
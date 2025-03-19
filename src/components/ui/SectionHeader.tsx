import React from 'react';

interface SectionHeaderProps {
  title: string;
  description: string;
  light?: boolean;
}

export default function SectionHeader({ title, description, light }: SectionHeaderProps) {
  return (
    <div className="text-center mb-12">
      <h2 className={`text-4xl font-bold mb-4 ${light ? 'text-white' : 'text-gold-500'}`}>
        {title}
      </h2>
      <p className={`text-lg max-w-2xl mx-auto ${light ? 'text-gray-300' : 'text-gold-300'}`}>
        {description}
      </p>
    </div>
  );
}
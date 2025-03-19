import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

interface SectionLinkProps {
  title: string;
  description: string;
  path: string;
  image: string;
}

export default function SectionLink({ title, description, path, image }: SectionLinkProps) {
  return (
    <Link
      to={path}
      className="group relative overflow-hidden rounded-lg aspect-video"
    >
      <img
        src={image}
        alt={title}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-black bg-opacity-50 transition-opacity duration-300 group-hover:bg-opacity-40" />
      <div className="absolute inset-0 p-6 flex flex-col justify-end">
        <h3 className="text-2xl font-bold text-white mb-2">{title}</h3>
        <p className="text-gray-200 mb-4">{description}</p>
        <div className="flex items-center text-gold-300">
          <span>Explore</span>
          <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-2" />
        </div>
      </div>
    </Link>
  );
}
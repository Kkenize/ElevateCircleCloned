import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

interface CategoryLinkProps {
  title: string;
  description: string;
  path: string;
  image: string;
}

export default function CategoryLink({ title, description, path, image }: CategoryLinkProps) {
  return (
    <Link
      to={path}
      className="group relative overflow-hidden rounded-lg h-64 hover:transform hover:scale-[1.02] transition-all duration-300"
    >
      <img
        src={image}
        alt={title}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-black bg-opacity-60 transition-opacity duration-300 group-hover:bg-opacity-50" />
      <div className="absolute inset-0 flex flex-col justify-end">
        <div className="p-8 pt-24">
          <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3 break-words">
            {title}
          </h3>
          <p className="text-base sm:text-lg text-gray-200 mb-4">
            {description}
          </p>
          <div className="flex items-center text-gold-300 group-hover:text-gold-400 transition-colors">
            <span className="text-lg">Explore</span>
            <ArrowRight className="ml-2 h-6 w-6 transition-transform duration-300 group-hover:translate-x-2" />
          </div>
        </div>
      </div>
    </Link>
  );
}
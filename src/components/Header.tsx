import React, { useState } from 'react';
import { CircleUserRound, Menu, Search } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

export default function Header() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <header className="bg-black border-b border-gold-800 fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-bold text-gold-500 hover:text-gold-400 transition-colors">
              ElevateCircle
            </Link>
          </div>
          
          <div className="flex-1 max-w-2xl mx-8">
            <form onSubmit={handleSearch} className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search by keyword, industry, or topic..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-black border border-gold-800 rounded-full text-white focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-transparent"
              />
              <button
                type="submit"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gold-500 hover:text-gold-400"
              >
                Search
              </button>
            </form>
          </div>

          <div className="flex items-center space-x-4">
            <button 
              onClick={() => navigate('/')} 
              className="text-gold-500 hover:text-gold-400 transition-colors"
              aria-label="Home"
            >
              <Menu className="h-6 w-6" />
            </button>
            <button 
              className="text-gold-500 hover:text-gold-400 transition-colors"
              aria-label="Profile"
            >
              <CircleUserRound className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
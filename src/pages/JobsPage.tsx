import React, { useState } from 'react';
import { Briefcase, Building2, MapPin, Clock, Search, Filter } from 'lucide-react';
import SectionHeader from '../components/ui/SectionHeader';

const jobs = [
  {
    id: '1',
    title: 'Software Engineer',
    company: 'Google',
    location: 'Mountain View, CA',
    type: 'Full-time',
    posted: '2 days ago',
    description: 'Join our team to build next-generation cloud infrastructure...',
    requirements: ['5+ years experience', 'BS in Computer Science', 'Cloud expertise'],
    industry: 'Technology'
  },
  {
    id: '2',
    title: 'Investment Banking Analyst',
    company: 'Goldman Sachs',
    location: 'New York, NY',
    type: 'Full-time',
    posted: '1 day ago',
    description: 'Looking for ambitious analysts to join our M&A team...',
    requirements: ['Bachelor\'s degree', 'Strong analytical skills', 'Financial modeling'],
    industry: 'Finance'
  },
  {
    id: '3',
    title: 'Product Manager',
    company: 'Apple',
    location: 'Cupertino, CA',
    type: 'Full-time',
    posted: '3 days ago',
    description: 'Lead product development for innovative consumer technologies...',
    requirements: ['3+ years PM experience', 'Technical background', 'MBA preferred'],
    industry: 'Technology'
  }
];

const filters = {
  industries: ['Technology', 'Finance', 'Healthcare', 'Retail'],
  types: ['Full-time', 'Part-time', 'Contract', 'Internship'],
  locations: ['Remote', 'San Francisco', 'New York', 'London']
};

export default function JobsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  return (
    <div className="bg-black min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          title="Jobs & Internships"
          description="Discover opportunities aligned with your career goals"
          light
        />

        {/* Search and Filters */}
        <div className="mb-8">
          <div className="flex gap-4 mb-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search jobs by title, company, or keyword..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-black border border-gold-800 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-transparent"
              />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center px-4 py-2 bg-gold-900 text-gold-300 rounded-lg hover:bg-gold-800 transition-colors"
            >
              <Filter className="h-5 w-5 mr-2" />
              Filters
            </button>
          </div>

          {showFilters && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-black border border-gold-800 rounded-lg">
              {Object.entries(filters).map(([category, options]) => (
                <div key={category}>
                  <h3 className="text-gold-500 font-medium mb-2 capitalize">{category}</h3>
                  <div className="space-y-2">
                    {options.map((option) => (
                      <label key={option} className="flex items-center text-gold-300">
                        <input type="checkbox" className="mr-2" />
                        {option}
                      </label>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Featured Jobs */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gold-500 mb-4">Featured Opportunities</h2>
          <div className="grid grid-cols-1 gap-6">
            {jobs.map((job) => (
              <div
                key={job.id}
                className="bg-black border border-gold-800 rounded-lg p-6 hover:border-gold-600 transition-all duration-300 hover:transform hover:scale-[1.01]"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-bold text-gold-500">{job.title}</h3>
                    <div className="flex items-center text-gold-300 mt-1">
                      <Building2 className="h-4 w-4 mr-1" />
                      <span>{job.company}</span>
                    </div>
                  </div>
                  <span className="px-3 py-1 bg-gold-900 text-gold-300 rounded-full text-sm">
                    {job.industry}
                  </span>
                </div>

                <div className="mt-4 flex items-center space-x-4 text-gold-400">
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span>{job.location}</span>
                  </div>
                  <div className="flex items-center">
                    <Briefcase className="h-4 w-4 mr-1" />
                    <span>{job.type}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    <span>{job.posted}</span>
                  </div>
                </div>

                <p className="mt-4 text-gold-300">{job.description}</p>

                <div className="mt-4">
                  <h4 className="font-semibold text-gold-400">Requirements:</h4>
                  <ul className="mt-2 list-disc list-inside text-gold-300">
                    {job.requirements.map((req, index) => (
                      <li key={index}>{req}</li>
                    ))}
                  </ul>
                </div>

                <div className="mt-6 flex gap-4">
                  <button className="flex-1 bg-gold-500 text-black py-2 px-4 rounded-lg hover:bg-gold-400 transition-colors font-semibold">
                    Apply Now
                  </button>
                  <button className="px-4 py-2 border border-gold-500 text-gold-500 rounded-lg hover:bg-gold-900 transition-colors">
                    Save Job
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
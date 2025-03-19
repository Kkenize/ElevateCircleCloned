import React from 'react';
import { useLocation } from 'react-router-dom';
import VideoCard from '../components/ui/VideoCard';
import SectionHeader from '../components/ui/SectionHeader';
import { searchAllContent } from '../utils/search';

export default function SearchResultsPage() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get('q') || '';
  
  const results = searchAllContent(query);
  const topResults = results.slice(0, 3);
  const otherResults = results.slice(3);

  return (
    <div className="bg-black min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          title={`Search Results for "${query}"`}
          description={`Found ${results.length} results`}
          light
        />

        {/* Top Results */}
        {topResults.length > 0 && (
          <div className="mb-12">
            <h2 className="text-xl font-semibold text-gold-500 mb-6">Most Relevant Results</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {topResults.map((result) => (
                <div key={result.id} className="relative">
                  <div className="absolute -top-2 left-4 px-3 py-1 bg-gold-500 text-black rounded-full text-sm font-semibold z-10">
                    Top Match
                  </div>
                  <VideoCard video={result} />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Other Results */}
        {otherResults.length > 0 && (
          <div>
            <h2 className="text-xl font-semibold text-gold-500 mb-6">More Results</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {otherResults.map((result) => (
                <VideoCard key={result.id} video={result} />
              ))}
            </div>
          </div>
        )}

        {results.length === 0 && (
          <div className="text-center py-12">
            <div className="bg-black border border-gold-800 rounded-lg p-8 max-w-2xl mx-auto">
              <h3 className="text-xl font-semibold text-gold-500 mb-4">No Results Found</h3>
              <p className="text-gold-300 mb-6">
                We couldn't find any matches for "{query}". Try:
              </p>
              <ul className="text-gold-400 text-left list-disc list-inside space-y-2">
                <li>Checking your spelling</li>
                <li>Using more general keywords</li>
                <li>Browsing our categories instead</li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
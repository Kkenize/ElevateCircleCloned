import React, { useState } from 'react';
import { ExternalLink } from 'lucide-react';
import SectionHeader from '../components/ui/SectionHeader';

export default function ResumePage() {
  const [isLoading, setIsLoading] = useState(false);

  const handleViewTemplate = () => {
    setIsLoading(true);
    
    // Open in new tab
    const newWindow = window.open('https://docs.google.com/document/d/187OmiOSZiJzPkfXD6o6KirPaxiIiGiwF/edit?usp=sharing&ouid=116336157260158407720&rtpof=true&sd=true', '_blank', 'noopener,noreferrer');
    
    // Check if popup was blocked
    if (newWindow === null) {
      alert('The template link was blocked by your browser. Please allow popups for this site.');
    }
    
    setIsLoading(false);
  };

  return (
    <div className="bg-black min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          title="Resume Template"
          description="A professional resume template to kickstart your career"
          light
        />

        <div className="max-w-4xl mx-auto bg-black border border-gold-800 rounded-lg p-8">
          {/* Template Description */}
          <div className="text-center mb-8">
            <h2 className="text-xl font-semibold text-gold-500 mb-4">Professional Resume Template</h2>
            <p className="text-gold-300 mb-6">
              Link to a universally used high value resume template for all types of top industry jobs
            </p>
          </div>

          {/* Template Access Button */}
          <div className="text-center">
            <button 
              onClick={handleViewTemplate}
              disabled={isLoading}
              className={`inline-flex items-center px-6 py-3 bg-gold-500 text-black rounded-lg hover:bg-gold-400 transition-colors font-semibold group ${
                isLoading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              <ExternalLink className="h-5 w-5 mr-2 transition-transform group-hover:scale-110" />
              {isLoading ? 'Opening...' : 'View Template'}
            </button>
            
            <p className="mt-4 text-gold-400 text-sm">
              Click to open the template in Google Docs
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
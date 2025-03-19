import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';

interface ApplicationPopupProps {
  onClose: () => void;
}

function ApplicationPopup({ onClose }: ApplicationPopupProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-black border border-gold-800 rounded-lg p-8 max-w-2xl w-full relative">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gold-500 mb-4">
            Exclusive Access to Industry Leaders
          </h2>
          <p className="text-gold-300 text-lg mb-6">
            Get direct access to personally connect with industry experts. This is your opportunity to learn directly from successful professionals and build meaningful connections that can shape your career.
          </p>
          <button
            className="inline-flex items-center px-8 py-4 bg-gold-500 text-black rounded-lg hover:bg-gold-400 transition-all duration-200 font-semibold text-lg group"
            onClick={() => window.open('#', '_blank')}
          >
            Apply Now
            <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
          </button>
        </div>
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gold-400 hover:text-gold-300"
        >
          ✕
        </button>
      </div>
    </div>
  );
}

export default function ConductConnectionPage() {
  const [showPopup, setShowPopup] = useState(false);

  return (
    <div className="py-12 bg-black min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gold-500 mb-6">
            Conduct the Connection
          </h1>
          
          <button
            onClick={() => setShowPopup(true)}
            className="w-full max-w-md mx-auto flex flex-col items-center px-8 py-4 bg-gold-500 text-black rounded-lg hover:bg-gold-400 transition-all duration-200 font-semibold mb-12 group"
          >
            <span className="text-2xl mb-1">Apply</span>
            <span className="text-sm">become the interviewer</span>
          </button>

          <div className="space-y-6 text-left mb-12">
            <p className="text-gold-300 text-lg leading-relaxed">
              Get direct access to personally connect with industry experts.
            </p>
            
            <p className="text-gold-300 text-lg leading-relaxed">
              Personalize what you learn from the experts you want to learn from and connect with.
            </p>
            
            <p className="text-gold-300 text-lg leading-relaxed">
              Ask powerful questions of your choice and personally connect on a very high level with high-powered and vetted professionals in industries of your choice.
            </p>
          </div>

          {/* Interview screenshot */}
          <div className="w-full mb-12">
            <img
              src="https://i.imgur.com/E6skAEs.png"
              alt="Example interview session"
              className="w-full rounded-lg border border-gold-800"
            />
          </div>

          <div className="text-left">
            <p className="text-gold-300 text-lg leading-relaxed mb-6">
              Apply now, and if you demonstrate genuine commitment to your future, you'll be accepted, onboarded into our exclusive community of interviewers, and begin interviewing industry leaders in no time.
            </p>

            <div className="text-white space-y-4">
              <p className="leading-relaxed">
                Your interview will be recorded and used to create content for the rest of the community. You will not be featured in any Fast Track videos, and you'll have the option to remain anonymous in the full interview upload, including the ability to obscure your face and voice while still conducting the interviews.
              </p>
              
              <p className="leading-relaxed">
                Please note that this is a highly sought-after feature, and not everyone will be accepted. We carefully select the most dedicated users who are genuinely interested in learning expert-backed truths directly and deepening their professional network.
              </p>
            </div>
          </div>
        </div>
      </div>

      {showPopup && <ApplicationPopup onClose={() => setShowPopup(false)} />}
    </div>
  );
}
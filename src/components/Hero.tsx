import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import PreferencesPopup from './PreferencesPopup';

export default function Hero() {
  const [showPreferences, setShowPreferences] = useState(false);

  return (
    <div className="bg-black text-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
            Your Bridge to Career Success
          </h1>
          <p className="mt-6 text-xl text-gold-300 max-w-2xl mx-auto">
            Join a community of ambitious young professionals and get expert guidance
            to navigate your career journey with confidence.
          </p>
          <div className="mt-10 flex justify-center gap-x-6">
            <button
              onClick={() => setShowPreferences(true)}
              className="rounded-full bg-gold-500 px-6 py-3 text-base font-semibold text-black shadow-sm hover:bg-gold-400 transition-colors duration-200"
            >
              Get Started
            </button>
            <a
              href="#learn-more"
              className="flex items-center text-base font-semibold text-gold-300 hover:text-gold-200"
            >
              Learn more <ArrowRight className="ml-2 h-5 w-5" />
            </a>
          </div>
        </div>
      </div>

      {showPreferences && (
        <PreferencesPopup onClose={() => setShowPreferences(false)} />
      )}
    </div>
  );
}
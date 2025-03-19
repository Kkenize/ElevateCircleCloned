import React, { useState } from 'react';
import { Linkedin } from 'lucide-react';
import LiveEventSignupPopup from './LiveEventSignupPopup';

export default function LiveEventSection() {
  const [showSignupPopup, setShowSignupPopup] = useState(false);

  return (
    <div className="lg:col-span-1">
      {/* Next Live Expert Interview */}
      <div className="border border-gold-800 rounded-lg p-6 mb-6">
        <h2 className="text-2xl font-bold text-gold-500 mb-4">Next Live Expert Interview</h2>
        
        <div className="space-y-4">
          <div>
            <span className="font-bold text-white">The Expert:</span>
            <span className="text-gold-300 ml-2">TBA</span>
          </div>
          
          <div>
            <span className="font-bold text-white">Intro:</span>
            <span className="text-gold-300 ml-2">TBA</span>
          </div>

          <button 
            className="w-full flex items-center justify-center px-4 py-2 bg-[#0077b5]/20 text-[#0077b5] border border-[#0077b5] rounded-lg hover:bg-[#0077b5]/30 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={true}
          >
            <Linkedin className="h-5 w-5 mr-2" />
            LinkedIn Profile
          </button>

          <div className="text-sm text-gold-400">
            <div>Type: Virtual</div>
            <div>Date: TBA</div>
          </div>
        </div>
      </div>

      {/* Live Event Insider List */}
      <div className="border border-gold-800 rounded-lg p-6">
        <h2 className="text-2xl font-bold text-gold-500 mb-4">
          Join the Live Event Insider List – Free Access
        </h2>
        
        <p className="text-gold-300 mb-6">
          Join our next live Zoom with this week's featured industry leader. Get firsthand insights from top founders, CEOs, investors, tech innovators, and more—before anyone else. Sign up now for priority access, early notifications, Zoom links, and passwords to live events. Limited to contact list members—don't miss out before spots fill up!
        </p>

        <button
          onClick={() => setShowSignupPopup(true)}
          className="w-full bg-gold-500 text-black py-3 px-4 rounded-lg hover:bg-gold-400 transition-all duration-200 font-semibold transform hover:scale-[1.02] active:scale-[0.98]"
        >
          Join Now
        </button>
      </div>

      {showSignupPopup && (
        <LiveEventSignupPopup onClose={() => setShowSignupPopup(false)} />
      )}
    </div>
  );
}
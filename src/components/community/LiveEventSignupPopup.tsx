import React, { useState } from 'react';
import { X } from 'lucide-react';
import { supabase } from '../../utils/supabase';

interface LiveEventSignupPopupProps {
  onClose: () => void;
}

export default function LiveEventSignupPopup({ onClose }: LiveEventSignupPopupProps) {
  const [contactInfo, setContactInfo] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    if (!contactInfo) {
      setError('Please enter your email or phone number.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const isEmail = contactInfo.includes('@');
      const contactType = isEmail ? 'email' : 'phone_number';

      const { error: supabaseError } = await supabase
        .from('live_event_insider_list')
        .insert([{
          contact_info: contactInfo.trim(),
          contact_type: contactType,
          source: 'live_event_signup'
        }]);

      if (supabaseError) {
        if (supabaseError.code === '23505') { // Unique violation
          setError('This contact has already been registered.');
        } else {
          console.error('Supabase error:', supabaseError);
          setError('There was an issue submitting your information. Please try again.');
        }
        return;
      }

      alert("You've successfully joined the Live Event Insider List!");
      setContactInfo('');
      onClose();
    } catch (err) {
      console.error('Error submitting contact info:', err);
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-gradient-to-br from-black to-gold-900 border border-gold-800 rounded-lg p-8 max-w-md w-full relative shadow-xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gold-400 hover:text-gold-300 transition-colors"
          aria-label="Close popup"
        >
          <X className="h-6 w-6" />
        </button>

        <h2 className="text-2xl font-bold text-gold-500 mb-4 text-center">
          Live Event Contact List
        </h2>
        <p className="text-gold-300 mb-6 text-center">
          Join our exclusive contact list for priority access to live Zoom interviews with top industry leaders. Spots are limited—once capacity is reached, new sign-ups will be closed. As a live attendee, you'll get early access, real-time Q&A opportunities, and the chance to engage directly with experts—privileges not available to those who wait for the recorded version.
        </p>

        <div className="space-y-4">
          <input
            type="text"
            placeholder="Enter your email or phone number"
            value={contactInfo}
            onChange={(e) => setContactInfo(e.target.value)}
            disabled={loading}
            className="w-full px-4 py-3 bg-black/50 border border-gold-800 rounded-lg text-white placeholder-gold-700 focus:outline-none focus:border-gold-500 focus:ring-2 focus:ring-gold-500/50 transition-all"
          />

          {error && (
            <p className="text-red-500 text-sm">{error}</p>
          )}

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full bg-gold-500 text-black py-3 px-4 rounded-lg hover:bg-gold-400 transition-all duration-200 font-semibold transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Submitting...' : 'Join Now'}
          </button>
        </div>
      </div>
    </div>
  );
}
import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { supabase } from '../utils/supabase';

interface EmailPopupProps {
  onClose: () => void;
}

export default function EmailPopup({ onClose }: EmailPopupProps) {
  const [contact, setContact] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateContact = (value: string) => {
    // Email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    // Phone validation regex (simple version: at least 10 digits)
    const phoneRegex = /^\d{10,}$/;
    
    if (emailRegex.test(value)) {
      return { isValid: true };
    } else if (phoneRegex.test(value.replace(/\D/g, ''))) {
      return { isValid: true };
    }
    return { isValid: false };
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    const contactValue = contact.trim();
    const validation = validateContact(contactValue);

    if (!validation.isValid) {
      setError('Please enter a valid email or phone number');
      setIsSubmitting(false);
      return;
    }

    try {
      const { error: supabaseError } = await supabase
        .from('email_subscribers')
        .insert([{ 
          email: contactValue
        }]);

      if (supabaseError) {
        if (supabaseError.code === '23505') { // Unique violation error code
          setError('This contact has already been registered');
        } else {
          setError('An error occurred. Please try again.');
        }
        setIsSubmitting(false);
        return;
      }

      // Success
      setSuccess(true);
      localStorage.setItem('hasSubscribed', 'true');
      
      // Close popup after 2 seconds
      setTimeout(() => {
        onClose();
      }, 2000);
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
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

        {success ? (
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gold-500 mb-4">Thank You!</h2>
            <p className="text-gold-300">You've been successfully subscribed!</p>
          </div>
        ) : (
          <>
            <h2 className="text-2xl font-bold text-gold-500 mb-4 text-center">
              Get free early access to exclusive updates, discounts, and legacy benefits
            </h2>
            <p className="text-gold-300 mb-6 text-center">
              Join our contact list to be the first to know about product launches, pilot program opportunities, and exclusive legacy rewards. -contact list is free for life
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <input
                  type="text"
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                  placeholder="Enter your email or phone number"
                  className="w-full px-4 py-3 bg-black/50 border border-gold-800 rounded-lg text-white placeholder-gold-700 focus:outline-none focus:border-gold-500 focus:ring-2 focus:ring-gold-500/50 transition-all"
                  disabled={isSubmitting}
                />
                {error && (
                  <p className="mt-2 text-red-500 text-sm">{error}</p>
                )}
              </div>

              <button
                type="submit"
                className={`w-full bg-gold-500 text-black py-3 px-4 rounded-lg hover:bg-gold-400 transition-all duration-200 font-semibold transform hover:scale-[1.02] active:scale-[0.98] ${
                  isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                }`}
                disabled={isSubmitting}
              >
                <div className="flex flex-col items-center">
                  <span>{isSubmitting ? 'Subscribing...' : 'Stay in the loop'}</span>
                  <span className="text-xs">(submit)</span>
                </div>
              </button>
            </form>

            <p className="mt-4 text-gold-400 text-sm text-center">
              You can leave email list at any time.
            </p>
          </>
        )}
      </div>
    </div>
  );
}
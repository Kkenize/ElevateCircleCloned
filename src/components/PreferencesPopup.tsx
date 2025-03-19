import React, { useState } from 'react';
import { X } from 'lucide-react';

interface Preference {
  id: string;
  category: string;
  label: string;
}

const preferences: Preference[] = [
  // Career Goals
  { id: 'leadership', category: 'Career Goals', label: 'Leadership & Management' },
  { id: 'entrepreneurship', category: 'Career Goals', label: 'Entrepreneurship' },
  { id: 'tech', category: 'Career Goals', label: 'Technology & Innovation' },
  { id: 'finance', category: 'Career Goals', label: 'Finance & Investment' },
  { id: 'consulting', category: 'Career Goals', label: 'Consulting' },
  
  // Industry Interests
  { id: 'software', category: 'Industries', label: 'Software & Tech' },
  { id: 'finance-industry', category: 'Industries', label: 'Financial Services' },
  { id: 'healthcare', category: 'Industries', label: 'Healthcare' },
  { id: 'sports', category: 'Industries', label: 'Sports Business' },
  { id: 'real-estate', category: 'Industries', label: 'Real Estate' },
  
  // Development Areas
  { id: 'networking', category: 'Development', label: 'Professional Networking' },
  { id: 'public-speaking', category: 'Development', label: 'Public Speaking' },
  { id: 'negotiation', category: 'Development', label: 'Negotiation Skills' },
  { id: 'leadership-skills', category: 'Development', label: 'Leadership Skills' },
  { id: 'career-transition', category: 'Development', label: 'Career Transition' }
];

interface PreferencesPopupProps {
  onClose: () => void;
}

export default function PreferencesPopup({ onClose }: PreferencesPopupProps) {
  const [selectedPreferences, setSelectedPreferences] = useState<Set<string>>(new Set());
  const [currentStep, setCurrentStep] = useState(1);
  const [error, setError] = useState('');

  const togglePreference = (id: string) => {
    const newSelected = new Set(selectedPreferences);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedPreferences(newSelected);
    setError('');
  };

  const handleSubmit = () => {
    if (selectedPreferences.size < 3) {
      setError('Please select at least 3 preferences');
      return;
    }
    // Here you could save the preferences to a database or state management
    onClose();
  };

  const getStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <>
            <h3 className="text-xl font-semibold text-gold-500 mb-4">
              What are your career goals?
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {preferences
                .filter(pref => pref.category === 'Career Goals')
                .map(pref => (
                  <button
                    key={pref.id}
                    onClick={() => togglePreference(pref.id)}
                    className={`p-3 rounded-lg text-left transition-colors ${
                      selectedPreferences.has(pref.id)
                        ? 'bg-gold-500 text-black'
                        : 'bg-black border border-gold-800 text-gold-300 hover:border-gold-600'
                    }`}
                  >
                    {pref.label}
                  </button>
                ))}
            </div>
          </>
        );
      case 2:
        return (
          <>
            <h3 className="text-xl font-semibold text-gold-500 mb-4">
              Which industries interest you most?
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {preferences
                .filter(pref => pref.category === 'Industries')
                .map(pref => (
                  <button
                    key={pref.id}
                    onClick={() => togglePreference(pref.id)}
                    className={`p-3 rounded-lg text-left transition-colors ${
                      selectedPreferences.has(pref.id)
                        ? 'bg-gold-500 text-black'
                        : 'bg-black border border-gold-800 text-gold-300 hover:border-gold-600'
                    }`}
                  >
                    {pref.label}
                  </button>
                ))}
            </div>
          </>
        );
      case 3:
        return (
          <>
            <h3 className="text-xl font-semibold text-gold-500 mb-4">
              What skills would you like to develop?
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {preferences
                .filter(pref => pref.category === 'Development')
                .map(pref => (
                  <button
                    key={pref.id}
                    onClick={() => togglePreference(pref.id)}
                    className={`p-3 rounded-lg text-left transition-colors ${
                      selectedPreferences.has(pref.id)
                        ? 'bg-gold-500 text-black'
                        : 'bg-black border border-gold-800 text-gold-300 hover:border-gold-600'
                    }`}
                  >
                    {pref.label}
                  </button>
                ))}
            </div>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-black border border-gold-800 rounded-lg p-8 max-w-2xl w-full relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gold-400 hover:text-gold-300 transition-colors"
        >
          <X className="h-6 w-6" />
        </button>

        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gold-500 mb-2">
            Personalize Your Experience
          </h2>
          <p className="text-gold-300">
            Help us customize your journey by selecting your preferences
          </p>
        </div>

        <div className="mb-8">
          {getStepContent()}
        </div>

        {error && (
          <p className="text-red-500 text-sm mb-4 text-center">{error}</p>
        )}

        <div className="flex justify-between">
          {currentStep > 1 && (
            <button
              onClick={() => setCurrentStep(currentStep - 1)}
              className="px-6 py-2 text-gold-400 hover:text-gold-300 transition-colors"
            >
              Back
            </button>
          )}
          {currentStep < 3 ? (
            <button
              onClick={() => setCurrentStep(currentStep + 1)}
              className="px-6 py-2 bg-gold-500 text-black rounded-lg hover:bg-gold-400 transition-colors ml-auto"
            >
              Next
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              className="px-6 py-2 bg-gold-500 text-black rounded-lg hover:bg-gold-400 transition-colors ml-auto"
            >
              Submit
            </button>
          )}
        </div>

        <div className="mt-4 flex justify-center">
          <div className="flex gap-2">
            {[1, 2, 3].map((step) => (
              <div
                key={step}
                className={`w-2 h-2 rounded-full ${
                  step === currentStep ? 'bg-gold-500' : 'bg-gold-800'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
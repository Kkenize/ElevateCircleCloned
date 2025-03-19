import React from 'react';

export default function ResumeBuilder() {
  return (
    <div className="bg-white rounded-lg p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Build Your Resume</h2>
      
      <form className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">Personal Information</label>
          <input
            type="text"
            placeholder="Full Name"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gold-500 focus:ring-gold-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Professional Summary</label>
          <textarea
            rows={4}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gold-500 focus:ring-gold-500"
          />
        </div>

        {/* Add more form fields for experience, education, etc. */}
        
        <button
          type="submit"
          className="w-full bg-gold-500 text-white py-2 px-4 rounded-md hover:bg-gold-600 transition-colors"
        >
          Generate Resume
        </button>
      </form>
    </div>
  );
}
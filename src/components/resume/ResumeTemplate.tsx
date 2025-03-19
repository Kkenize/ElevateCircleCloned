import React from 'react';
import { Download } from 'lucide-react';

export default function ResumeTemplate() {
  return (
    <div className="bg-white rounded-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Preview</h2>
        <button className="flex items-center px-4 py-2 bg-gold-500 text-white rounded-md hover:bg-gold-600 transition-colors">
          <Download className="h-4 w-4 mr-2" />
          Download PDF
        </button>
      </div>
      
      <div className="border border-gray-200 rounded-lg p-6 bg-white shadow-inner">
        <div className="space-y-6">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900">Your Name</h1>
            <p className="text-gray-600">Professional Title</p>
          </div>
          
          <div>
            <h2 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2 mb-3">
              Professional Summary
            </h2>
            <p className="text-gray-600">Your professional summary will appear here...</p>
          </div>
          
          <div>
            <h2 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2 mb-3">
              Experience
            </h2>
            <div className="text-gray-600">Your experience will appear here...</div>
          </div>
          
          <div>
            <h2 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2 mb-3">
              Education
            </h2>
            <div className="text-gray-600">Your education will appear here...</div>
          </div>
        </div>
      </div>
    </div>
  );
}
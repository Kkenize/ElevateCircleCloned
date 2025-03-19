import React from 'react';
import { Mail } from 'lucide-react';

interface FooterProps {
  onStayInLoop: () => void;
}

export default function Footer({ onStayInLoop }: FooterProps) {
  return (
    <footer className="bg-black border-t border-gold-800 py-8 md:pl-64">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-center space-y-4">
          <button
            onClick={onStayInLoop}
            className="flex items-center px-6 py-3 bg-gold-500 text-black rounded-lg hover:bg-gold-400 transition-colors font-semibold group"
          >
            <Mail className="h-5 w-5 mr-2" />
            <span>Stay in the loop</span>
          </button>
          <p className="text-gold-300 text-sm text-center">
            Join our contact list for exclusive updates and benefits
          </p>
        </div>
      </div>
    </footer>
  );
}
import React from 'react';
import { MessageSquare, Users, Lightbulb } from 'lucide-react';

export default function CommunitySection() {
  return (
    <section className="bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Join Our Thriving Community</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Connect with peers, share ideas, and collaborate on projects in a supportive environment
            designed for young professionals.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center justify-center w-12 h-12 bg-indigo-100 rounded-lg mb-4">
              <MessageSquare className="h-6 w-6 text-indigo-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Real-time Discussions</h3>
            <p className="text-gray-600">
              Engage in meaningful conversations with peers and industry experts about career
              development and professional growth.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center justify-center w-12 h-12 bg-indigo-100 rounded-lg mb-4">
              <Users className="h-6 w-6 text-indigo-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Collaborative Workshops</h3>
            <p className="text-gray-600">
              Find potential co-founders, collaborate on projects, and get feedback from the
              community on your ideas.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center justify-center w-12 h-12 bg-indigo-100 rounded-lg mb-4">
              <Lightbulb className="h-6 w-6 text-indigo-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Expert Insights</h3>
            <p className="text-gray-600">
              Get direct access to industry professionals through Q&A sessions and personalized
              mentorship opportunities.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
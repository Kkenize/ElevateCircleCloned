import React from 'react';
import Hero from '../components/Hero';
import CategoryLink from '../components/ui/CategoryLink';

const categories = [
  {
    title: 'Conduct the Connection',
    description: 'Become an interviewer and connect directly with industry experts',
    path: '/conduct-connection',
    image: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&q=80&w=2069',
  },
  {
    title: 'Full Interviews',
    description: 'Deep dive into career journeys and expert insights',
    path: '/interviews',
    image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=1600',
  },
  {
    title: 'Fast Track',
    description: 'Quick, actionable career advice',
    path: '/fast-track',
    image: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&q=80&w=1600',
  },
  {
    title: 'Meet Our Experts',
    description: 'Connect with industry leaders',
    path: '/experts',
    image: 'https://images.unsplash.com/photo-1573496799652-408c2ac9fe98?auto=format&fit=crop&q=80&w=1600',
  },
  {
    title: 'Community',
    description: 'Connect, collaborate, and grow together',
    path: '/community',
    image: 'https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&q=80&w=1600',
  },
];

export default function HomePage() {
  return (
    <div className="bg-black">
      <Hero />
      
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gold-500 text-center mb-12">
            Explore ElevateCircle
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {categories.map((category) => (
              <CategoryLink key={category.title} {...category} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
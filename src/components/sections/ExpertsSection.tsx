import React from 'react';
import ExpertCard from '../ui/ExpertCard';
import SectionHeader from '../ui/SectionHeader';

const experts = [
  {
    id: '1',
    name: 'Dr. Sarah Chen',
    role: 'Senior Engineering Manager',
    company: 'Google',
    expertise: ['Software Engineering', 'Leadership', 'Career Transitions'],
    image: 'https://images.unsplash.com/photo-1573496799652-408c2ac9fe98?auto=format&fit=crop&q=80&w=1600',
    bio: 'Dr. Chen has helped over 100 engineers transition into tech leadership roles.',
  },
  {
    id: '2',
    name: 'Michael Rodriguez',
    role: 'Startup Founder & CEO',
    company: 'TechVentures',
    expertise: ['Entrepreneurship', 'Venture Capital', 'Product Strategy'],
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=1600',
    bio: 'Serial entrepreneur with 3 successful exits, now mentoring early-stage founders.',
  },
  {
    id: '3',
    name: 'Emily Wong',
    role: 'Investment Banking Director',
    company: 'Goldman Sachs',
    expertise: ['Finance', 'Investment Banking', 'Career Development'],
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=1600',
    bio: 'Passionate about helping young professionals navigate the finance industry.',
  },
];

export default function ExpertsSection() {
  return (
    <section className="py-12 bg-gold-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          title="Meet Our Experts"
          description="Connect with industry leaders who are passionate about helping you succeed."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {experts.map((expert) => (
            <ExpertCard key={expert.id} expert={expert} />
          ))}
        </div>
      </div>
    </section>
  );
}

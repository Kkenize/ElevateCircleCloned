import React from 'react';
import ExpertCard from '../components/ui/ExpertCard';
import SectionHeader from '../components/ui/SectionHeader';

const experts = [
  {
    id: '1',
    name: 'Casey Caruso',
    role: 'Engineer, Founder, Investor',
    company: 'Topology Ventures',
    expertise: ['Computer Science', 'Leadership', 'Crypto', 'Venture Capital'],
    image: 'https://i.imgur.com/p2DsKRw.png',
    bio: 'Ex-Google engineer, Topology Ventures Managing Partner, tech/crypto investor, Harvard dropout.',
    linkedinUrl: 'https://www.linkedin.com/in/casey-k-caruso'
  },
  {
    id: '2',
    name: 'Brad Blank',
    role: 'NFL Sports Agent & Attorney',
    company: 'Brad Blank & Associates',
    expertise: ['Sports Business', 'Sports Law', 'Agency', 'Finance'],
    image: 'https://i.imgur.com/MtckIUQ.png',
    bio: 'Ivy League alumnus with over $1.2 billion in NFL contracts negotiated. Deep industry expert and owner of bradblank.com, specializing in sports law and athlete representation.',
    linkedinUrl: 'https://www.linkedin.com/in/brad-blank-522414a'
  },
  {
    id: '3',
    name: 'Kevin Moran',
    role: 'Co-Founder & Former MLB Pitcher',
    company: 'Beam',
    expertise: ['Entrepreneurship', 'Tech Sales', 'Sports', 'Leadership'],
    image: 'https://i.imgur.com/dtQOSp2.png',
    bio: 'Former MLB pitcher turned successful entrepreneur. Transitioned from VMware tech sales to co-founding a rapidly growing industry-leading company.',
    linkedinUrl: 'https://www.linkedin.com/in/kevin-m-664b7265'
  },
  {
    id: '4',
    name: 'Frank Golden',
    role: 'Founder',
    company: 'Golden Ventures',
    expertise: ['Startups', 'Business Strategy', 'Advisory', 'Entrepreneurship'],
    image: 'https://i.imgur.com/Em2ih9i.png',
    bio: 'Veteran of the startup ecosystem with over 10 years of experience. Dedicated advisor to high-level founders and startups, helping companies achieve sustainable growth and success.',
    linkedinUrl: 'https://www.linkedin.com/in/fgolden'
  }
];

export default function ExpertsPage() {
  return (
    <section className="py-12 bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          title="Meet Our Experts"
          description="Connect with industry leaders who are passionate about helping you succeed."
          light
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
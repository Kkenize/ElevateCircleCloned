import { Video } from '../types';

// Define search-related types
interface SearchableContent extends Video {
  type: 'interview' | 'fastTrack';
  content: string;
}

// Expanded related terms mapping for better search matching
const relatedTerms: Record<string, string[]> = {
  'resume': ['cv', 'curriculum vitae', 'resume writing', 'job application'],
  'interview': ['interviews', 'interviewing', 'job interview', 'technical interview'],
  'career': ['job', 'profession', 'work', 'employment', 'career path', 'career growth'],
  'programming': ['coding', 'software', 'development', 'engineering', 'tech'],
  'venture capital': ['vc', 'investing', 'startup funding', 'investment'],
  'crypto': ['cryptocurrency', 'bitcoin', 'blockchain', 'web3', 'digital assets'],
  'leadership': ['management', 'leading', 'team lead', 'director', 'executive'],
  'networking': ['connections', 'linkedin', 'professional network', 'contacts'],
  'entrepreneurship': ['startup', 'founder', 'business owner', 'entrepreneur', 'company building'],
  'sports': ['athletics', 'athlete', 'professional sports', 'mlb', 'nfl', 'baseball', 'football'],
  'law': ['legal', 'attorney', 'lawyer', 'contracts', 'sports law'],
  'business strategy': ['strategic planning', 'business development', 'growth strategy', 'scaling'],
  'mental health': ['wellness', 'mindset', 'psychology', 'resilience', 'burnout'],
  'sales': ['selling', 'business development', 'revenue', 'gtm', 'go to market'],
  'finance': ['investment', 'banking', 'financial', 'money', 'wealth'],
  'technology': ['tech', 'software', 'digital', 'innovation', 'engineering'],
  'growth': ['scaling', 'development', 'improvement', 'progress', 'advancement'],
  'mindset': ['attitude', 'perspective', 'mentality', 'psychology', 'thinking'],
  'success': ['achievement', 'accomplishment', 'excellence', 'winning', 'performance']
};

// Updated searchable content database with all videos
const searchableContent: SearchableContent[] = [
  // Full Interviews
  {
    id: 'interview-1',
    title: 'Venture Capital, Programming & Crypto Investment',
    expert: 'Casey Caruso, Managing Partner at Topology Ventures',
    duration: '34 minutes',
    tags: ['Venture Capital', 'Programming', 'Crypto', 'Investment', 'Technology'],
    thumbnail: 'https://i.imgur.com/p2DsKRw.png',
    type: 'interview',
    content: 'Deep dive into venture capital, programming background, and crypto investments with Casey Caruso. Learn about the intersection of technology and investment, career transitions, and insights into the VC world.'
  },
  {
    id: 'interview-2',
    title: 'Entrepreneurship, Founding Companies, and Building Teams',
    expert: 'Christian Nicholson, Founder of ZypRun',
    duration: '29 minutes',
    tags: ['Entrepreneurship', 'Leadership', 'Startups', 'Team Building'],
    thumbnail: 'https://i.ytimg.com/vi/z8S70Jh2o1o/maxresdefault.jpg',
    type: 'interview',
    content: 'Insights into founding and scaling companies, building effective teams, and navigating the challenges of entrepreneurship. Learn from a successful founder about startup growth and leadership.'
  },
  {
    id: 'interview-3',
    title: 'Sports Agency, Sports Business, Business Law',
    expert: 'Brad Blank, NFL Sports Agent',
    duration: '38 minutes',
    tags: ['Sports Business', 'Law', 'Negotiation', 'Career Growth'],
    thumbnail: 'https://i.imgur.com/MtckIUQ.png',
    type: 'interview',
    content: 'Expert insights into sports law, contract negotiations, and building a successful career in sports business. Learn about the intersection of law, sports, and business from a veteran agent.'
  },
  {
    id: 'interview-4',
    title: 'Startups, Consulting & Early Stage Business Growth',
    expert: 'Frank Golden, Founder of Golden Ventures',
    duration: '27 minutes',
    tags: ['Startups', 'Consulting', 'Business Strategy', 'Growth'],
    thumbnail: 'https://i.imgur.com/Em2ih9i.png',
    type: 'interview',
    content: 'Strategic insights into early-stage business growth, consulting, and startup development. Learn about building and scaling successful companies from an experienced founder and advisor.'
  },
  {
    id: 'interview-5',
    title: 'Commercial Real Estate, Career Development & The Killer Mindset',
    expert: 'Jake Seau, Pre Construction Manager',
    duration: '49 minutes',
    tags: ['Real Estate', 'Career Development', 'Mindset', 'Success'],
    thumbnail: 'https://i.ytimg.com/vi/Fd2yehj1aOE/maxresdefault.jpg',
    type: 'interview',
    content: 'Explore career development in real estate, developing a success mindset, and achieving professional growth. Learn about the commercial real estate industry and building a successful career path.'
  },
  {
    id: 'interview-6',
    title: 'Growth Mindset, Breaking Social Norms & International Business',
    expert: 'Fabia Maramotti, International Business Expert & Ultra-Cyclist',
    duration: '36 minutes',
    tags: ['International Business', 'Growth Mindset', 'Leadership', 'Achievement'],
    thumbnail: 'https://i.ytimg.com/vi/z8qZjfYZsDs/maxresdefault.jpg',
    type: 'interview',
    content: 'Insights into international business, developing a growth mindset, and breaking through limitations. Learn about leadership and achievement from a successful business expert and athlete.'
  },
  {
    id: 'interview-7',
    title: 'Starting a Company & Career Transitions',
    expert: 'Kevin Moran, Co-Founder of Beam & Former MLB Pitcher',
    duration: '26 minutes',
    tags: ['Entrepreneurship', 'Career Transitions', 'Sports', 'Leadership'],
    thumbnail: 'https://i.imgur.com/dtQOSp2.png',
    type: 'interview',
    content: 'Learn about transitioning from professional sports to entrepreneurship, starting and scaling a company, and effective leadership strategies.'
  },

  // Fast Track Videos
  {
    id: 'fasttrack-1',
    title: 'Key Leadership Traits for Scaling Your Company',
    expert: 'Kevin Moran, Co-Founder of Beam & Former MLB Pitcher',
    duration: '2.5 minutes',
    tags: ['Leadership', 'Business Growth', 'Team Building', 'Management'],
    thumbnail: 'https://i.ytimg.com/vi/kcYzAxIqpXA/maxresdefault.jpg',
    type: 'fastTrack',
    content: 'Quick insights into essential leadership qualities needed for scaling a company and building successful teams.'
  },
  {
    id: 'fasttrack-2',
    title: 'Embracing Challenge: Growth Through Adversity',
    expert: 'Fabia Maramotti, International Business Expert & Ultra-Cyclist',
    duration: '3 minutes',
    tags: ['Personal Growth', 'Mindset', 'Resilience', 'Success'],
    thumbnail: 'https://i.ytimg.com/vi/0TdFd99_MMo/maxresdefault.jpg',
    type: 'fastTrack',
    content: 'Learn about personal growth through challenging experiences, developing resilience, and maintaining a growth mindset in difficult situations.'
  },
  {
    id: 'fasttrack-3',
    title: 'Building Long-Term Success Through Job Loyalty',
    expert: 'Jake Seau, Pre Construction Manager',
    duration: '7 minutes',
    tags: ['Career Growth', 'Real Estate', 'Professional Development'],
    thumbnail: 'https://i.ytimg.com/vi/LQdJ7P4EkVM/maxresdefault.jpg',
    type: 'fastTrack',
    content: 'Strategies for building a successful long-term career through loyalty, commitment, and professional development.'
  }
];

// Helper function to normalize text for comparison
function normalizeText(text: string): string {
  return text.toLowerCase().trim();
}

// Helper function to expand search terms using related terms
function expandSearchTerms(query: string): string[] {
  const normalizedQuery = normalizeText(query);
  const terms = normalizedQuery.split(' ');
  const expandedTerms = new Set<string>();
  
  terms.forEach(term => {
    expandedTerms.add(term);
    Object.entries(relatedTerms).forEach(([key, values]) => {
      if (key.includes(term) || values.some(value => value.includes(term))) {
        expandedTerms.add(key);
        values.forEach(value => expandedTerms.add(value));
      }
    });
  });
  
  return Array.from(expandedTerms);
}

// Calculate relevance score for a content item
function calculateRelevance(content: SearchableContent, searchTerms: string[]): number {
  let score = 0;
  const searchString = [
    content.title,
    content.expert,
    content.content,
    ...content.tags
  ].join(' ').toLowerCase();
  
  searchTerms.forEach(term => {
    // Title matches (highest weight)
    if (content.title.toLowerCase().includes(term)) score += 10;
    
    // Tag matches (high weight)
    if (content.tags.some(tag => tag.toLowerCase().includes(term))) score += 8;
    
    // Expert name matches
    if (content.expert.toLowerCase().includes(term)) score += 6;
    
    // Content matches
    if (content.content.toLowerCase().includes(term)) score += 4;
    
    // General content match
    if (searchString.includes(term)) score += 2;
  });

  // Boost scores for exact phrase matches
  const phraseBonus = searchTerms.join(' ');
  if (searchString.includes(phraseBonus)) {
    score += 15;
  }

  // Type-specific boosts
  if (content.type === 'fastTrack' && searchTerms.some(term => term.includes('quick') || term.includes('brief'))) {
    score += 5; // Boost quick content for specific searches
  }

  if (content.type === 'interview' && searchTerms.some(term => term.includes('detail') || term.includes('deep'))) {
    score += 5; // Boost full interviews for detailed content searches
  }

  return score;
}

// Main search function
export function searchAllContent(query: string): SearchableContent[] {
  if (!query.trim()) return [];
  
  const searchTerms = expandSearchTerms(query.trim());
  
  return searchableContent
    .map(content => ({
      ...content,
      relevance: calculateRelevance(content, searchTerms),
    }))
    .filter(content => content.relevance > 0)
    .sort((a, b) => b.relevance - a.relevance);
}
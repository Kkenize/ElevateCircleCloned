import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Video, BookOpen, Users, FileText, MessageSquare, Mail, Handshake } from 'lucide-react';

const mainNavigation = [
  { name: 'Conduct the Connection', icon: Handshake, href: '/conduct-connection' },
  { name: 'Full Interviews', icon: Video, href: '/interviews' },
  { name: 'Fast Track', icon: BookOpen, href: '/fast-track' },
  { name: 'Meet Experts', icon: Users, href: '/experts' },
  { name: 'Community', icon: MessageSquare, href: '/community' },
];

const featuredNavigation = [
  { name: 'Resume Builder', icon: FileText, href: '/resume' },
];

interface NavigationProps {
  onStayInLoop: () => void;
}

export default function Navigation({ onStayInLoop }: NavigationProps) {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const NavLink = ({ item }: { item: typeof mainNavigation[0] }) => (
    <Link
      to={item.href}
      className={`flex items-center px-4 py-3 rounded-lg mb-1 transition-colors duration-200 ${
        isActive(item.href)
          ? 'bg-gold-900/50 text-gold-500'
          : 'text-gold-300 hover:bg-gold-900/50 hover:text-gold-500'
      }`}
    >
      <item.icon className="h-5 w-5 mr-3" />
      <span className="font-medium">{item.name}</span>
    </Link>
  );

  return (
    <nav className="hidden md:block fixed w-64 h-full bg-black border-r border-gold-800 pt-20">
      <div className="px-4 py-6 flex flex-col h-[calc(100vh-5rem)]">
        <div className="mb-8">
          <h2 className="px-4 text-sm font-semibold text-gold-500 uppercase tracking-wider mb-2">
            Main Navigation
          </h2>
          {mainNavigation.map((item) => (
            <NavLink key={item.name} item={item} />
          ))}
        </div>

        <div className="mb-8">
          <h2 className="px-4 text-sm font-semibold text-gold-500 uppercase tracking-wider mb-2">
            Featured
          </h2>
          {featuredNavigation.map((item) => (
            <NavLink key={item.name} item={item} />
          ))}
        </div>

        <div className="mt-auto">
          <button
            onClick={onStayInLoop}
            className="flex items-center px-4 py-3 rounded-lg mb-1 w-full text-gold-300 hover:bg-gold-900/50 hover:text-gold-500 transition-colors duration-200"
          >
            <Mail className="h-5 w-5 mr-3" />
            <span className="font-medium">Stay in the loop</span>
          </button>
        </div>
      </div>
    </nav>
  );
}
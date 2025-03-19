import React from 'react';
import { Bell, MessageSquare, Users, Briefcase } from 'lucide-react';

interface Notification {
  id: string;
  type: 'message' | 'workshop' | 'expert' | 'job';
  title: string;
  description: string;
  time: string;
  read: boolean;
}

const notifications: Notification[] = [
  {
    id: '1',
    type: 'workshop',
    title: 'New Workshop Posted',
    description: 'Tech Startup Workshop starting in 1 hour',
    time: '1 hour ago',
    read: false
  },
  {
    id: '2',
    type: 'expert',
    title: 'Expert Response',
    description: 'Sarah Chen replied to your message',
    time: '2 hours ago',
    read: true
  }
];

const getIcon = (type: Notification['type']) => {
  switch (type) {
    case 'message':
      return MessageSquare;
    case 'workshop':
      return Users;
    case 'expert':
      return Bell;
    case 'job':
      return Briefcase;
  }
};

export default function NotificationCenter() {
  return (
    <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg overflow-hidden border border-gold-200">
      <div className="p-4 border-b border-gold-200">
        <h3 className="text-lg font-semibold text-gray-900">Notifications</h3>
      </div>
      
      <div className="max-h-96 overflow-y-auto">
        {notifications.map((notification) => {
          const Icon = getIcon(notification.type);
          return (
            <div
              key={notification.id}
              className={`p-4 hover:bg-gold-50 cursor-pointer ${
                !notification.read ? 'bg-gold-50' : ''
              }`}
            >
              <div className="flex items-start">
                <div className={`p-2 rounded-full ${
                  !notification.read ? 'bg-gold-200' : 'bg-gray-100'
                }`}>
                  <Icon className="h-5 w-5 text-gold-600" />
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900">{notification.title}</p>
                  <p className="text-sm text-gray-500">{notification.description}</p>
                  <p className="text-xs text-gray-400 mt-1">{notification.time}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      
      <div className="p-4 border-t border-gold-200">
        <button className="text-sm text-gold-600 hover:text-gold-700">
          Mark all as read
        </button>
      </div>
    </div>
  );
}
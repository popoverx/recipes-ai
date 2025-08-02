import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { MessageSquare, Search, BookOpen, Home, Plus, Settings } from 'lucide-react';
import { IconBubbleFilled } from '@tabler/icons-react';

const sidebarItems = [
  {
    name: 'Home',
    href: '/',
    icon: IconBubbleFilled
  },
  {
    name: 'Chat',
    href: '/chat',
    icon: MessageSquare
  },
  {
    name: 'Search',
    href: '/search',
    icon: Search
  },
  {
    name: 'Recipe Books',
    href: '/collections',
    icon: BookOpen
  },
  {
    name: 'Create Collection',
    href: '/collections/new',
    icon: Plus
  },
  {
    name: 'Settings',
    href: '/settings',
    icon: Settings
  }
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className='flex flex-col h-full bg-white border-r border-gray-200'>
      <div className='flex items-center justify-center h-16 border-b border-gray-200'>
        <span className='text-xl font-bold text-orange-600'>🍳</span>
      </div>
      <nav className='flex flex-col flex-1 py-4'>
        {sidebarItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                'flex flex-col items-center justify-center py-3 px-2 text-sm font-medium transition-colors',
                isActive
                  ? 'text-orange-600 bg-orange-50'
                  : 'text-gray-600 hover:text-orange-600 hover:bg-gray-100'
              )}
            >
              <item.icon className='h-5 w-5 mb-1' />
              <span className='text-xs'>{item.name}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}

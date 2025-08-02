import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Sidebar } from '@/components/ui/sidebar';
import { Tooltip } from '@/components/ui/tooltip';
import { IconChefHat, IconBookmarks, IconSearch } from '@tabler/icons-react';

export function AppSidebar() {
  const pathname = usePathname();

  const navItems = [
    {
      name: 'Chef',
      icon: IconChefHat,
      path: '/'
    },
    {
      name: 'Recipe Books',
      icon: IconBookmarks,
      path: '/collections'
    },
    {
      name: 'Search',
      icon: IconSearch,
      path: '/search'
    }
  ];

  return (
    <Sidebar className='w-16'>
      <div className='flex flex-col h-full'>
        {/* Logo */}
        <div className='flex items-center justify-center h-14'>
          <Tooltip content='RecipesAI'>
            <span className='text-3xl font-bold text-orange-600'>🍳</span>
          </Tooltip>
        </div>

        {/* Navigation Icons */}
        <div className='flex-1 flex flex-col items-center pt-6 gap-6'>
          {navItems.map((item) => (
            <Link key={item.name} href={item.path}>
              <Tooltip content={item.name}>
                <div
                  className={cn(
                    'flex flex-col items-center justify-center w-10 h-10 rounded-md',
                    pathname === item.path
                      ? 'bg-orange-100 text-orange-600'
                      : 'text-gray-500 hover:bg-orange-50 hover:text-orange-600'
                  )}
                >
                  <item.icon className='h-5 w-5' />
                </div>
              </Tooltip>
            </Link>
          ))}
        </div>
      </div>
    </Sidebar>
  );
}

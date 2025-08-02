import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Sidebar } from '@/components/ui/sidebar';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
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
        {/* Navigation Icons */}
        <div className='flex-1 flex flex-col items-center pt-6 gap-6'></div>
      </div>
    </Sidebar>
  );
}

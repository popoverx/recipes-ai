import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import {
  IconSearch,
  IconBell,
  IconChevronRight,
  IconUser,
  IconCrown,
  IconUserCircle,
  IconSettings,
  IconBookmark
} from '@tabler/icons-react';

const navItems = [
  {
    name: 'Search',
    icon: IconSearch,
    path: '/search'
  },
  {
    name: 'Notifications',
    icon: IconBell,
    path: '/notifications'
  },
  {
    name: 'Collections',
    icon: IconBookmark,
    path: '/collections'
  },
  {
    name: 'Profile',
    icon: IconUserCircle,
    path: '/profile'
  }
];

export function NavActions() {
  const pathname = usePathname();

  return (
    <div className='flex items-center gap-3'>
      <div className='cursor-pointer text-orange-700 hover:text-orange-600 flex gap-1.5 items-center hover:underline text-sm'>
        <IconCrown className='h-4 w-4' />
        <span>Get more credits</span>
        <IconChevronRight className='h-4 w-4' />
      </div>

      {navItems.map((item) => (
        <Link key={item.name} href={item.path}>
          <Tooltip delayDuration={0}>
            <TooltipTrigger>
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
            </TooltipTrigger>
            <TooltipContent side='bottom'>
              <p>{item.name}</p>
            </TooltipContent>
          </Tooltip>
        </Link>
      ))}
    </div>
  );
}

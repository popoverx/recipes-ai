import React from 'react';
import { Button } from '@/components/ui/button';
import { IconCrown, IconUser } from '@tabler/icons-react';

export function NavActions() {
  return (
    <div className='flex items-center gap-3'>
      <Button
        variant='ghost'
        size='sm'
        className='cursor-pointer bg-orange-700 text-white hover:bg-orange-600 hover:text-white flex gap-1.5 items-center font-medium'
      >
        <IconCrown className='h-3.5 w-3.5' />
        <span>Upgrade</span>
      </Button>

      <Button
        variant='ghost'
        size='icon'
        className='rounded-full h-9 w-9 bg-gray-100 hover:bg-gray-200'
      >
        <IconUser className='h-4 w-4 text-gray-700' />
      </Button>
    </div>
  );
}

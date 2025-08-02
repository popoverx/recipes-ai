import React, { useState } from 'react';
import { cn } from '@/lib/utils';

export function Tooltip({ children, content, side = 'right', className }) {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div
      className='relative inline-block'
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {children}
      {isVisible && (
        <div
          className={cn(
            'absolute z-50 px-2 py-1 text-xs font-medium text-white bg-gray-800 rounded-md whitespace-nowrap',
            side === 'right' && 'left-full ml-2',
            side === 'left' && 'right-full mr-2',
            side === 'top' && 'bottom-full mb-2 left-1/2 transform -translate-x-1/2',
            side === 'bottom' && 'top-full mt-2 left-1/2 transform -translate-x-1/2',
            className
          )}
        >
          {content}
        </div>
      )}
    </div>
  );
}

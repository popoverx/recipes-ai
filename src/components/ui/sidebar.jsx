import * as React from 'react';
import { cn } from '@/lib/utils';

const SidebarContext = React.createContext({});

function SidebarProvider({ children }) {
  return (
    <SidebarContext.Provider value={{}}>
      <div className='flex h-screen w-full overflow-hidden'>{children}</div>
    </SidebarContext.Provider>
  );
}

function Sidebar({ className, children }) {
  return (
    <div className={cn('flex flex-col border-r border-zinc-300', className || 'w-64')}>
      {children}
    </div>
  );
}

function SidebarInset({ className, children }) {
  return <div className={cn('flex flex-1 flex-col overflow-auto', className)}>{children}</div>;
}

export { SidebarProvider, Sidebar, SidebarInset };

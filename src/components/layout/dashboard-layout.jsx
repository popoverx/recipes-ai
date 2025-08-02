import React from 'react';
import { AppSidebar } from '@/components/app-sidebar';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Sidebar } from '@/components/ui/sidebar';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { IconChefHat, IconBookmarks, IconSearch } from '@tabler/icons-react';

import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { NavActions } from '@/components/nav-actions';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage
} from '@/components/ui/breadcrumb';

export function DashboardLayout({ children, title = 'RecipesAI' }) {
  return (
    <SidebarProvider>
      <SidebarInset>
        <header className='flex h-14 shrink-0 items-center gap-2 border-b border-zinc-300'>
          <div className='flex flex-1 items-center gap-2 px-3'>
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbPage className='line-clamp-1'>
                    {' '}
                    {/* Logo */}
                    <Link href='/' className='flex items-center justify-center h-14'>
                      <Tooltip content='RecipesAI'>
                        <span className='text-xl font-medium font-mono text-orange-600'>
                          🍳 RecipesAI
                        </span>
                      </Tooltip>
                    </Link>
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          <div className='ml-auto px-3'>
            <NavActions />
          </div>
        </header>
        <div className='flex flex-1 flex-col bg-white overflow-hidden'>{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}

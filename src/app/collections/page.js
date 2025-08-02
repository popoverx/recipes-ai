'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { BookOpen, Plus } from 'lucide-react';

export default function CollectionsPage() {
  // Mock collections data
  const [collections, setCollections] = useState([
    {
      id: 1,
      title: 'Quick Weeknight Dinners',
      description: 'Meals ready in 30 minutes or less',
      recipeCount: 12,
      color: 'bg-amber-100'
    },
    {
      id: 2,
      title: 'Vegetarian Favorites',
      description: 'Plant-based recipes for every occasion',
      recipeCount: 8,
      color: 'bg-green-100'
    },
    {
      id: 3,
      title: 'Baking Adventures',
      description: 'Sweet treats and baked goods',
      recipeCount: 15,
      color: 'bg-rose-100'
    },
    {
      id: 4,
      title: 'Holiday Specials',
      description: 'Festive recipes for celebrations',
      recipeCount: 6,
      color: 'bg-blue-100'
    }
  ]);

  return (
    <DashboardLayout>
      <div className='flex flex-col h-screen'>
        {/* Header */}
        <header className='flex items-center justify-between p-4 border-b border-amber-200 bg-white'>
          <h1 className='text-xl font-semibold text-amber-800'>Recipe Collections</h1>
          <Link href='/collections/new'>
            <Button variant='outline' size='sm'>
              <Plus className='h-4 w-4 mr-2' />
              New Collection
            </Button>
          </Link>
        </header>

        {/* Main content */}
        <main className='flex-1 p-4 overflow-y-auto'>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
            {collections.map((collection) => (
              <Link href={`/collections/${collection.id}`} key={collection.id}>
                <Card className='h-full overflow-hidden border-amber-200 hover:shadow-md transition-shadow cursor-pointer'>
                  <div className={`h-24 ${collection.color} flex items-center justify-center`}>
                    <BookOpen className='h-10 w-10 text-gray-700/50' />
                  </div>
                  <CardContent className='p-4'>
                    <h3 className='font-semibold text-amber-800 mb-1'>{collection.title}</h3>
                    <p className='text-sm text-gray-500 mb-2'>{collection.description}</p>
                    <p className='text-xs text-amber-600'>{collection.recipeCount} recipes</p>
                  </CardContent>
                </Card>
              </Link>
            ))}

            <Link href='/collections/new'>
              <Card className='h-full overflow-hidden border-dashed border-amber-300 hover:border-amber-400 bg-amber-50/50 hover:bg-amber-50 transition-colors flex items-center justify-center cursor-pointer'>
                <CardContent className='p-4 text-center'>
                  <div className='flex justify-center mb-2'>
                    <Plus className='h-8 w-8 text-amber-400' />
                  </div>
                  <h3 className='font-semibold text-amber-800'>Create New Collection</h3>
                  <p className='text-sm text-gray-500 mt-1'>Organize your favorite recipes</p>
                </CardContent>
              </Card>
            </Link>
          </div>
        </main>
      </div>
    </DashboardLayout>
  );
}

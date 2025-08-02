'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { Search } from 'lucide-react';

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [results, setResults] = useState([]);

  // Mock recipe data
  const mockRecipes = [
    {
      id: 1,
      title: 'Spaghetti Carbonara',
      cuisine: 'Italian',
      ingredients: ['pasta', 'eggs', 'bacon', 'parmesan cheese', 'black pepper']
    },
    {
      id: 2,
      title: 'Chicken Tikka Masala',
      cuisine: 'Indian',
      ingredients: ['chicken', 'yogurt', 'tomatoes', 'spices', 'cream']
    },
    {
      id: 3,
      title: 'Vegetable Stir Fry',
      cuisine: 'Asian',
      ingredients: ['mixed vegetables', 'tofu', 'soy sauce', 'ginger', 'garlic']
    },
    {
      id: 4,
      title: 'Beef Tacos',
      cuisine: 'Mexican',
      ingredients: ['ground beef', 'taco shells', 'lettuce', 'tomatoes', 'cheese']
    }
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    setIsSearching(true);

    // Simulate API call with timeout
    setTimeout(() => {
      const filtered = mockRecipes.filter(
        (recipe) =>
          recipe.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          recipe.cuisine.toLowerCase().includes(searchQuery.toLowerCase()) ||
          recipe.ingredients.some((ing) => ing.toLowerCase().includes(searchQuery.toLowerCase()))
      );
      setResults(filtered);
      setIsSearching(false);
    }, 500);
  };

  return (
    <DashboardLayout>
      <div className='flex flex-col h-screen'>
        {/* Header */}
        <header className='flex items-center justify-between p-4 border-b border-amber-200 bg-white'>
          <h1 className='text-xl font-semibold text-amber-800'>Search Recipes</h1>
        </header>

        {/* Main content */}
        <main className='flex-1 p-4 overflow-y-auto'>
          <form onSubmit={handleSearch} className='flex gap-2 mb-6'>
            <Input
              className='flex-1'
              value={searchQuery}
              placeholder='Search by recipe name, cuisine, or ingredient...'
              onChange={(e) => setSearchQuery(e.target.value)}
              disabled={isSearching}
            />
            <Button type='submit' disabled={isSearching || !searchQuery.trim()}>
              <Search className='h-4 w-4 mr-2' />
              Search
            </Button>
          </form>

          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
            {results.map((recipe) => (
              <Card key={recipe.id} className='overflow-hidden border-amber-200'>
                <div className='h-32 bg-amber-100 flex items-center justify-center'>
                  <span className='text-3xl'>🍽️</span>
                </div>
                <CardContent className='p-4'>
                  <h3 className='font-semibold text-amber-800 mb-1'>{recipe.title}</h3>
                  <p className='text-sm text-gray-500 mb-2'>{recipe.cuisine} Cuisine</p>
                  <div className='flex flex-wrap gap-1'>
                    {recipe.ingredients.map((ingredient, idx) => (
                      <span
                        key={idx}
                        className='text-xs bg-amber-50 text-amber-700 px-2 py-1 rounded-full'
                      >
                        {ingredient}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
            {searchQuery && results.length === 0 && !isSearching && (
              <div className='col-span-full text-center py-8 text-gray-500'>
                No recipes found matching &quot;{searchQuery}&quot;
              </div>
            )}
          </div>
        </main>
      </div>
    </DashboardLayout>
  );
}

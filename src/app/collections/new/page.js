'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { IconArrowLeft, IconBookmark } from '@tabler/icons-react';

export default function NewCollectionPage() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [collectionType, setCollectionType] = useState('general');

  const colorOptions = [
    { name: 'Amber', class: 'bg-amber-100' },
    { name: 'Rose', class: 'bg-rose-100' },
    { name: 'Green', class: 'bg-green-100' },
    { name: 'Blue', class: 'bg-blue-100' },
    { name: 'Purple', class: 'bg-purple-100' },
    { name: 'Teal', class: 'bg-teal-100' }
  ];

  const [selectedColor, setSelectedColor] = useState(colorOptions[0]);

  // Dietary preferences
  const [dietaryPreferences, setDietaryPreferences] = useState([
    { id: 'vegetarian', label: 'Vegetarian', selected: false },
    { id: 'vegan', label: 'Vegan', selected: false },
    { id: 'gluten-free', label: 'Gluten Free', selected: false },
    { id: 'dairy-free', label: 'Dairy Free', selected: false }
  ]);

  // Cuisine preferences
  const [cuisinePreferences, setCuisinePreferences] = useState([
    { id: 'italian', label: 'Italian', selected: false },
    { id: 'mexican', label: 'Mexican', selected: false },
    { id: 'indian', label: 'Indian', selected: false },
    { id: 'chinese', label: 'Chinese', selected: false }
  ]);

  // Toggle preference selection
  const togglePreference = (id, type) => {
    if (type === 'dietary') {
      setDietaryPreferences(
        dietaryPreferences.map((pref) =>
          pref.id === id ? { ...pref, selected: !pref.selected } : pref
        )
      );
    } else if (type === 'cuisine') {
      setCuisinePreferences(
        cuisinePreferences.map((pref) =>
          pref.id === id ? { ...pref, selected: !pref.selected } : pref
        )
      );
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Get selected preferences
    const selectedDietary = dietaryPreferences
      .filter((pref) => pref.selected)
      .map((pref) => pref.id);
    const selectedCuisines = cuisinePreferences
      .filter((pref) => pref.selected)
      .map((pref) => pref.id);

    // Simulate API call with timeout
    setTimeout(() => {
      // In a real app, you would save the collection to your database here
      console.log('Collection created:', {
        title,
        description,
        color: selectedColor.name,
        type: collectionType,
        dietary: selectedDietary,
        cuisines: selectedCuisines
      });
      router.push('/collections');
    }, 1000);
  };

  return (
    <DashboardLayout>
      <div className='flex flex-col h-screen'>
        {/* Header */}
        <header className='flex items-center justify-between p-4 border-b border-amber-200 bg-white'>
          <div className='flex items-center gap-2'>
            <Button variant='ghost' size='sm' onClick={() => router.back()}>
              <IconArrowLeft className='h-4 w-4' />
            </Button>
            <h1 className='text-xl font-semibold text-amber-800'>Create New Collection</h1>
          </div>
        </header>

        {/* Main content */}
        <main className='flex-1 p-4 overflow-y-auto'>
          <div className='max-w-2xl mx-auto'>
            <Card className='border-amber-200'>
              <CardHeader>
                <CardTitle>New Recipe Collection</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className='space-y-6'>
                  <div className='space-y-2'>
                    <label htmlFor='title' className='block text-sm font-medium text-gray-700'>
                      Collection Title
                    </label>
                    <Input
                      id='title'
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder='e.g., Weekend Brunch Ideas'
                      required
                    />
                  </div>

                  <div className='space-y-2'>
                    <label
                      htmlFor='description'
                      className='block text-sm font-medium text-gray-700'
                    >
                      Description
                    </label>
                    <Input
                      id='description'
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder='A short description of your collection'
                    />
                  </div>

                  <div className='space-y-2'>
                    <label className='block text-sm font-medium text-gray-700'>
                      Collection Type
                    </label>
                    <div className='grid grid-cols-3 gap-2'>
                      <button
                        type='button'
                        className={`px-3 py-2 rounded-md text-sm transition-colors ${
                          collectionType === 'general'
                            ? 'bg-amber-600 text-white'
                            : 'bg-amber-50 text-amber-800 hover:bg-amber-100'
                        }`}
                        onClick={() => setCollectionType('general')}
                      >
                        General
                      </button>
                      <button
                        type='button'
                        className={`px-3 py-2 rounded-md text-sm transition-colors ${
                          collectionType === 'dietary'
                            ? 'bg-amber-600 text-white'
                            : 'bg-amber-50 text-amber-800 hover:bg-amber-100'
                        }`}
                        onClick={() => setCollectionType('dietary')}
                      >
                        Dietary Based
                      </button>
                      <button
                        type='button'
                        className={`px-3 py-2 rounded-md text-sm transition-colors ${
                          collectionType === 'cuisine'
                            ? 'bg-amber-600 text-white'
                            : 'bg-amber-50 text-amber-800 hover:bg-amber-100'
                        }`}
                        onClick={() => setCollectionType('cuisine')}
                      >
                        Cuisine Based
                      </button>
                    </div>
                  </div>

                  {collectionType === 'dietary' && (
                    <div className='space-y-2'>
                      <label className='block text-sm font-medium text-gray-700'>
                        Select Dietary Preferences
                      </label>
                      <div className='grid grid-cols-2 md:grid-cols-4 gap-2'>
                        {dietaryPreferences.map((pref) => (
                          <button
                            key={pref.id}
                            type='button'
                            className={`px-3 py-2 rounded-md text-sm transition-colors ${
                              pref.selected
                                ? 'bg-amber-600 text-white'
                                : 'bg-amber-50 text-amber-800 hover:bg-amber-100'
                            }`}
                            onClick={() => togglePreference(pref.id, 'dietary')}
                          >
                            {pref.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {collectionType === 'cuisine' && (
                    <div className='space-y-2'>
                      <label className='block text-sm font-medium text-gray-700'>
                        Select Cuisines
                      </label>
                      <div className='grid grid-cols-2 md:grid-cols-4 gap-2'>
                        {cuisinePreferences.map((cuisine) => (
                          <button
                            key={cuisine.id}
                            type='button'
                            className={`px-3 py-2 rounded-md text-sm transition-colors ${
                              cuisine.selected
                                ? 'bg-amber-600 text-white'
                                : 'bg-amber-50 text-amber-800 hover:bg-amber-100'
                            }`}
                            onClick={() => togglePreference(cuisine.id, 'cuisine')}
                          >
                            {cuisine.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className='space-y-2'>
                    <label className='block text-sm font-medium text-gray-700'>
                      Choose a Color
                    </label>
                    <div className='grid grid-cols-3 md:grid-cols-6 gap-2'>
                      {colorOptions.map((color) => (
                        <button
                          key={color.name}
                          type='button'
                          className={`h-12 rounded-md ${
                            color.class
                          } flex items-center justify-center ${
                            selectedColor.name === color.name
                              ? 'ring-2 ring-amber-600'
                              : 'hover:ring-1 hover:ring-amber-400'
                          }`}
                          onClick={() => setSelectedColor(color)}
                        >
                          {selectedColor.name === color.name && (
                            <span className='w-2 h-2 bg-amber-600 rounded-full'></span>
                          )}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className='pt-4'>
                    <Button type='submit' className='w-full' disabled={!title || isSubmitting}>
                      <IconBookmark className='h-4 w-4 mr-2' />
                      {isSubmitting ? 'Creating...' : 'Create Collection'}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </DashboardLayout>
  );
}

'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { Save } from 'lucide-react';

export default function SettingsPage() {
  // Dietary preferences
  const [dietaryPreferences, setDietaryPreferences] = useState([
    { id: 'vegetarian', label: 'Vegetarian', selected: false },
    { id: 'vegan', label: 'Vegan', selected: false },
    { id: 'gluten-free', label: 'Gluten Free', selected: false },
    { id: 'dairy-free', label: 'Dairy Free', selected: false },
    { id: 'keto', label: 'Keto', selected: false },
    { id: 'paleo', label: 'Paleo', selected: false },
    { id: 'low-carb', label: 'Low Carb', selected: false },
    { id: 'low-fat', label: 'Low Fat', selected: false },
    { id: 'nut-free', label: 'Nut Free', selected: false },
    { id: 'pescatarian', label: 'Pescatarian', selected: false }
  ]);

  // Cuisine preferences
  const [cuisinePreferences, setCuisinePreferences] = useState([
    { id: 'italian', label: 'Italian', selected: false },
    { id: 'mexican', label: 'Mexican', selected: false },
    { id: 'indian', label: 'Indian', selected: false },
    { id: 'chinese', label: 'Chinese', selected: false },
    { id: 'japanese', label: 'Japanese', selected: false },
    { id: 'thai', label: 'Thai', selected: false },
    { id: 'french', label: 'French', selected: false },
    { id: 'mediterranean', label: 'Mediterranean', selected: false },
    { id: 'american', label: 'American', selected: false },
    { id: 'middle-eastern', label: 'Middle Eastern', selected: false }
  ]);

  // Allergens to avoid
  const [allergensToAvoid, setAllergensToAvoid] = useState([
    { id: 'peanuts', label: 'Peanuts', selected: false },
    { id: 'tree-nuts', label: 'Tree Nuts', selected: false },
    { id: 'dairy', label: 'Dairy', selected: false },
    { id: 'eggs', label: 'Eggs', selected: false },
    { id: 'wheat', label: 'Wheat', selected: false },
    { id: 'soy', label: 'Soy', selected: false },
    { id: 'fish', label: 'Fish', selected: false },
    { id: 'shellfish', label: 'Shellfish', selected: false }
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
    } else if (type === 'allergens') {
      setAllergensToAvoid(
        allergensToAvoid.map((pref) =>
          pref.id === id ? { ...pref, selected: !pref.selected } : pref
        )
      );
    }
  };

  // Save preferences
  const savePreferences = () => {
    // In a real app, you would save these to a database or local storage
    const selectedDietary = dietaryPreferences
      .filter((pref) => pref.selected)
      .map((pref) => pref.id);
    const selectedCuisines = cuisinePreferences
      .filter((pref) => pref.selected)
      .map((pref) => pref.id);
    const selectedAllergens = allergensToAvoid
      .filter((pref) => pref.selected)
      .map((pref) => pref.id);

    console.log('Saved preferences:', {
      dietary: selectedDietary,
      cuisines: selectedCuisines,
      allergens: selectedAllergens
    });

    // Show success message
    alert('Preferences saved successfully!');
  };

  return (
    <DashboardLayout>
      <div className='flex flex-col h-screen'>
        {/* Header */}
        <header className='flex items-center justify-between p-4 border-b border-amber-200 bg-white'>
          <h1 className='text-xl font-semibold text-amber-800'>Settings</h1>
          <Button onClick={savePreferences}>
            <Save className='h-4 w-4 mr-2' />
            Save Preferences
          </Button>
        </header>

        {/* Main content */}
        <main className='flex-1 p-4 overflow-y-auto'>
          <div className='max-w-3xl mx-auto space-y-6'>
            {/* Dietary Preferences */}
            <Card className='border-amber-200'>
              <CardHeader>
                <CardTitle>Dietary Preferences</CardTitle>
              </CardHeader>
              <CardContent>
                <p className='text-sm text-gray-500 mb-4'>
                  Select your dietary preferences to get personalized recipe recommendations.
                </p>
                <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2'>
                  {dietaryPreferences.map((pref) => (
                    <button
                      key={pref.id}
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
              </CardContent>
            </Card>

            {/* Cuisine Preferences */}
            <Card className='border-amber-200'>
              <CardHeader>
                <CardTitle>Favorite Cuisines</CardTitle>
              </CardHeader>
              <CardContent>
                <p className='text-sm text-gray-500 mb-4'>
                  Select cuisines you enjoy to get more relevant recipe suggestions.
                </p>
                <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2'>
                  {cuisinePreferences.map((cuisine) => (
                    <button
                      key={cuisine.id}
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
              </CardContent>
            </Card>

            {/* Allergens */}
            <Card className='border-amber-200'>
              <CardHeader>
                <CardTitle>Allergens to Avoid</CardTitle>
              </CardHeader>
              <CardContent>
                <p className='text-sm text-gray-500 mb-4'>
                  Select ingredients you're allergic to or want to avoid in recipes.
                </p>
                <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2'>
                  {allergensToAvoid.map((allergen) => (
                    <button
                      key={allergen.id}
                      className={`px-3 py-2 rounded-md text-sm transition-colors ${
                        allergen.selected
                          ? 'bg-rose-600 text-white'
                          : 'bg-rose-50 text-rose-800 hover:bg-rose-100'
                      }`}
                      onClick={() => togglePreference(allergen.id, 'allergens')}
                    >
                      {allergen.label}
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </DashboardLayout>
  );
}

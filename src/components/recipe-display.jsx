'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { IconClock, IconUsers, IconReplace, IconCheck, IconAlertCircle } from '@tabler/icons-react';
import { useStore } from '@/lib/store';
import SimplifiedNutritionFacts from '@/components/ui/simplified-nutrition-facts';
import { toast } from 'sonner';
import { Progress } from './ui/progress';

export function RecipeDisplay({ recipe, nutritionData }) {
  if (!recipe) {
    return (
      <div className='flex flex-col items-center justify-center p-8 text-center animate-fadeIn w-full h-full'>
        <div className='mb-4'>
          <IconClock className='h-12 w-12 text-zinc-300' />
        </div>
        <h3 className='text-xl font-medium text-zinc-700 mb-2'>No Recipe yet...</h3>
        <p className='text-zinc-500 max-w-md'>
          Chat with the AI to generate a new recipe. Once generated, it will appear here with full
          instructions and nutrition information.
        </p>
      </div>
    );
  }

  const displayRecipe = recipe;

  // State for tracking checked ingredients and steps
  const [checkedIngredients, setCheckedIngredients] = useState(
    new Array(displayRecipe.ingredients.length).fill(false)
  );
  const [checkedSteps, setCheckedSteps] = useState(
    new Array(displayRecipe.instructions.length).fill(false)
  );
  const [hoveredIngredient, setHoveredIngredient] = useState(null);

  const { appendToInput } = useStore();

  // Toggle checked state for ingredients
  const toggleIngredient = (index, ingredient) => {
    const newCheckedIngredients = [...checkedIngredients];
    const newValue = !newCheckedIngredients[index];
    newCheckedIngredients[index] = newValue;
    setCheckedIngredients(newCheckedIngredients);

    if (newValue) {
      toast.success(`${ingredient} checked!`);
    }
  };

  // Toggle checked state for steps
  const toggleStep = (index) => {
    const newCheckedSteps = [...checkedSteps];
    const newValue = !newCheckedSteps[index];
    newCheckedSteps[index] = newValue;
    setCheckedSteps(newCheckedSteps);

    if (newValue) {
      toast.success(`Step ${index + 1} completed!`, {
        description: displayRecipe.instructions[index]
      });

      // Check if all steps are completed
      if (newCheckedSteps.every((step) => step)) {
        toast.success('🎉 Recipe completed!', {
          description: "You've completed all the steps. Enjoy your meal!"
        });
      }
    }
  };

  return (
    <div className='flex flex-col'>
      <div className='mb-4 animate-fadeIn py-6'>
        <div className='pb-2'>
          <h2 className='text-2xl text-gray-800'>{displayRecipe.title}</h2>
          <div className='flex items-center gap-6 text-sm text-gray-500'>
            <div className='flex items-center gap-1'>
              <IconClock className='h-4 w-4 text-orange-500' />
              <span>Prep: {displayRecipe.prepTime}</span>
            </div>
            <div className='flex items-center gap-1'>
              <IconAlertCircle className='h-4 w-4 text-orange-500' />
              <span>Cook: {displayRecipe.cookTime}</span>
            </div>
            <div className='flex items-center gap-1'>
              <IconUsers className='h-4 w-4 text-orange-500' />
              <span>Serves: {displayRecipe.servings}</span>
            </div>
          </div>
        </div>
      </div>

      <div className='grid grid-cols-3 gap-4'>
        {/* Column 1: Ingredients */}
        <Card className='animate-slideInLeft bg-zinc-50'>
          <CardHeader className='pb-2'>
            <CardTitle className='text-xl text-gray-800 flex items-center'>Ingredients</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className='space-y-3'>
              {displayRecipe.ingredients.map((ingredient, index) => (
                <li
                  key={index}
                  className='group flex items-center gap-2 transition-all duration-300 ease-in-out hover:bg-zinc-100 p-2 rounded-md relative'
                  style={{ animationDelay: `${index * 100}ms` }}
                  onMouseEnter={() => setHoveredIngredient(index)}
                  onMouseLeave={() => setHoveredIngredient(null)}
                >
                  <div
                    className={`w-5 h-5 rounded border flex items-center justify-center cursor-pointer transition-all duration-200
                      ${
                        checkedIngredients[index]
                          ? 'bg-orange-500 border-orange-500 text-white'
                          : 'border-gray-300 hover:border-orange-300'
                      }`}
                    onClick={() => toggleIngredient(index, ingredient)}
                  >
                    {checkedIngredients[index] && <IconCheck className='h-3 w-3' />}
                  </div>
                  <span
                    className={`flex-1 transition-all duration-300 ${
                      checkedIngredients[index] ? 'line-through text-gray-400' : 'text-gray-700'
                    }`}
                  >
                    {ingredient}
                  </span>
                  {hoveredIngredient === index && !checkedIngredients[index] && (
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div
                          role='button'
                          tabIndex={0}
                          className='opacity-0 group-hover:opacity-100 transition-opacity duration-200 p-1 hover:bg-gray-200 rounded-full cursor-pointer'
                          onClick={() => {
                            const query = `I don't have ${ingredient.toLowerCase()}. What can I use as a substitute in this recipe?`;
                            appendToInput(query);
                          }}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                              const query = `I don't have ${ingredient.toLowerCase()}. What can I use as a substitute in this recipe?`;
                              appendToInput(query);
                            }
                          }}
                        >
                          <IconReplace className='h-4 w-4 text-orange-500' />
                        </div>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Find substitutes</p>
                      </TooltipContent>
                    </Tooltip>
                  )}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Column 2: Instructions */}
        <Card className='bg-zinc-50 animate-slideInUp'>
          <CardHeader className='pb-2'>
            <CardTitle className='text-xl text-gray-800 flex items-center'>Instructions</CardTitle>
            <div className='mt-2'>
              <div className='flex justify-between text-sm text-gray-500 mb-1'>
                <span>
                  {checkedSteps.filter(Boolean).length} of {checkedSteps.length} steps completed
                </span>
                <span>
                  {Math.round((checkedSteps.filter(Boolean).length / checkedSteps.length) * 100)}%
                </span>
              </div>
              <Progress
                value={(checkedSteps.filter(Boolean).length / checkedSteps.length) * 100}
                className='mb-1'
              />
            </div>
          </CardHeader>
          <CardContent className=''>
            <ol className='space-y-4'>
              {displayRecipe.instructions.map((step, index) => (
                <li
                  key={index}
                  className='flex gap-3 p-4 rounded-md transition-all duration-300 hover:bg-zinc-100'
                  style={{
                    animationDelay: `${index * 150}ms`,
                    animation: 'fadeIn 0.5s ease-in-out forwards',
                    opacity: 0
                  }}
                >
                  <div
                    className={`mt-0.5 w-6 h-6 rounded-full border flex-shrink-0 flex items-center justify-center cursor-pointer transition-all duration-300
                      ${
                        checkedSteps[index]
                          ? 'bg-orange-500 border-orange-500 text-white transform scale-110'
                          : 'border-gray-300 hover:border-orange-300 hover:scale-110'
                      }`}
                    onClick={() => toggleStep(index)}
                  >
                    {checkedSteps[index] ? (
                      <IconCheck className='h-3 w-3' />
                    ) : (
                      <span className='text-xs font-medium'>{index + 1}</span>
                    )}
                  </div>
                  <span
                    className={`transition-all duration-300 ${
                      checkedSteps[index] ? 'text-gray-400' : 'text-gray-700'
                    }`}
                  >
                    {step}
                  </span>
                </li>
              ))}
            </ol>
          </CardContent>
        </Card>

        {/* Column 3: Nutrition Facts */}
        <div className='animate-slideInRight'>
          <SimplifiedNutritionFacts data={nutritionData || displayRecipe.nutrition} />
        </div>
      </div>
    </div>
  );
}

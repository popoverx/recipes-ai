'use client';

import { useChat } from '@ai-sdk/react';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ChatBubble, ChatBubbleContent, ChatBubbleTool } from '@/components/ui/chat-bubble';
import { Send, Settings } from 'lucide-react';
import { DashboardLayout } from '@/components/layout/dashboard-layout';
import Link from 'next/link';
import { RecipeDisplay } from '@/components/recipe-display';
import { useStore } from '@/lib/store';

export default function ChatPage() {
  const [input, setInput] = useState('');
  const [currentRecipe, setCurrentRecipe] = useState(null);
  const { messages, sendMessage, isLoading } = useChat();

  // Mock user preferences (in a real app, this would come from a database or local storage)
  const [userPreferences, setUserPreferences] = useState({
    dietary: ['vegetarian'],
    cuisines: ['italian', 'mexican'],
    allergens: ['peanuts']
  });

  // Function to apply user preferences to the chat
  const applyPreferences = () => {
    if (
      userPreferences.dietary.length === 0 &&
      userPreferences.cuisines.length === 0 &&
      userPreferences.allergens.length === 0
    ) {
      return;
    }

    let preferenceMessage = 'I have the following preferences:\n';

    if (userPreferences.dietary.length > 0) {
      preferenceMessage += `- Dietary: ${userPreferences.dietary.join(', ')}\n`;
    }

    if (userPreferences.cuisines.length > 0) {
      preferenceMessage += `- Favorite cuisines: ${userPreferences.cuisines.join(', ')}\n`;
    }

    if (userPreferences.allergens.length > 0) {
      preferenceMessage += `- Allergies/Avoid: ${userPreferences.allergens.join(', ')}\n`;
    }

    preferenceMessage += 'Please consider these when suggesting recipes.';

    sendMessage({ text: preferenceMessage });
  };

  return (
    <DashboardLayout>
      <div className='flex flex-col h-screen'>
        {/* Header */}
        <header className='flex items-center justify-between p-4 border-b border-amber-200 bg-white'>
          <h1 className='text-xl font-semibold text-amber-800'>Recipe Chat</h1>
          <div className='flex items-center gap-2'>
            <Button
              variant='outline'
              size='sm'
              onClick={applyPreferences}
              disabled={
                userPreferences.dietary.length === 0 &&
                userPreferences.cuisines.length === 0 &&
                userPreferences.allergens.length === 0
              }
            >
              Apply My Preferences
            </Button>
            <Link href='/settings'>
              <Button variant='ghost' size='icon'>
                <Settings className='h-5 w-5' />
              </Button>
            </Link>
          </div>
        </header>

        {/* Main content */}
        <main className='flex-1 flex h-[calc(100vh-3.5rem)] overflow-hidden'>
          <div className='flex-1 overflow-y-auto p-4 space-y-4'>
            {currentRecipe && (
              <div className='mb-6'>
                <RecipeDisplay recipe={currentRecipe} nutritionData={currentRecipe?.nutrition} />
              </div>
            )}
            <div className='flex-1 overflow-y-auto mb-4 space-y-6'>
              {messages.length === 0 ? (
                <div className='flex flex-col items-center justify-center h-64 text-center'>
                  <p className='text-gray-500 max-w-md'>
                    Start a conversation to get recipe ideas and cooking tips.
                    {userPreferences.dietary.length > 0 ||
                    userPreferences.cuisines.length > 0 ||
                    userPreferences.allergens.length > 0 ? (
                      <span>
                        {' '}
                        You can click "Apply My Preferences" to let the AI know about your dietary
                        preferences and favorite cuisines.
                      </span>
                    ) : (
                      <span>
                        {' '}
                        You can set your dietary preferences and favorite cuisines in the Settings.
                      </span>
                    )}
                  </p>
                  <div className='mt-6 grid grid-cols-1 md:grid-cols-2 gap-3 w-full max-w-lg'>
                    <Button
                      variant='outline'
                      className='h-auto justify-start p-3 text-left'
                      onClick={() =>
                        sendMessage({
                          text: 'What can I make with the ingredients I have in my fridge?'
                        })
                      }
                    >
                      <div>
                        <div className='font-medium'>Fridge clean-out ideas</div>
                        <p className='text-xs text-gray-500'>Use what you already have</p>
                      </div>
                    </Button>
                    <Button
                      variant='outline'
                      className='h-auto justify-start p-3 text-left'
                      onClick={() =>
                        sendMessage({ text: 'I need a quick 15-minute dinner recipe' })
                      }
                    >
                      <div>
                        <div className='font-medium'>Quick dinner</div>
                        <p className='text-xs text-gray-500'>Ready in 15 minutes</p>
                      </div>
                    </Button>
                  </div>
                </div>
              ) : (
                messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <ChatBubble role={message.role}>
                      {message.parts.map((part, i) => {
                        switch (part.type) {
                          case 'text':
                            return (
                              <ChatBubbleContent key={`${message.id}-${i}`}>
                                {part.text}
                              </ChatBubbleContent>
                            );
                          case 'tool-generateRecipe':
                            const recipe = part.result?.recipe;
                            console.log('Generated Recipe:', recipe);
                            // Only update if we have a valid recipe with required fields
                            if (
                              recipe?.title &&
                              recipe?.ingredients &&
                              recipe?.instructions &&
                              recipe !== currentRecipe
                            ) {
                              // Ensure the recipe has all required fields in the correct format
                              const formattedRecipe = {
                                ...recipe,
                                nutrition: {
                                  ...recipe.nutrition,
                                  // Ensure nutrition values are strings
                                  totalFat: String(recipe.nutrition.totalFat).includes('g')
                                    ? recipe.nutrition.totalFat
                                    : `${recipe.nutrition.totalFat}g`,
                                  saturatedFat: String(recipe.nutrition.saturatedFat).includes('g')
                                    ? recipe.nutrition.saturatedFat
                                    : `${recipe.nutrition.saturatedFat}g`,
                                  transFat: String(recipe.nutrition.transFat).includes('g')
                                    ? recipe.nutrition.transFat
                                    : `${recipe.nutrition.transFat}g`,
                                  cholesterol: String(recipe.nutrition.cholesterol).includes('mg')
                                    ? recipe.nutrition.cholesterol
                                    : `${recipe.nutrition.cholesterol}mg`,
                                  sodium: String(recipe.nutrition.sodium).includes('mg')
                                    ? recipe.nutrition.sodium
                                    : `${recipe.nutrition.sodium}mg`,
                                  totalCarbs: String(recipe.nutrition.totalCarbs).includes('g')
                                    ? recipe.nutrition.totalCarbs
                                    : `${recipe.nutrition.totalCarbs}g`,
                                  dietaryFiber: String(recipe.nutrition.dietaryFiber).includes('g')
                                    ? recipe.nutrition.dietaryFiber
                                    : `${recipe.nutrition.dietaryFiber}g`,
                                  totalSugars: String(recipe.nutrition.totalSugars).includes('g')
                                    ? recipe.nutrition.totalSugars
                                    : `${recipe.nutrition.totalSugars}g`,
                                  addedSugars: String(recipe.nutrition.addedSugars).includes('g')
                                    ? recipe.nutrition.addedSugars
                                    : `${recipe.nutrition.addedSugars}g`,
                                  protein: String(recipe.nutrition.protein).includes('g')
                                    ? recipe.nutrition.protein
                                    : `${recipe.nutrition.protein}g`
                                }
                              };
                              console.log('Formatted Recipe:', formattedRecipe);
                              setCurrentRecipe(formattedRecipe);
                            }
                            return (
                              <ChatBubbleTool key={`${message.id}-${i}`} toolType='generateRecipe'>
                                <div className='space-y-4'>
                                  <p className='text-xs text-amber-700 font-medium mb-1'>
                                    Generated Recipe:
                                  </p>
                                  <Button
                                    onClick={() => setCurrentRecipe(recipe)}
                                    variant='outline'
                                    className='w-full'
                                  >
                                    Show Recipe Details
                                  </Button>
                                </div>
                              </ChatBubbleTool>
                            );
                          case 'tool-searchRecipe':
                            return (
                              <ChatBubbleTool key={`${message.id}-${i}`} toolType='searchRecipe'>
                                <p className='text-xs text-amber-700 font-medium mb-1'>
                                  Recipe Ideas:
                                </p>
                                <ul className='list-disc pl-5 text-sm'>
                                  {part.result && part.result.recipeIdeas ? (
                                    part.result.recipeIdeas.map((idea, idx) => (
                                      <li key={idx}>{idea}</li>
                                    ))
                                  ) : (
                                    <li>Searching for recipes...</li>
                                  )}
                                </ul>
                              </ChatBubbleTool>
                            );
                          default:
                            if (part.type && part.type.startsWith('tool-')) {
                              return (
                                <ChatBubbleTool key={`${message.id}-${i}`}>
                                  <p className='text-xs text-gray-700 font-medium mb-1'>
                                    Tool: {part.type.replace('tool-', '')}
                                  </p>
                                  {part.result && (
                                    <pre className='text-xs overflow-auto'>
                                      {JSON.stringify(part.result, null, 2)}
                                    </pre>
                                  )}
                                </ChatBubbleTool>
                              );
                            }
                            return null;
                        }
                      })}
                    </ChatBubble>
                  </div>
                ))
              )}
              {isLoading && (
                <div className='flex justify-start'>
                  <ChatBubble>
                    <div className='flex items-center gap-2'>
                      <div className='w-2 h-2 bg-amber-600 rounded-full animate-pulse'></div>
                      <div className='w-2 h-2 bg-amber-600 rounded-full animate-pulse delay-150'></div>
                      <div className='w-2 h-2 bg-amber-600 rounded-full animate-pulse delay-300'></div>
                    </div>
                  </ChatBubble>
                </div>
              )}
            </div>

            {/* Input area */}
          </div>
          <div className='sticky bottom-0 bg-gradient-to-b from-amber-50/80 to-orange-50 p-4 border-t border-amber-100 shadow-sm'>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (input.trim()) {
                  sendMessage({ text: input });
                  setInput('');
                }
              }}
              className='flex gap-2 items-center'
            >
              <Input
                className='flex-1'
                value={input}
                placeholder='Ask about a recipe or list ingredients you have...'
                onChange={(e) => setInput(e.target.value)}
                disabled={isLoading}
              />
              <Button type='submit' disabled={isLoading || !input.trim()} className='px-4'>
                <Send className='h-4 w-4 mr-2' />
                Send
              </Button>
            </form>
          </div>
        </main>
      </div>
    </DashboardLayout>
  );
}

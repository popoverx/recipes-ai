'use client';

import { useChat } from '@ai-sdk/react';
import { useState, useEffect } from 'react';
import { useStore } from '@/lib/store';
import { Button } from '@/components/ui/button';
import { ChatBubble, ChatBubbleContent, ChatBubbleTool } from '@/components/ui/chat-bubble';
import { ChevronRight } from 'lucide-react';
import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { RecipeDisplay } from '@/components/recipe-display';
import { getRecipeByQuery } from '@/lib/sample-recipes';
import { extractNutritionData } from '@/lib/nutrition-parser';
import { IconArrowNarrowUp } from '@tabler/icons-react';

export default function Home() {
  const { messages, sendMessage, isLoading } = useChat();
  const [currentRecipe, setCurrentRecipe] = useState(null);
  const [showRecipe, setShowRecipe] = useState(true);
  const [nutritionData, setNutritionData] = useState(null);

  const { inputValue: input, setInputValue: setInput } = useStore();

  // Update recipe when new messages arrive
  useEffect(() => {
    if (messages.length > 0) {
      // Get the latest message from the user
      const latestUserMessage = [...messages].reverse().find((msg) => msg.role === 'user');
      // Get the latest message from the assistant
      const latestAssistantMessage = [...messages]
        .reverse()
        .find((msg) => msg.role === 'assistant');

      if (latestUserMessage) {
        // Find a recipe based on the user's query
        const recipe = getRecipeByQuery(latestUserMessage.parts[0].text);
        setCurrentRecipe(recipe);
      }

      // Extract nutrition data from assistant's response if available
      if (latestAssistantMessage && latestAssistantMessage.parts[0]?.text) {
        const extractedData = extractNutritionData(latestAssistantMessage.parts[0].text);
        if (extractedData) {
          setNutritionData(extractedData);
        }
      }
    }
  }, [messages]);

  // Function to handle recipe generation
  const handleGenerateRecipe = () => {
    setShowRecipe(true);
  };

  // Function to update recipe based on a specific query
  const handleSpecificRecipe = (query) => {
    // Add nutrition information request to the query
    const enhancedQuery = `${query}. Please include detailed nutrition facts information in your response, including calories, fat, carbohydrates, protein, vitamins and minerals with daily value percentages.`;

    sendMessage({ text: enhancedQuery });

    // Show loading state
    setTimeout(() => {
      const recipe = getRecipeByQuery(query);
      setCurrentRecipe(recipe);
      setShowRecipe(true);
    }, 1500);
  };

  return (
    <DashboardLayout title='RecipesAI'>
      <div className='flex h-screen overflow-hidden'>
        {/* Chat Section - Left Side */}
        <div
          className={`relative flex flex-col ${
            showRecipe ? 'w-1/4 border-r border-zinc-300' : 'w-full'
          }`}
        >
          {/* Chat Messages - Scrollable Area */}
          <div className='absolute inset-0 bottom-24 overflow-y-auto p-4 space-y-6'>
            {messages.length === 0 ? (
              <div className=''>
                <div className='text-center mb-4'>
                  <h2 className='text-xl font-semibold'>Welcome to RecipesAI!</h2>
                  <p className='text-gray-600'>
                    Ask me to create recipes based on ingredients you have, dietary preferences, or
                    cuisine types.
                  </p>
                </div>
                <div className='grid grid-cols-1 gap-3'>
                  <Button
                    variant='outline'
                    className='h-auto justify-start p-3 text-left hover:bg-gray-50'
                    onClick={() =>
                      handleSpecificRecipe(
                        'Create a quick pasta recipe with ingredients most people have at home'
                      )
                    }
                  >
                    <div>
                      <div className='font-medium'>Quick pasta recipe</div>
                      <p className='text-xs text-gray-500'>With common ingredients</p>
                    </div>
                  </Button>
                  <Button
                    variant='outline'
                    className='h-auto justify-start p-3 text-left hover:bg-gray-50'
                    onClick={() =>
                      handleSpecificRecipe('What can I make with chicken, bell peppers, and rice?')
                    }
                  >
                    <div>
                      <div className='font-medium'>Use specific ingredients</div>
                      <p className='text-xs text-gray-500'>Chicken, bell peppers, rice</p>
                    </div>
                  </Button>
                  <Button
                    variant='outline'
                    className='h-auto justify-start p-3 text-left hover:bg-gray-50'
                    onClick={() => handleSpecificRecipe('Give me a vegetarian dinner idea')}
                  >
                    <div>
                      <div className='font-medium'>Vegetarian dinner</div>
                      <p className='text-xs text-gray-500'>Plant-based meal ideas</p>
                    </div>
                  </Button>
                  <Button
                    variant='outline'
                    className='h-auto justify-start p-3 text-left hover:bg-gray-50'
                    onClick={() => handleSpecificRecipe('I need a gluten-free dessert recipe')}
                  >
                    <div>
                      <div className='font-medium'>Gluten-free dessert</div>
                      <p className='text-xs text-gray-500'>Sweet treats without gluten</p>
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
                              {message.role === 'assistant' && (
                                <div className='mt-2'>
                                  <Button
                                    size='xs'
                                    className='bg-zinc-900 hover:bg-zinc-800 text-white px-2 py-1 text-xs cursor-pointer'
                                    onClick={handleGenerateRecipe}
                                  >
                                    {showRecipe ? 'Update Recipe' : 'View Recipe'}{' '}
                                    <ChevronRight className='ml-1 h-4 w-4' />
                                  </Button>
                                </div>
                              )}
                            </ChatBubbleContent>
                          );
                        case 'tool-searchRecipe':
                          return (
                            <ChatBubbleTool key={`${message.id}-${i}`} toolType='searchRecipe'>
                              <p className='text-xs text-orange-600 font-medium mb-1'>
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
                                <p className='text-xs text-gray-600 font-medium mb-1'>
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
                    <div className='w-2 h-2 bg-orange-500 rounded-full animate-pulse'></div>
                    <div className='w-2 h-2 bg-orange-500 rounded-full animate-pulse delay-150'></div>
                    <div className='w-2 h-2 bg-orange-500 rounded-full animate-pulse delay-300'></div>
                  </div>
                </ChatBubble>
              </div>
            )}
            <br />
          </div>

          {/* Input area - Fixed at bottom */}
          <div className='absolute bottom-2 left-6 right-6'>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (input.trim()) {
                  // Add nutrition information request to the query
                  const enhancedQuery = `${input.trim()}. Please include detailed nutrition facts information in your response, including calories, fat, carbohydrates, protein, vitamins and minerals with daily value percentages.`;

                  sendMessage({ text: enhancedQuery });
                  setInput('');

                  // If recipe is not showing, show it after a delay
                  if (!showRecipe) {
                    setTimeout(() => {
                      setShowRecipe(true);
                    }, 1500);
                  }
                }
              }}
              className='group flex flex-col gap-2 rounded-3xl border border-zinc-200 bg-zinc-100 p-3 transition-colors duration-150 ease-in-out relative focus-within:ring-2 focus-within:ring-zinc-800'
            >
              <div className='relative flex flex-1 items-center'>
                <textarea
                  className='flex w-full ring-offset-background placeholder:text-sm placeholder:text-gray-500 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 resize-none leading-snug md:text-sm focus-visible:ring-0 focus-visible:ring-offset-0 max-h-[200px] bg-transparent focus:bg-transparent flex-1 m-1 rounded-md p-0'
                  value={input}
                  placeholder='Ask about a recipe or list ingredients you have...'
                  onChange={(e) => {
                    setInput(e.target.value);
                    // Auto-adjust height
                    e.target.style.height = 'auto';
                    e.target.style.height = Math.min(e.target.scrollHeight, 200) + 'px';
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      e.target.form.dispatchEvent(new Event('submit', { cancelable: true }));
                    }
                  }}
                  disabled={isLoading}
                  style={{ minHeight: '40px', height: '40px' }}
                  maxLength={50000}
                />
              </div>
              <div className='flex items-center gap-1'>
                <div className='ml-auto flex items-center gap-1'>
                  <button
                    title='Send message'
                    type='submit'
                    disabled={isLoading || !input.trim()}
                    className='flex size-6 items-center justify-center rounded-full bg-zinc-900 hover:bg-zinc-800 cursor-pointer text-white transition-opacity duration-150 ease-out disabled:cursor-not-allowed disabled:opacity-50'
                  >
                    <IconArrowNarrowUp className='shrink-0 h-4 w-4' />
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>

        {/* Recipe Display - Right Side */}
        {showRecipe && (
          <div className='w-3/4 flex flex-col h-full overflow-hidden'>
            <div className='p-8 overflow-y-auto flex-1'>
              <RecipeDisplay recipe={currentRecipe} />
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}

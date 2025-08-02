import { openai } from '@ai-sdk/openai';
import { streamText, UIMessage, convertToModelMessages, tool, stepCountIs } from 'ai';
import { z } from 'zod';

export const maxDuration = 30;

export async function POST(req) {
  const { messages } = await req.json();

  const result = streamText({
    model: openai('gpt-4o'),
    messages: convertToModelMessages(messages),
    stopWhen: stepCountIs(3),
    systemPrompt: `You are a helpful AI chef assistant that helps users create delicious recipes.
    
    When a user asks for a recipe, follow these steps:
    1. Understand their dietary preferences, restrictions, or specific ingredients they want to use
    2. Generate a complete recipe using the generateRecipe tool with:
       - Accurate title, prep time, cook time, and servings
       - Detailed ingredients list with quantities
       - Clear step-by-step instructions
       - Complete nutrition information including all daily values
    3. Offer helpful cooking tips or variations when appropriate
    
    IMPORTANT: Always use the generateRecipe tool to format the recipe data properly. The tool requires:
    - All nutrition values as strings (e.g., "15g" not just 15)
    - All daily values (dv*) as numbers (e.g., 23 for 23%)
    - Complete nutrition information including all fields
    
    Example nutrition format:
    {
      calories: 400,
      servingSize: "1 cup (250g)",
      totalFat: "15g",
      dvTotalFat: 23,
      // ... include ALL nutrition fields
    }
    
    Always be friendly, creative, and encouraging. If the user doesn't specify ingredients or preferences, 
    ask follow-up questions to better understand what they're looking for.`,
    tools: {
      generateRecipe: tool({
        description: 'Generate a complete recipe with all details',
        inputSchema: z.object({
          title: z.string().describe('Recipe title'),
          prepTime: z.string().describe('Preparation time'),
          cookTime: z.string().describe('Cooking time'),
          servings: z.number().describe('Number of servings'),
          ingredients: z.array(z.string()).describe('List of ingredients with quantities'),
          instructions: z.array(z.string()).describe('Step by step cooking instructions'),
          nutrition: z
            .object({
              calories: z.number(),
              servingsPerContainer: z.number(),
              servingSize: z.string(),
              totalFat: z.string(),
              saturatedFat: z.string(),
              transFat: z.string(),
              cholesterol: z.string(),
              sodium: z.string(),
              totalCarbs: z.string(),
              dietaryFiber: z.string(),
              totalSugars: z.string(),
              addedSugars: z.string(),
              protein: z.string(),
              vitaminD: z.string(),
              calcium: z.string(),
              iron: z.string(),
              potassium: z.string(),
              dvTotalFat: z.number(),
              dvSaturatedFat: z.number(),
              dvCholesterol: z.number(),
              dvSodium: z.number(),
              dvTotalCarbs: z.number(),
              dvDietaryFiber: z.number(),
              dvAddedSugars: z.number(),
              dvVitaminD: z.number(),
              dvCalcium: z.number(),
              dvIron: z.number(),
              dvPotassium: z.number()
            })
            .describe('Complete nutrition information')
        }),
        execute: async (recipe) => {
          // Return the formatted recipe that matches RecipeDisplay component's structure
          return {
            recipe: {
              id: recipe.title.toLowerCase().replace(/\s+/g, '-'),
              ...recipe
            }
          };
        }
      }),
      searchRecipe: tool({
        description: 'Search for recipe ideas based on ingredients or cuisine',
        inputSchema: z.object({
          ingredients: z.array(z.string()).describe('List of main ingredients available'),
          cuisine: z
            .string()
            .optional()
            .describe('Optional cuisine type (e.g., Italian, Mexican, etc.)'),
          dietary: z
            .string()
            .optional()
            .describe('Optional dietary restrictions (e.g., vegetarian, gluten-free, etc.)')
        }),
        execute: async ({ ingredients, cuisine, dietary }) => {
          // In a real app, this would call an external API or database
          // For now, we'll simulate a response
          return {
            recipeIdeas: [
              `${cuisine || 'Classic'} ${ingredients.join(' and ')} ${
                dietary ? `(${dietary})` : ''
              }`,
              `Quick ${ingredients.join(' & ')} dish ${dietary ? `(${dietary})` : ''}`,
              `Gourmet ${ingredients.join(' with ')} ${cuisine ? `${cuisine} style` : ''} ${
                dietary ? `(${dietary})` : ''
              }`
            ]
          };
        }
      })
    }
  });

  return result.toUIMessageStreamResponse();
}

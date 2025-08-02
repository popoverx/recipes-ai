/**
 * Parses nutrition information from AI responses and converts it to the required format
 * for the NutritionFacts component.
 */

/**
 * Extract nutrition data from AI response text
 * @param {string} text - The AI response text containing nutrition information
 * @returns {Object|null} - Formatted nutrition data or null if parsing fails
 */
export function extractNutritionData(text) {
  try {
    // Default values in case parsing fails
    const defaultData = {
      servingsPerContainer: 3,
      servingSize: '3 pretzels (28g)',
      calories: {
        perServing: 110,
        perContainer: 330
      },
      totalFat: {
        perServing: { amount: '0.5g', dailyValue: 1 },
        perContainer: { amount: '1.5g', dailyValue: 3 }
      },
      saturatedFat: {
        perServing: { amount: '0g', dailyValue: 0 },
        perContainer: { amount: '0g', dailyValue: 0 }
      },
      transFat: {
        perServing: '0g',
        perContainer: '0g'
      },
      cholesterol: {
        perServing: { amount: '0mg', dailyValue: 0 },
        perContainer: { amount: '0mg', dailyValue: 0 }
      },
      sodium: {
        perServing: { amount: '400mg', dailyValue: 17 },
        perContainer: { amount: '1200mg', dailyValue: 52 }
      },
      totalCarbohydrate: {
        perServing: { amount: '23g', dailyValue: 8 },
        perContainer: { amount: '69g', dailyValue: 24 }
      },
      dietaryFiber: {
        perServing: { amount: '2g', dailyValue: 7 },
        perContainer: { amount: '6g', dailyValue: 21 }
      },
      totalSugars: {
        perServing: '<1g',
        perContainer: '3g'
      },
      addedSugars: {
        perServing: { amount: '0g', dailyValue: 0 },
        perContainer: { amount: '0g', dailyValue: 0 }
      },
      protein: {
        perServing: '3g',
        perContainer: '9g'
      },
      vitaminD: {
        perServing: { amount: '0mcg', dailyValue: 0 },
        perContainer: { amount: '0mcg', dailyValue: 0 }
      },
      calcium: {
        perServing: { amount: '10mg', dailyValue: 0 },
        perContainer: { amount: '30mg', dailyValue: 2 }
      },
      iron: {
        perServing: { amount: '1.2mg', dailyValue: 6 },
        perContainer: { amount: '3.6mg', dailyValue: 18 }
      },
      potassium: {
        perServing: { amount: '90mg', dailyValue: 0 },
        perContainer: { amount: '270mg', dailyValue: 5 }
      }
    };

    // If no text is provided, return default data
    if (!text) return defaultData;

    // Look for nutrition information section in the AI response
    const nutritionSectionRegex =
      /nutrition(?:\s+facts)?(?:\s+information)?:?(?:\s*\n|\s*\(per serving\))([\s\S]+?)(?:\n\n|\n[A-Z]|$)/i;
    const nutritionMatch = text.match(nutritionSectionRegex);

    if (!nutritionMatch) return defaultData;

    const nutritionText = nutritionMatch[1];
    const result = { ...defaultData };

    // Extract serving information
    const servingSizeMatch = text.match(/serving size:?\s*([^,\n]+)/i);
    if (servingSizeMatch) {
      result.servingSize = servingSizeMatch[1].trim();
    }

    const servingsPerContainerMatch = text.match(/servings per container:?\s*(\d+)/i);
    if (servingsPerContainerMatch) {
      result.servingsPerContainer = parseInt(servingsPerContainerMatch[1], 10);
    }

    // Extract calories
    const caloriesMatch = nutritionText.match(/calories:?\s*(\d+)/i);
    if (caloriesMatch) {
      const calories = parseInt(caloriesMatch[1], 10);
      result.calories = {
        perServing: calories,
        perContainer: calories * result.servingsPerContainer
      };
    }

    // Extract total fat
    const totalFatMatch = nutritionText.match(
      /total fat:?\s*([\d.]+)([a-z]+)(?:\s*\(?([\d.]+)%\)?)?/i
    );
    if (totalFatMatch) {
      const amount = `${totalFatMatch[1]}${totalFatMatch[2]}`;
      const dailyValue = totalFatMatch[3] ? parseInt(totalFatMatch[3], 10) : 0;
      result.totalFat = {
        perServing: { amount, dailyValue },
        perContainer: {
          amount: `${(parseFloat(totalFatMatch[1]) * result.servingsPerContainer)
            .toFixed(1)
            .replace(/\.0$/, '')}${totalFatMatch[2]}`,
          dailyValue: dailyValue * result.servingsPerContainer
        }
      };
    }

    // Extract saturated fat
    const saturatedFatMatch = nutritionText.match(
      /saturated fat:?\s*([\d.]+)([a-z]+)(?:\s*\(?([\d.]+)%\)?)?/i
    );
    if (saturatedFatMatch) {
      const amount = `${saturatedFatMatch[1]}${saturatedFatMatch[2]}`;
      const dailyValue = saturatedFatMatch[3] ? parseInt(saturatedFatMatch[3], 10) : 0;
      result.saturatedFat = {
        perServing: { amount, dailyValue },
        perContainer: {
          amount: `${(parseFloat(saturatedFatMatch[1]) * result.servingsPerContainer)
            .toFixed(1)
            .replace(/\.0$/, '')}${saturatedFatMatch[2]}`,
          dailyValue: dailyValue * result.servingsPerContainer
        }
      };
    }

    // Extract trans fat
    const transFatMatch = nutritionText.match(/trans fat:?\s*([\d.]+)([a-z]+)/i);
    if (transFatMatch) {
      const amount = `${transFatMatch[1]}${transFatMatch[2]}`;
      result.transFat = {
        perServing: amount,
        perContainer: `${(parseFloat(transFatMatch[1]) * result.servingsPerContainer)
          .toFixed(1)
          .replace(/\.0$/, '')}${transFatMatch[2]}`
      };
    }

    // Extract cholesterol
    const cholesterolMatch = nutritionText.match(
      /cholesterol:?\s*([\d.]+)([a-z]+)(?:\s*\(?([\d.]+)%\)?)?/i
    );
    if (cholesterolMatch) {
      const amount = `${cholesterolMatch[1]}${cholesterolMatch[2]}`;
      const dailyValue = cholesterolMatch[3] ? parseInt(cholesterolMatch[3], 10) : 0;
      result.cholesterol = {
        perServing: { amount, dailyValue },
        perContainer: {
          amount: `${(parseFloat(cholesterolMatch[1]) * result.servingsPerContainer)
            .toFixed(1)
            .replace(/\.0$/, '')}${cholesterolMatch[2]}`,
          dailyValue: dailyValue * result.servingsPerContainer
        }
      };
    }

    // Extract sodium
    const sodiumMatch = nutritionText.match(/sodium:?\s*([\d.]+)([a-z]+)(?:\s*\(?([\d.]+)%\)?)?/i);
    if (sodiumMatch) {
      const amount = `${sodiumMatch[1]}${sodiumMatch[2]}`;
      const dailyValue = sodiumMatch[3] ? parseInt(sodiumMatch[3], 10) : 0;
      result.sodium = {
        perServing: { amount, dailyValue },
        perContainer: {
          amount: `${(parseFloat(sodiumMatch[1]) * result.servingsPerContainer)
            .toFixed(1)
            .replace(/\.0$/, '')}${sodiumMatch[2]}`,
          dailyValue: dailyValue * result.servingsPerContainer
        }
      };
    }

    // Extract total carbohydrates
    const totalCarbMatch = nutritionText.match(
      /total carb(?:ohydrate)?s?:?\s*([\d.]+)([a-z]+)(?:\s*\(?([\d.]+)%\)?)?/i
    );
    if (totalCarbMatch) {
      const amount = `${totalCarbMatch[1]}${totalCarbMatch[2]}`;
      const dailyValue = totalCarbMatch[3] ? parseInt(totalCarbMatch[3], 10) : 0;
      result.totalCarbohydrate = {
        perServing: { amount, dailyValue },
        perContainer: {
          amount: `${(parseFloat(totalCarbMatch[1]) * result.servingsPerContainer)
            .toFixed(1)
            .replace(/\.0$/, '')}${totalCarbMatch[2]}`,
          dailyValue: dailyValue * result.servingsPerContainer
        }
      };
    }

    // Extract dietary fiber
    const fiberMatch = nutritionText.match(
      /(?:dietary )?fiber:?\s*([\d.]+)([a-z]+)(?:\s*\(?([\d.]+)%\)?)?/i
    );
    if (fiberMatch) {
      const amount = `${fiberMatch[1]}${fiberMatch[2]}`;
      const dailyValue = fiberMatch[3] ? parseInt(fiberMatch[3], 10) : 0;
      result.dietaryFiber = {
        perServing: { amount, dailyValue },
        perContainer: {
          amount: `${(parseFloat(fiberMatch[1]) * result.servingsPerContainer)
            .toFixed(1)
            .replace(/\.0$/, '')}${fiberMatch[2]}`,
          dailyValue: dailyValue * result.servingsPerContainer
        }
      };
    }

    // Extract total sugars
    const totalSugarsMatch = nutritionText.match(/total sugars:?\s*(<?\s*[\d.]+)([a-z]+)/i);
    if (totalSugarsMatch) {
      const amount = `${totalSugarsMatch[1]}${totalSugarsMatch[2]}`;
      result.totalSugars = {
        perServing: amount,
        perContainer: amount.startsWith('<')
          ? `${parseInt(amount.replace(/[^0-9]/g, '')) * result.servingsPerContainer}${
              totalSugarsMatch[2]
            }`
          : `${(parseFloat(totalSugarsMatch[1]) * result.servingsPerContainer)
              .toFixed(1)
              .replace(/\.0$/, '')}${totalSugarsMatch[2]}`
      };
    }

    // Extract added sugars
    const addedSugarsMatch = nutritionText.match(
      /added sugars:?\s*([\d.]+)([a-z]+)(?:\s*\(?([\d.]+)%\)?)?/i
    );
    if (addedSugarsMatch) {
      const amount = `${addedSugarsMatch[1]}${addedSugarsMatch[2]}`;
      const dailyValue = addedSugarsMatch[3] ? parseInt(addedSugarsMatch[3], 10) : 0;
      result.addedSugars = {
        perServing: { amount, dailyValue },
        perContainer: {
          amount: `${(parseFloat(addedSugarsMatch[1]) * result.servingsPerContainer)
            .toFixed(1)
            .replace(/\.0$/, '')}${addedSugarsMatch[2]}`,
          dailyValue: dailyValue * result.servingsPerContainer
        }
      };
    }

    // Extract protein
    const proteinMatch = nutritionText.match(/protein:?\s*([\d.]+)([a-z]+)/i);
    if (proteinMatch) {
      const amount = `${proteinMatch[1]}${proteinMatch[2]}`;
      result.protein = {
        perServing: amount,
        perContainer: `${(parseFloat(proteinMatch[1]) * result.servingsPerContainer)
          .toFixed(1)
          .replace(/\.0$/, '')}${proteinMatch[2]}`
      };
    }

    // Extract vitamin D
    const vitaminDMatch = nutritionText.match(
      /vitamin d:?\s*([\d.]+)([a-z]+)(?:\s*\(?([\d.]+)%\)?)?/i
    );
    if (vitaminDMatch) {
      const amount = `${vitaminDMatch[1]}${vitaminDMatch[2]}`;
      const dailyValue = vitaminDMatch[3] ? parseInt(vitaminDMatch[3], 10) : 0;
      result.vitaminD = {
        perServing: { amount, dailyValue },
        perContainer: {
          amount: `${(parseFloat(vitaminDMatch[1]) * result.servingsPerContainer)
            .toFixed(1)
            .replace(/\.0$/, '')}${vitaminDMatch[2]}`,
          dailyValue: dailyValue * result.servingsPerContainer
        }
      };
    }

    // Extract calcium
    const calciumMatch = nutritionText.match(
      /calcium:?\s*([\d.]+)([a-z]+)(?:\s*\(?([\d.]+)%\)?)?/i
    );
    if (calciumMatch) {
      const amount = `${calciumMatch[1]}${calciumMatch[2]}`;
      const dailyValue = calciumMatch[3] ? parseInt(calciumMatch[3], 10) : 0;
      result.calcium = {
        perServing: { amount, dailyValue },
        perContainer: {
          amount: `${(parseFloat(calciumMatch[1]) * result.servingsPerContainer)
            .toFixed(1)
            .replace(/\.0$/, '')}${calciumMatch[2]}`,
          dailyValue: dailyValue * result.servingsPerContainer
        }
      };
    }

    // Extract iron
    const ironMatch = nutritionText.match(/iron:?\s*([\d.]+)([a-z]+)(?:\s*\(?([\d.]+)%\)?)?/i);
    if (ironMatch) {
      const amount = `${ironMatch[1]}${ironMatch[2]}`;
      const dailyValue = ironMatch[3] ? parseInt(ironMatch[3], 10) : 0;
      result.iron = {
        perServing: { amount, dailyValue },
        perContainer: {
          amount: `${(parseFloat(ironMatch[1]) * result.servingsPerContainer)
            .toFixed(1)
            .replace(/\.0$/, '')}${ironMatch[2]}`,
          dailyValue: dailyValue * result.servingsPerContainer
        }
      };
    }

    // Extract potassium
    const potassiumMatch = nutritionText.match(
      /potassium:?\s*([\d.]+)([a-z]+)(?:\s*\(?([\d.]+)%\)?)?/i
    );
    if (potassiumMatch) {
      const amount = `${potassiumMatch[1]}${potassiumMatch[2]}`;
      const dailyValue = potassiumMatch[3] ? parseInt(potassiumMatch[3], 10) : 0;
      result.potassium = {
        perServing: { amount, dailyValue },
        perContainer: {
          amount: `${(parseFloat(potassiumMatch[1]) * result.servingsPerContainer)
            .toFixed(1)
            .replace(/\.0$/, '')}${potassiumMatch[2]}`,
          dailyValue: dailyValue * result.servingsPerContainer
        }
      };
    }

    // Extract vitamin A
    const vitaminAMatch = nutritionText.match(
      /vitamin a:?\s*([\d.]+)([a-z%]+)(?:\s*\(?([\d.]+)%\)?)?/i
    );
    if (vitaminAMatch) {
      const amount = `${vitaminAMatch[1]}${vitaminAMatch[2]}`;
      const dailyValue = vitaminAMatch[3]
        ? parseInt(vitaminAMatch[3], 10)
        : vitaminAMatch[2] === '%'
        ? parseInt(vitaminAMatch[1], 10)
        : 0;
      result.vitaminA = {
        perServing: { amount, dailyValue },
        perContainer: {
          amount: `${(parseFloat(vitaminAMatch[1]) * result.servingsPerContainer)
            .toFixed(1)
            .replace(/\.0$/, '')}${vitaminAMatch[2]}`,
          dailyValue: dailyValue * result.servingsPerContainer
        }
      };
    }

    // Extract vitamin C
    const vitaminCMatch = nutritionText.match(
      /vitamin c:?\s*([\d.]+)([a-z%]+)(?:\s*\(?([\d.]+)%\)?)?/i
    );
    if (vitaminCMatch) {
      const amount = `${vitaminCMatch[1]}${vitaminCMatch[2]}`;
      const dailyValue = vitaminCMatch[3]
        ? parseInt(vitaminCMatch[3], 10)
        : vitaminCMatch[2] === '%'
        ? parseInt(vitaminCMatch[1], 10)
        : 0;
      result.vitaminC = {
        perServing: { amount, dailyValue },
        perContainer: {
          amount: `${(parseFloat(vitaminCMatch[1]) * result.servingsPerContainer)
            .toFixed(1)
            .replace(/\.0$/, '')}${vitaminCMatch[2]}`,
          dailyValue: dailyValue * result.servingsPerContainer
        }
      };
    }

    return result;
  } catch (error) {
    console.error('Error parsing nutrition data:', error);
    return null;
  }
}

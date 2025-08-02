import React from 'react';

export default function SimplifiedNutritionFacts({ data }) {
  // Extract macronutrients for the top section
  const macros = {
    carbs: data.totalCarbohydrate?.perServing?.amount || '0g',
    fat: data.totalFat?.perServing?.amount || '0g',
    protein: typeof data.protein === 'string' ? data.protein : data.protein?.perServing || '0g'
  };

  // Helper function to extract numeric value from string (e.g., "25g" -> 25)
  const extractNumeric = (value) => {
    if (typeof value === 'number') return value;
    if (typeof value === 'string') {
      const match = value.match(/[\d.]+/);
      return match ? parseFloat(match[0]) : 0;
    }
    return 0;
  };

  // Get calories value, handling different data structures
  const calories = data.calories?.perServing || extractNumeric(data.calories) || 0;

  // Helper function to render a nutrition row
  const renderNutritionRow = (label, value, dailyValue, indent = false, italic = false) => {
    if (!value) return null;

    const amount = typeof value === 'object' ? value.amount : value;
    const dv = typeof value === 'object' ? value.dailyValue : dailyValue;

    return (
      <div className={`flex justify-between py-1 border-b border-zinc-300 ${indent ? 'pl-4' : ''}`}>
        <div className={`text-black ${italic ? 'italic' : ''} ${!indent ? 'font-bold' : ''}`}>
          {label}
        </div>
        <div className='flex gap-2 items-center'>
          <span className='text-black'>{amount}</span>
          {dv !== undefined && dv !== null && dv !== 0 && (
            <span className='text-black font-bold'>{dv}%</span>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className='w-full bg-white rounded-lg shadow-md overflow-hidden border border-zinc-200'>
      {/* Title */}
      <div className='p-4 bg-zinc-50'>
        <h2 className='text-xl font-bold text-zinc-800'>Macros</h2>
      </div>

      {/* Macronutrients Highlight */}
      <div className='flex justify-between bg-zinc-50 p-4 border-b border-zinc-200'>
        <div className='text-center'>
          <div className='text-2xl font-bold'>{macros.carbs}</div>
          <div className='text-sm text-zinc-600'>Carbs</div>
        </div>
        <div className='text-center'>
          <div className='text-2xl font-bold'>{macros.fat}</div>
          <div className='text-sm text-zinc-600'>Fat</div>
        </div>
        <div className='text-center'>
          <div className='text-2xl font-bold'>{macros.protein}</div>
          <div className='text-sm text-zinc-600'>Protein</div>
        </div>
      </div>

      {/* Nutrition Facts */}
      <div className='p-4'>
        <div className='border-b-2 border-black mb-2'>
          <h3 className='text-lg font-bold text-black'>Nutrition Facts</h3>
          <div className='text-sm text-zinc-600 mb-1'>
            {data.servingsPerContainer} servings per container
          </div>
          <div className='flex justify-between mb-2'>
            <span className='font-bold text-black'>Serving size</span>
            <span className='text-black'>{data.servingSize}</span>
          </div>
        </div>

        {/* Calories */}
        <div className='flex justify-between py-2 border-b-2 border-black'>
          <span className='font-bold text-black text-lg'>Calories</span>
          <span className='font-bold text-black text-lg'>{calories}</span>
        </div>

        {/* Daily Value header */}
        <div className='flex justify-end py-1 text-xs text-zinc-600'>% Daily Value*</div>

        {/* Nutrition values - dynamically rendered based on available data */}
        {data.totalFat && renderNutritionRow('Total Fat', data.totalFat.perServing, null)}
        {data.saturatedFat &&
          renderNutritionRow('Saturated Fat', data.saturatedFat.perServing, null, true)}
        {data.transFat &&
          renderNutritionRow('Trans Fat', data.transFat.perServing, null, true, true)}
        {data.cholesterol && renderNutritionRow('Cholesterol', data.cholesterol.perServing, null)}
        {data.sodium && renderNutritionRow('Sodium', data.sodium.perServing, null)}
        {data.totalCarbohydrate &&
          renderNutritionRow('Total Carbohydrate', data.totalCarbohydrate.perServing, null)}
        {data.dietaryFiber &&
          renderNutritionRow('Dietary Fiber', data.dietaryFiber.perServing, null, true)}
        {data.totalSugars && renderNutritionRow('Sugars', data.totalSugars.perServing, null, true)}
        {data.addedSugars &&
          renderNutritionRow('Added Sugars', data.addedSugars.perServing, null, true)}
        {data.protein &&
          renderNutritionRow('Protein', data.protein.perServing || data.protein, null)}

        {/* Vitamins and Minerals */}
        {data.vitaminD && renderNutritionRow('Vitamin D', data.vitaminD.perServing, null)}
        {data.calcium && renderNutritionRow('Calcium', data.calcium.perServing, null)}
        {data.iron && renderNutritionRow('Iron', data.iron.perServing, null)}
        {data.potassium && renderNutritionRow('Potassium', data.potassium.perServing, null)}
        {data.vitaminA && renderNutritionRow('Vitamin A', data.vitaminA.perServing, null)}
        {data.vitaminC && renderNutritionRow('Vitamin C', data.vitaminC.perServing, null)}

        {/* Footnote */}
        <div className='text-xs text-zinc-600 mt-2'>
          * The % Daily Value (DV) tells you how much a nutrient in a serving of food contributes to
          a daily diet. 2,000 calories a day is used for general nutrition advice.
        </div>
      </div>

      {/* Disclaimer Section */}
      <div className='p-4 bg-zinc-50 border-t border-zinc-200'>
        <h3 className='font-bold text-zinc-700 mb-2'>Disclaimer</h3>
        <p className='text-xs text-zinc-600 mb-2'>
          This information is provided for educational purposes only, and the values are estimates.
        </p>
        <p className='text-xs text-zinc-600 mb-2'>
          We make no representations or warranties regarding dietary or lifestyle attributes,
          allergen contamination, nutrition information, ingredient information, claims, or the
          products purchased for the recipes.
        </p>
        <p className='text-xs text-zinc-600'>
          Products in your order may be substituted. Adding optional ingredients, substituting
          products, or manufacturer product formulation changes could alter the nutritional or
          ingredient content of this recipe. Check each product's label for nutrition and ingredient
          information, and contact the manufacturer with product related questions.
        </p>
        <p className='text-xs text-zinc-600 mt-2 font-medium'>
          Consult a healthcare provider for nutritional guidance specific to your needs.
        </p>
      </div>
    </div>
  );
}

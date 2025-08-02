import React from 'react';
import { NutritionData } from '../types';

export default function NutritionFacts({ data }) {
  return (
    <div className='w-96 bg-white border-4 border-black p-2'>
      {/* Header */}
      <div className='border-b-8 border-black pb-1'>
        <h1 className='text-4xl text-black font-black tracking-tight'>Nutrition Facts</h1>
      </div>

      {/* Servings info */}
      <div className='py-1 text-sm'>
        <div className='text-black'>{data.servingsPerContainer} servings per container</div>
        <div className='flex justify-between items-center border-b-4 border-black pb-1'>
          <span className='text-black font-bold'>Serving size</span>
          <span className='text-black font-bold'>{data.servingSize}</span>
        </div>
      </div>

      {/* Calories section */}
      <div className='border-b-4 border-black'>
        <div className='flex'>
          <div className='w-1/3'>
            <div className='text-black font-bold text-lg border-b border-gray-400 pb-1'>
              Calories
            </div>
          </div>
          <div className='w-1/3 text-center'>
            <div className='text-xs text-black'>Per serving</div>
            <div className='text-4xl text-black font-bold'>{data.calories.perServing}</div>
          </div>
          <div className='w-1/3 text-center'>
            <div className='text-xs text-black'>Per container</div>
            <div className='text-4xl text-black font-bold'>{data.calories.perContainer}</div>
          </div>
        </div>

        {/* % DV headers */}
        <div className='flex text-xs text-black'>
          <div className='w-1/3'></div>
          <div className='w-1/3 text-center'>% DV*</div>
          <div className='w-1/3 text-center'>% DV*</div>
        </div>
      </div>

      {/* Nutrition rows */}
      <div className='text-sm'>
        {/* Total Fat */}
        <div className='flex items-center border-b border-gray-400'>
          <div className='w-1/3 text-black font-bold'>Total Fat</div>
          <div className='w-1/3 text-center'>
            <span className='text-black'>{data.totalFat.perServing.amount}</span>
            {data.totalFat.perServing.dailyValue !== undefined && (
              <span className='text-black font-bold ml-2'>
                {data.totalFat.perServing.dailyValue}%
              </span>
            )}
          </div>
          <div className='w-1/3 text-center'>
            <span className='text-black'>{data.totalFat.perContainer.amount}</span>
            {data.totalFat.perContainer.dailyValue !== undefined && (
              <span className='text-black font-bold ml-2'>
                {data.totalFat.perContainer.dailyValue}%
              </span>
            )}
          </div>
        </div>

        {/* Saturated Fat */}
        <div className='flex items-center border-b border-gray-400 pl-4'>
          <div className='w-1/3 text-black'>Saturated Fat</div>
          <div className='w-1/3 text-center'>
            <span className='text-black'>{data.saturatedFat.perServing.amount}</span>
            {data.saturatedFat.perServing.dailyValue !== undefined && (
              <span className='text-black font-bold ml-2'>
                {data.saturatedFat.perServing.dailyValue}%
              </span>
            )}
          </div>
          <div className='w-1/3 text-center'>
            <span className='text-black'>{data.saturatedFat.perContainer.amount}</span>
            {data.saturatedFat.perContainer.dailyValue !== undefined && (
              <span className='text-black font-bold ml-2'>
                {data.saturatedFat.perContainer.dailyValue}%
              </span>
            )}
          </div>
        </div>

        {/* Trans Fat */}
        <div className='flex items-center border-b border-gray-400 pl-4'>
          <div className='w-1/3 text-black italic'>Trans Fat</div>
          <div className='w-1/3 text-center text-black'>{data.transFat.perServing}</div>
          <div className='w-1/3 text-center text-black'>{data.transFat.perContainer}</div>
        </div>

        {/* Cholesterol */}
        <div className='flex items-center border-b border-gray-400'>
          <div className='w-1/3 text-black font-bold'>Cholesterol</div>
          <div className='w-1/3 text-center'>
            <span className='text-black'>{data.cholesterol.perServing.amount}</span>
            {data.cholesterol.perServing.dailyValue !== undefined && (
              <span className='text-black font-bold ml-2'>
                {data.cholesterol.perServing.dailyValue}%
              </span>
            )}
          </div>
          <div className='w-1/3 text-center'>
            <span className='text-black'>{data.cholesterol.perContainer.amount}</span>
            {data.cholesterol.perContainer.dailyValue !== undefined && (
              <span className='text-black font-bold ml-2'>
                {data.cholesterol.perContainer.dailyValue}%
              </span>
            )}
          </div>
        </div>

        {/* Sodium */}
        <div className='flex items-center border-b border-gray-400'>
          <div className='w-1/3 text-black font-bold'>Sodium</div>
          <div className='w-1/3 text-center'>
            <span className='text-black'>{data.sodium.perServing.amount}</span>
            {data.sodium.perServing.dailyValue !== undefined && (
              <span className='text-black font-bold ml-2'>
                {data.sodium.perServing.dailyValue}%
              </span>
            )}
          </div>
          <div className='w-1/3 text-center'>
            <span className='text-black'>{data.sodium.perContainer.amount}</span>
            {data.sodium.perContainer.dailyValue !== undefined && (
              <span className='text-black font-bold ml-2'>
                {data.sodium.perContainer.dailyValue}%
              </span>
            )}
          </div>
        </div>

        {/* Total Carb */}
        <div className='flex items-center border-b border-gray-400'>
          <div className='w-1/3 text-black font-bold'>Total Carb.</div>
          <div className='w-1/3 text-center'>
            <span className='text-black'>{data.totalCarbohydrate.perServing.amount}</span>
            {data.totalCarbohydrate.perServing.dailyValue !== undefined && (
              <span className='text-black font-bold ml-2'>
                {data.totalCarbohydrate.perServing.dailyValue}%
              </span>
            )}
          </div>
          <div className='w-1/3 text-center'>
            <span className='text-black'>{data.totalCarbohydrate.perContainer.amount}</span>
            {data.totalCarbohydrate.perContainer.dailyValue !== undefined && (
              <span className='text-black font-bold ml-2'>
                {data.totalCarbohydrate.perContainer.dailyValue}%
              </span>
            )}
          </div>
        </div>

        {/* Dietary Fiber */}
        <div className='flex items-center border-b border-gray-400 pl-4'>
          <div className='w-1/3 text-black'>Dietary Fiber</div>
          <div className='w-1/3 text-center'>
            <span className='text-black'>{data.dietaryFiber.perServing.amount}</span>
            {data.dietaryFiber.perServing.dailyValue !== undefined && (
              <span className='text-black font-bold ml-2'>
                {data.dietaryFiber.perServing.dailyValue}%
              </span>
            )}
          </div>
          <div className='w-1/3 text-center'>
            <span className='text-black'>{data.dietaryFiber.perContainer.amount}</span>
            {data.dietaryFiber.perContainer.dailyValue !== undefined && (
              <span className='text-black font-bold ml-2'>
                {data.dietaryFiber.perContainer.dailyValue}%
              </span>
            )}
          </div>
        </div>

        {/* Total Sugars */}
        <div className='flex items-center border-b border-gray-400 pl-4'>
          <div className='w-1/3 text-black'>Total Sugars</div>
          <div className='w-1/3 text-center text-black'>{data.totalSugars.perServing}</div>
          <div className='w-1/3 text-center text-black'>{data.totalSugars.perContainer}</div>
        </div>

        {/* Incl. Added Sugars */}
        <div className='flex items-center border-b-4 border-black pl-8'>
          <div className='w-1/3 text-black'>Incl. Added Sugars</div>
          <div className='w-1/3 text-center'>
            <span className='text-black'>{data.addedSugars.perServing.amount}</span>
            {data.addedSugars.perServing.dailyValue !== undefined && (
              <span className='text-black font-bold ml-2'>
                {data.addedSugars.perServing.dailyValue}%
              </span>
            )}
          </div>
          <div className='w-1/3 text-center'>
            <span className='text-black'>{data.addedSugars.perContainer.amount}</span>
            {data.addedSugars.perContainer.dailyValue !== undefined && (
              <span className='text-black font-bold ml-2'>
                {data.addedSugars.perContainer.dailyValue}%
              </span>
            )}
          </div>
        </div>

        {/* Protein */}
        <div className='flex items-center border-b-4 border-black'>
          <div className='w-1/3 text-black font-bold'>Protein</div>
          <div className='w-1/3 text-center text-black'>{data.protein.perServing}</div>
          <div className='w-1/3 text-center text-black'>{data.protein.perContainer}</div>
        </div>

        {/* Vitamins and Minerals */}
        <div className='flex items-center border-b border-gray-400'>
          <div className='w-1/3 text-black'>Vitamin D</div>
          <div className='w-1/3 text-center'>
            <span className='text-black'>{data.vitaminD.perServing.amount}</span>
            {data.vitaminD.perServing.dailyValue !== undefined && (
              <span className='text-black font-bold ml-2'>
                {data.vitaminD.perServing.dailyValue}%
              </span>
            )}
          </div>
          <div className='w-1/3 text-center'>
            <span className='text-black'>{data.vitaminD.perContainer.amount}</span>
            {data.vitaminD.perContainer.dailyValue !== undefined && (
              <span className='text-black font-bold ml-2'>
                {data.vitaminD.perContainer.dailyValue}%
              </span>
            )}
          </div>
        </div>

        <div className='flex items-center border-b border-gray-400'>
          <div className='w-1/3 text-black'>Calcium</div>
          <div className='w-1/3 text-center'>
            <span className='text-black'>{data.calcium.perServing.amount}</span>
            {data.calcium.perServing.dailyValue !== undefined && (
              <span className='text-black font-bold ml-2'>
                {data.calcium.perServing.dailyValue}%
              </span>
            )}
          </div>
          <div className='w-1/3 text-center'>
            <span className='text-black'>{data.calcium.perContainer.amount}</span>
            {data.calcium.perContainer.dailyValue !== undefined && (
              <span className='text-black font-bold ml-2'>
                {data.calcium.perContainer.dailyValue}%
              </span>
            )}
          </div>
        </div>

        <div className='flex items-center border-b border-gray-400'>
          <div className='w-1/3 text-black'>Iron</div>
          <div className='w-1/3 text-center'>
            <span className='text-black'>{data.iron.perServing.amount}</span>
            {data.iron.perServing.dailyValue !== undefined && (
              <span className='text-black font-bold ml-2'>{data.iron.perServing.dailyValue}%</span>
            )}
          </div>
          <div className='w-1/3 text-center'>
            <span className='text-black'>{data.iron.perContainer.amount}</span>
            {data.iron.perContainer.dailyValue !== undefined && (
              <span className='text-black font-bold ml-2'>
                {data.iron.perContainer.dailyValue}%
              </span>
            )}
          </div>
        </div>

        <div className='flex items-center border-b-4 border-black'>
          <div className='w-1/3 text-black'>Potassium</div>
          <div className='w-1/3 text-center'>
            <span className='text-black'>{data.potassium.perServing.amount}</span>
            {data.potassium.perServing.dailyValue !== undefined && (
              <span className='text-black font-bold ml-2'>
                {data.potassium.perServing.dailyValue}%
              </span>
            )}
          </div>
          <div className='w-1/3 text-center'>
            <span className='text-black'>{data.potassium.perContainer.amount}</span>
            {data.potassium.perContainer.dailyValue !== undefined && (
              <span className='text-black font-bold ml-2'>
                {data.potassium.perContainer.dailyValue}%
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className='pt-2 text-xs text-black'>
        <span className='font-bold'>*</span> The % Daily Value (DV) tells you how much a nutrient in
        a serving of food contributes to a daily diet. 2,000 calories a day is used for general
        nutrition advice.
      </div>
    </div>
  );
}

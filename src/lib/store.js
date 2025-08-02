import { create } from 'zustand';

export const useStore = create((set) => ({
  inputValue: '',
  setInputValue: (value) => set({ inputValue: value }),
  appendToInput: (text) =>
    set((state) => ({
      inputValue: state.inputValue ? `${state.inputValue}\n${text}` : text
    })),
  missingIngredients: new Set(),
  toggleMissingIngredient: (ingredient) =>
    set((state) => {
      const newMissingIngredients = new Set(state.missingIngredients);
      if (newMissingIngredients.has(ingredient)) {
        newMissingIngredients.delete(ingredient);
      } else {
        newMissingIngredients.add(ingredient);
      }
      return { missingIngredients: newMissingIngredients };
    })
}));

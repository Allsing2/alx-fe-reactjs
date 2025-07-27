import { create } from 'zustand';

const useRecipeStore = create(set => ({
  recipes: [],
  // Adds a new recipe to the state
  addRecipe: (newRecipe) => set(state => ({ recipes: [...state.recipes, newRecipe] })),
  // Sets the entire recipes array (useful for initial loading or resetting)
  setRecipes: (recipes) => set({ recipes }),
  // Deletes a recipe by its ID
  deleteRecipe: (id) => set(state => ({
    recipes: state.recipes.filter(recipe => recipe.id !== id)
  })),
  // Updates an existing recipe based on its ID
  updateRecipe: (updatedRecipe) => set(state => ({
    recipes: state.recipes.map(recipe =>
      recipe.id === updatedRecipe.id ? updatedRecipe : recipe
    )
  }))
}));

export { useRecipeStore };

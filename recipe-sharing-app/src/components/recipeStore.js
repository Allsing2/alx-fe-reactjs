import { create } from 'zustand';

const useRecipeStore = create((set, get) => ({
  recipes: [],
  searchTerm: '',
  filteredRecipes: [], // New state to hold filtered recipes

  // Action to set the search term and trigger filtering
  setSearchTerm: (term) => {
    set({ searchTerm: term });
    get().filterRecipes(); // Immediately filter recipes when search term changes
  },

  // Action to filter recipes based on the current search term
  filterRecipes: () => {
    const { recipes, searchTerm } = get();
    const lowerCaseSearchTerm = searchTerm.toLowerCase();

    const filtered = recipes.filter(recipe =>
      recipe.title.toLowerCase().includes(lowerCaseSearchTerm) ||
      recipe.description.toLowerCase().includes(lowerCaseSearchTerm)
    );
    set({ filteredRecipes: filtered });
  },

  // Existing actions, now also triggering filterRecipes
  addRecipe: (newRecipe) => {
    set(state => ({ recipes: [...state.recipes, newRecipe] }));
    get().filterRecipes(); // Update filtered recipes after adding
  },
  setRecipes: (recipes) => {
    set({ recipes });
    get().filterRecipes(); // Update filtered recipes after setting
  },
  deleteRecipe: (id) => {
    set(state => ({
      recipes: state.recipes.filter(recipe => recipe.id !== id)
    }));
    get().filterRecipes(); // Update filtered recipes after deleting
  },
  updateRecipe: (updatedRecipe) => {
    set(state => ({
      recipes: state.recipes.map(recipe =>
        recipe.id === updatedRecipe.id ? updatedRecipe : recipe
      )
    }));
    get().filterRecipes(); // Update filtered recipes after updating
  }
}));

export { useRecipeStore };

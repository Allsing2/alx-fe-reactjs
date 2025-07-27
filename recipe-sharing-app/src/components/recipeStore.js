// recipeStore.js
import { create } from 'zustand';

const useRecipeStore = create((set) => ({
  recipes: [],
  favorites: [],
  recommendations: [],
  
  // Recipe actions
  setRecipes: (recipes) => set({ recipes }),
  addRecipe: (newRecipe) => 
    set((state) => ({
      recipes: [...state.recipes, { ...newRecipe, id: Date.now() }]
    })),
  
  // New action: Delete a recipe by its ID
  deleteRecipe: (recipeId) =>
    set((state) => ({
      recipes: state.recipes.filter((recipe) => recipe.id !== recipeId),
      // Also remove from favorites if it was a favorite
      favorites: state.favorites.filter((id) => id !== recipeId)
    })),

  // New action: Update an existing recipe
  updateRecipe: (updatedRecipe) =>
    set((state) => ({
      recipes: state.recipes.map((recipe) =>
        recipe.id === updatedRecipe.id ? { ...recipe, ...updatedRecipe } : recipe
      )
    })),

  // Favorites actions
  addFavorite: (recipeId) => 
    set((state) => {
      if (!state.favorites.includes(recipeId)) {
        return { favorites: [...state.favorites, recipeId] };
      }
      return state;
    }),
  removeFavorite: (recipeId) => 
    set((state) => ({
      favorites: state.favorites.filter((id) => id !== recipeId)
    })),
  isFavorite: (recipeId) => 
    useRecipeStore.getState().favorites.includes(recipeId),
  
  // Recommendations
  generateRecommendations: () => 
    set((state) => {
      if (state.favorites.length === 0) {
        // If no favorites, recommend random recipes
        const shuffled = [...state.recipes].sort(() => 0.5 - Math.random());
        return { recommendations: shuffled.slice(0, 3) };
      }
      
      // Find recipes with similar tags to favorites
      const favoriteTags = state.favorites.flatMap((id) => {
        const recipe = state.recipes.find((r) => r.id === id);
        return recipe?.tags || [];
      });
      
      const recommended = state.recipes
        .filter((recipe) => !state.favorites.includes(recipe.id))
        .sort((a, b) => {
          const aScore = a.tags?.filter(tag => favoriteTags.includes(tag)).length || 0;
          const bScore = b.tags?.filter(tag => favoriteTags.includes(tag)).length || 0;
          return bScore - aScore;
        })
        .slice(0, 5);
      
      return { recommendations: recommended };
    })
}));

export default useRecipeStore;
// This store manages recipes, favorites, and recommendations using Zustand.
// It includes actions to set, add, delete, and update recipes, manage favorites,
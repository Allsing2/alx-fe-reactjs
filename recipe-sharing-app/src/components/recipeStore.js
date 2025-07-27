import { create } from 'zustand';

const useRecipeStore = create((set, get) => ({
  recipes: [],
  searchTerm: '',
  filteredRecipes: [],
  favorites: [], // New state for favorite recipe IDs
  recommendations: [], // New state for recommended recipes

  // Action to set the search term and trigger filtering
  setSearchTerm: (term) => {
    set({ searchTerm: term });
    get().filterRecipes();
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

  // Existing actions, now also triggering filterRecipes and generateRecommendations
  addRecipe: (newRecipe) => {
    set(state => ({ recipes: [...state.recipes, newRecipe] }));
    get().filterRecipes();
    get().generateRecommendations(); // Regenerate recommendations after adding
  },
  setRecipes: (recipes) => {
    set({ recipes });
    get().filterRecipes();
    get().generateRecommendations(); // Regenerate recommendations after setting
  },
  deleteRecipe: (id) => {
    set(state => ({
      recipes: state.recipes.filter(recipe => recipe.id !== id),
      favorites: state.favorites.filter(favId => favId !== id) // Also remove from favorites if deleted
    }));
    get().filterRecipes();
    get().generateRecommendations(); // Regenerate recommendations after deleting
  },
  updateRecipe: (updatedRecipe) => {
    set(state => ({
      recipes: state.recipes.map(recipe =>
        recipe.id === updatedRecipe.id ? updatedRecipe : recipe
      )
    }));
    get().filterRecipes();
    // No need to regenerate recommendations on update unless content affects recommendation logic
  },

  // New actions for favorites
  addFavorite: (recipeId) => {
    set(state => {
      // Prevent adding duplicates
      if (!state.favorites.includes(recipeId)) {
        return { favorites: [...state.favorites, recipeId] };
      }
      return state;
    });
    get().generateRecommendations(); // Regenerate recommendations after adding favorite
  },
  removeFavorite: (recipeId) => {
    set(state => ({
      favorites: state.favorites.filter(id => id !== recipeId)
    }));
    get().generateRecommendations(); // Regenerate recommendations after removing favorite
  },

  // New action for recommendations (mock implementation)
  generateRecommendations: () => {
    const { recipes, favorites } = get();
    // Simple mock: recommend recipes that are NOT favorites, but are similar in some way (e.g., random selection)
    // For a real app, this would involve more complex logic (e.g., content-based, collaborative filtering)

    const nonFavorites = recipes.filter(recipe => !favorites.includes(recipe.id));
    // Shuffle and pick a few random non-favorites as recommendations
    const shuffled = [...nonFavorites].sort(() => 0.5 - Math.random());
    const recommended = shuffled.slice(0, Math.min(shuffled.length, 3)); // Show up to 3 recommendations

    set({ recommendations: recommended });
  },
}));

export { useRecipeStore };

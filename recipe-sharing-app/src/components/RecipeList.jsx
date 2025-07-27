import React, { useEffect } from 'react';
import { useRecipeStore } from '../recipeStore';
import { Link } from 'react-router-dom';

const RecipeList = () => {
  const filteredRecipes = useRecipeStore(state => state.filteredRecipes);
  const filterRecipes = useRecipeStore(state => state.filterRecipes);
  const recipes = useRecipeStore(state => state.recipes); // Get raw recipes to trigger initial filter
  const favorites = useRecipeStore(state => state.favorites);
  const addFavorite = useRecipeStore(state => state.addFavorite);
  const removeFavorite = useRecipeStore(state => state.removeFavorite);

  // Trigger initial filtering when component mounts or recipes change
  useEffect(() => {
    filterRecipes();
  }, [recipes, filterRecipes]);

  const toggleFavorite = (recipeId) => {
    if (favorites.includes(recipeId)) {
      removeFavorite(recipeId);
    } else {
      addFavorite(recipeId);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Your Recipes</h2>
      {filteredRecipes.length === 0 ? (
        <p className="text-gray-600 italic">No recipes match your search. Try a different term or add new recipes!</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRecipes.map(recipe => (
            <div key={recipe.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden relative">
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2 text-gray-900">{recipe.title}</h3>
                <p className="text-gray-700 text-sm line-clamp-3 mb-4">{recipe.description}</p>
                <div className="flex justify-between items-center">
                  <Link
                    to={`/recipes/${recipe.id}`}
                    className="inline-block bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md transition-colors duration-300"
                  >
                    View Details
                  </Link>
                  <button
                    onClick={() => toggleFavorite(recipe.id)}
                    className={`p-2 rounded-full transition-colors duration-300 ${
                      favorites.includes(recipe.id) ? 'bg-red-500 text-white' : 'bg-gray-200 text-gray-600 hover:bg-red-300 hover:text-red-700'
                    }`}
                    title={favorites.includes(recipe.id) ? 'Remove from Favorites' : 'Add to Favorites'}
                  >
                    {/* Heart icon - using SVG for better control and no external dependencies */}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RecipeList;

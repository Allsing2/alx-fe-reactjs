import React from 'react';
import { useRecipeStore } from '../recipeStore';
import { Link } from 'react-router-dom';

const FavoritesList = () => {
  const recipes = useRecipeStore(state => state.recipes);
  const favorites = useRecipeStore(state => state.favorites);
  const removeFavorite = useRecipeStore(state => state.removeFavorite);

  // Map favorite IDs back to full recipe objects
  const favoriteRecipes = favorites
    .map(id => recipes.find(recipe => recipe.id === id))
    .filter(Boolean); // Filter out any undefined if a recipe was deleted

  return (
    <div className="p-4 bg-white rounded-lg shadow-md mb-8">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">My Favorites</h2>
      {favoriteRecipes.length === 0 ? (
        <p className="text-gray-600 italic">You haven't favorited any recipes yet. Click the heart icon to add some!</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {favoriteRecipes.map(recipe => (
            <div key={recipe.id} className="border border-gray-200 rounded-lg p-4 flex flex-col justify-between">
              <div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900">{recipe.title}</h3>
                <p className="text-gray-700 text-sm line-clamp-2 mb-3">{recipe.description}</p>
              </div>
              <div className="flex justify-between items-center mt-2">
                <Link
                  to={`/recipes/${recipe.id}`}
                  className="text-blue-500 hover:underline text-sm font-medium"
                >
                  View Details
                </Link>
                <button
                  onClick={() => removeFavorite(recipe.id)}
                  className="p-1 rounded-full bg-red-100 text-red-600 hover:bg-red-200 transition-colors duration-300"
                  title="Remove from Favorites"
                >
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
          ))}
        </div>
      )}
    </div>
  );
};

export default FavoritesList;

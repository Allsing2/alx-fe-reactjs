import React, { useEffect } from 'react';
import { useRecipeStore } from '../recipeStore';
import { Link } from 'react-router-dom';

const RecipeList = () => {
  // Now using filteredRecipes instead of the raw recipes array
  const filteredRecipes = useRecipeStore(state => state.filteredRecipes);
  const filterRecipes = useRecipeStore(state => state.filterRecipes);
  const recipes = useRecipeStore(state => state.recipes); // Get raw recipes to trigger initial filter

  // Trigger initial filtering when component mounts or recipes change
  useEffect(() => {
    filterRecipes();
  }, [recipes, filterRecipes]); // Re-filter if raw recipes array changes

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Your Recipes</h2>
      {filteredRecipes.length === 0 ? (
        <p className="text-gray-600 italic">No recipes match your search. Try a different term or add new recipes!</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRecipes.map(recipe => (
            <div key={recipe.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2 text-gray-900">{recipe.title}</h3>
                <p className="text-gray-700 text-sm line-clamp-3 mb-4">{recipe.description}</p>
                <Link
                  to={`/recipes/${recipe.id}`}
                  className="inline-block bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md transition-colors duration-300"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RecipeList;

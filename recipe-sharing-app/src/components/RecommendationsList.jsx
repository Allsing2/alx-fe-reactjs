import React, { useEffect } from 'react';
import { useRecipeStore } from '../recipeStore';
import { Link } from 'react-router-dom';

const RecommendationsList = () => {
  const recommendations = useRecipeStore(state => state.recommendations);
  const generateRecommendations = useRecipeStore(state => state.generateRecommendations);
  const recipes = useRecipeStore(state => state.recipes); // Dependency for re-generating on recipe changes
  const favorites = useRecipeStore(state => state.favorites); // Dependency for re-generating on favorite changes

  useEffect(() => {
    // Generate recommendations when component mounts or relevant state changes
    generateRecommendations();
  }, [recipes, favorites, generateRecommendations]);

  return (
    <div className="p-4 bg-white rounded-lg shadow-md mb-8">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Recommended for You</h2>
      {recommendations.length === 0 ? (
        <p className="text-gray-600 italic">Add some recipes to your favorites to get personalized recommendations!</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {recommendations.map(recipe => (
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
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RecommendationsList;

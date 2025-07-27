import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useRecipeStore } from '../recipeStore';
import EditRecipeForm from './EditRecipeForm';

const RecipeDetails = () => {
  const { recipeId } = useParams();
  const navigate = useNavigate();
  const deleteRecipe = useRecipeStore(state => state.deleteRecipe);
  const addFavorite = useRecipeStore(state => state.addFavorite);
  const removeFavorite = useRecipeStore(state => state.removeFavorite);
  const favorites = useRecipeStore(state => state.favorites);

  const recipe = useRecipeStore(state =>
    state.recipes.find(r => r.id === parseInt(recipeId))
  );

  const [isEditing, setIsEditing] = useState(false);

  const isFavorited = recipe ? favorites.includes(recipe.id) : false;

  const toggleFavorite = () => {
    if (recipe) {
      if (isFavorited) {
        removeFavorite(recipe.id);
      } else {
        addFavorite(recipe.id);
      }
    }
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this recipe? This action cannot be undone.')) {
      deleteRecipe(parseInt(recipeId));
      navigate('/');
    }
  };

  if (!recipe) {
    return (
      <div className="text-center p-8">
        <h2 className="text-3xl font-bold text-red-600 mb-4">Recipe Not Found</h2>
        <p className="text-gray-700">The recipe you are looking for does not exist or has been deleted.</p>
        <button
          onClick={() => navigate('/')}
          className="mt-6 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md transition-colors duration-300"
        >
          Back to Recipes
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg max-w-3xl mx-auto my-8">
      <div className="flex justify-between items-start mb-4">
        <h1 className="text-4xl font-extrabold text-gray-900">{recipe.title}</h1>
        <button
          onClick={toggleFavorite}
          className={`p-3 rounded-full transition-colors duration-300 ${
            isFavorited ? 'bg-red-500 text-white' : 'bg-gray-200 text-gray-600 hover:bg-red-300 hover:text-red-700'
          }`}
          title={isFavorited ? 'Remove from Favorites' : 'Add to Favorites'}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
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
      <p className="text-gray-700 text-lg leading-relaxed mb-2">{recipe.description}</p>
      <p className="text-gray-500 text-sm mb-6">Recipe ID: {recipe.id}</p>

      <div className="flex space-x-4 mb-8">
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded-md transition-colors duration-300"
        >
          {isEditing ? 'Cancel Edit' : 'Edit Recipe'}
        </button>
        <button
          onClick={handleDelete}
          className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-md transition-colors duration-300"
        >
          Delete Recipe
        </button>
      </div>

      {isEditing && (
        <EditRecipeForm recipe={recipe} onSave={() => setIsEditing(false)} />
      )}

      <button
        onClick={() => navigate('/')}
        className="mt-8 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-md transition-colors duration-300"
      >
        ← Back to All Recipes
      </button>
    </div>
  );
};

export default RecipeDetails;

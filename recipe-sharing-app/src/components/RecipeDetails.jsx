import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useRecipeStore } from '../recipeStore';
import EditRecipeForm from './EditRecipeForm';

const RecipeDetails = () => {
  const { recipeId } = useParams(); // Get recipeId from URL parameters
  const navigate = useNavigate(); // Hook for navigation
  const deleteRecipe = useRecipeStore(state => state.deleteRecipe);
  const recipe = useRecipeStore(state =>
    state.recipes.find(r => r.id === parseInt(recipeId)) // Find recipe by ID (parse to int as useParams returns string)
  );

  const [isEditing, setIsEditing] = useState(false); // State to toggle edit form visibility

  // Handle recipe deletion
  const handleDelete = () => {
    // Using window.confirm, consider a custom modal for better UX as per best practices
    if (window.confirm('Are you sure you want to delete this recipe? This action cannot be undone.')) {
      deleteRecipe(parseInt(recipeId));
      navigate('/'); // Navigate back to the home page after deletion
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
      <h1 className="text-4xl font-extrabold text-gray-900 mb-4">{recipe.title}</h1>
      <p className="text-gray-700 text-lg leading-relaxed mb-2">{recipe.description}</p>
      {/* Displaying recipe.id for reference, can be removed in production */}
      <p className="text-gray-500 text-sm mb-6">Recipe ID: {recipe.id}</p>

      <div className="flex space-x-4 mb-8">
        <button
          onClick={() => setIsEditing(!isEditing)} // Toggle edit form
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

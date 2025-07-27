import React, { useState, useEffect } from 'react';
import { useRecipeStore } from '../recipeStore';

const EditRecipeForm = ({ recipe, onSave }) => {
  const updateRecipe = useRecipeStore(state => state.updateRecipe);
  const [title, setTitle] = useState(recipe.title);
  const [description, setDescription] = useState(recipe.description);

  // Update form fields if the recipe prop changes (e.g., if navigating between recipes)
  useEffect(() => {
    setTitle(recipe.title);
    setDescription(recipe.description);
  }, [recipe]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!title.trim() || !description.trim()) {
      alert('Please fill in both title and description.'); // Using alert, consider custom modal
      return;
    }
    updateRecipe({ ...recipe, title: title.trim(), description: description.trim() });
    onSave(); // Callback to hide the form or navigate
  };

  return (
    <form onSubmit={handleSubmit} className="bg-gray-100 p-6 rounded-lg shadow-inner mt-6">
      <h3 className="text-xl font-bold mb-4 text-gray-800">Edit Recipe</h3>
      <div className="mb-4">
        <label htmlFor="editTitle" className="block text-gray-700 text-sm font-bold mb-2">Title:</label>
        <input
          type="text"
          id="editTitle"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          required
        />
      </div>
      <div className="mb-6">
        <label htmlFor="editDescription" className="block text-gray-700 text-sm font-bold mb-2">Description:</label>
        <textarea
          id="editDescription"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows="4"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          required
        />
      </div>
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md transition-colors duration-300 focus:outline-none focus:shadow-outline mr-2"
      >
        Save Changes
      </button>
      <button
        type="button"
        onClick={onSave} // Cancel button also calls onSave to hide the form
        className="bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded-md transition-colors duration-300 focus:outline-none focus:shadow-outline"
      >
        Cancel
      </button>
    </form>
  );
};

export default EditRecipeForm;

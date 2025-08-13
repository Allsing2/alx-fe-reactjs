import React, { useState } from 'react';

function AddRecipeForm() {
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [ingredients, setIngredients] = useState('');
  // We've changed this from 'instructions' to 'steps'
  const [steps, setSteps] = useState('');

  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = {};
    if (!title.trim()) {
      validationErrors.title = "Recipe Title is required.";
    }
    if (!summary.trim()) {
      validationErrors.summary = "Summary is required.";
    }
    if (!ingredients.trim()) {
      validationErrors.ingredients = "Ingredients are required.";
    }
    // We've changed this from 'instructions' to 'steps'
    if (!steps.trim()) {
      validationErrors.steps = "Steps are required.";
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    const newRecipe = {
      title,
      summary,
      ingredients: ingredients.split(',').map(item => item.trim()),
      // We've changed this from 'instructions' to 'steps'
      steps,
    };
    
    console.log(newRecipe);

    setTitle('');
    setSummary('');
    setIngredients('');
    setSteps(''); // We've changed this from 'instructions' to 'steps'
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center md:text-left">
        Add a New Recipe
      </h1>
      
      <form onSubmit={handleSubmit} className="max-w-xl mx-auto bg-white p-6 rounded-lg shadow-lg">
        
        {/* Title Input */}
        <div className="mb-4">
          <label htmlFor="title" className="block text-gray-700 font-bold mb-2">Recipe Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
        </div>
        
        {/* Summary Textarea */}
        <div className="mb-4">
          <label htmlFor="summary" className="block text-gray-700 font-bold mb-2">Summary</label>
          <textarea
            id="summary"
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows="4"
            required
          />
          {errors.summary && <p className="text-red-500 text-sm mt-1">{errors.summary}</p>}
        </div>
        
        {/* Ingredients Textarea */}
        <div className="mb-4">
          <label htmlFor="ingredients" className="block text-gray-700 font-bold mb-2">
            Ingredients (comma-separated)
          </label>
          <textarea
            id="ingredients"
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows="4"
            required
          />
          {errors.ingredients && <p className="text-red-500 text-sm mt-1">{errors.ingredients}</p>}
        </div>
        
        {/* Steps Textarea */}
        <div className="mb-6">
          <label htmlFor="steps" className="block text-gray-700 font-bold mb-2">Steps</label>
          <textarea
            id="steps"
            value={steps}
            onChange={(e) => setSteps(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows="6"
            required
          />
          {errors.steps && <p className="text-red-500 text-sm mt-1">{errors.steps}</p>}
        </div>
        
        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Add Recipe
        </button>
      </form>
    </div>
  );
}

export default AddRecipeForm;
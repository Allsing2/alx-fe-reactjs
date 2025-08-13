import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

// We import all our assets and the complete data.json file
import data from '../data.json';
import chicken from '../assets/chicken.jpg';
import spaghetti from '../assets/spaghetti.jpg';
import creamy from '../assets/creamy.jpg';
import mp from '../assets/mp.jpg';
import tasty from '../assets/tasty.jpg';

// This is the lookup object that maps the string from the JSON to the imported variable
const imageMap = {
  'spaghetti.jpg': spaghetti,
  'chicken.jpg': chicken,
  'creamy.jpg': creamy,
  'mp.jpg': mp,
  'tasty.jpg': tasty,
};

function RecipeDetail() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    // The '+id' converts the string ID from the URL into a number for the comparison
    const foundRecipe = data.find(r => r.id === parseInt(id));
    setRecipe(foundRecipe);
  }, [id]);

  // If no recipe is found, we show a "not found" message
  if (!recipe) {
    return (
      <div className="container mx-auto px-4 py-8 text-center text-gray-600">
        <h1 className="text-2xl">Recipe not found.</h1>
      </div>
    );
  }

  // If a recipe is found, we display its details
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">{recipe.title}</h1>
      
      <img 
        src={imageMap[recipe.image]} 
        alt={recipe.title} 
        className="w-full h-96 object-cover rounded-lg mb-6" 
      />
      
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-700 mb-3">Summary</h2>
        <p className="text-gray-600 mb-6">{recipe.summary}</p>
        
        {/* Here is the new section for the ingredients list */}
        <h2 className="text-2xl font-bold text-gray-700 mb-3">Ingredients</h2>
        <ul className="list-disc list-inside text-gray-600 mb-6">
          {recipe.ingredients.map((ingredient, index) => (
            <li key={index}>{ingredient}</li>
          ))}
        </ul>

        <h2 className="text-2xl font-bold text-gray-700 mb-3">Cooking Instructions</h2>
        <p className="text-gray-600">{recipe.instructions}</p>
      </div>
    </div>
  );
}

export default RecipeDetail;
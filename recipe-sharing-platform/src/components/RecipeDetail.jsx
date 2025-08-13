import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

// We need to import our data and all our images
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
  // useParams() is a React Router hook that lets us access the dynamic parts of the URL.
  // We get 'id' because our route is '/recipe/:id'
  const { id } = useParams();

  // We use state to hold the recipe data we find. It starts as 'null' because we haven't found a recipe yet.
  const [recipe, setRecipe] = useState(null);

  // The useEffect hook runs when the component first loads or when 'id' changes.
  // This is where we search for the correct recipe.
  useEffect(() => {
    // We use the .find() method to search through our data array.
    // The '+id' converts the string 'id' from the URL into a number so it matches the 'id' in our data.
    const foundRecipe = data.find(r => r.id === parseInt(id));

    // We then update our state with the recipe we found.
    setRecipe(foundRecipe);
  }, [id]); // The dependency array ensures this effect re-runs if the URL 'id' changes.

  // This is our conditional rendering logic.
  // If no recipe was found, we display a message.
  if (!recipe) {
    return (
      <div className="container mx-auto px-4 py-8 text-center text-gray-600">
        <h1 className="text-2xl">Recipe not found.</h1>
      </div>
    );
  }

  // If a recipe was found, we display all of its details.
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">{recipe.title}</h1>
      
      {/* We use the imageMap to get the correct imported image based on the string path in our data. */}
      <img src={imageMap[recipe.image]} alt={recipe.title} className="w-full h-96 object-cover rounded-lg mb-6" />
      
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-700 mb-3">Summary</h2>
        <p className="text-gray-600 mb-6">{recipe.summary}</p>
        
        <h2 className="text-2xl font-bold text-gray-700 mb-3">Cooking Instructions</h2>
        <p className="text-gray-600">{recipe.instructions}</p>
      </div>
    </div>
  );
}

export default RecipeDetail;
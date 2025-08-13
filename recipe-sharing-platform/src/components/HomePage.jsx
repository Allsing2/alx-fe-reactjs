import React, { useState, useEffect} from "react";
import { Link } from 'react-router-dom';
import chicken from '../assets/chicken.jpg';
import spaghetti from '../assets/spaghetti.jpg';
import creamy from '../assets/creamy.jpg';
import mp from '../assets/mp.jpg';
import tasty from '../assets/tasty.jpg';

// This is your new image map!
const imageMap = {
  'spaghetti.jpg': spaghetti,
  'chicken.jpg': chicken,
  'creamy.jpg': creamy,
  'mp.jpg': mp,
  'tasty.jpg': tasty,
};


import data from '../data.json'; // Assuming data.json is in the parent directory

function HomePage() {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    // setting the state directly with the imported data
    setRecipes(data); 
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* The Link and div are now correctly placed inside the .map() function. */}
        {recipes.map(recipe => (
          <Link to={`/recipe/${recipe.id}`} key={recipe.id}>
            <div className="bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-105">
              <img src={imageMap[recipe.image]} alt={recipe.title} className="w-full h-48 object-cover" />
              <div className="p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">{recipe.title}</h2>
                <p className="text-gray-600 leading-relaxed">{recipe.summary}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default HomePage;
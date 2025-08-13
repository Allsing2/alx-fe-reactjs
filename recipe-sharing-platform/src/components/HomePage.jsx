import React, { useState, useEffect} from "react";
import chicken from '../assets/chicken.jpg';
import spaghetti from '../assets/spaghetti.jpg';
import creamy from '../assets/creamy.jpg';
import mp from '../assets/mp.jpg';
import tasty from '../assets/tasty.jpg';

// This is your new image map!
const imageMap = {
  './assets/chicken.jpg': chicken,
  './assets/spaghetti.jpg': spaghetti,
  './assets/creamy.jpg': creamy,
  './assets/mp.jpg': mp,
  './assets/tasty.jpg': tasty,
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
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {recipes.map(recipe => (
        <div key={recipe.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl hover:scale-105 transition-all">
          {/* <img src={recipe.image} alt={recipe.title} className="w-full h-48 object-cover" />           */}
          <img src={imageMap[recipe.image]} alt={recipe.title} className="w-full h-48 object-cover" />
          <div className="p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">{recipe.title}</h2>
            <p className="text-gray-600 leading-relaxed">{recipe.summary}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
);
}

export default HomePage;
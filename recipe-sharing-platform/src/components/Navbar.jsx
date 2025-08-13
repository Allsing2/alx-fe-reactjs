import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="bg-gray-800 text-white p-4 flex justify-between items-center shadow-md">
      {/* Link to the homepage */}
      <Link to="/" className="text-xl font-bold hover:text-gray-400 transition-colors">
        Recipe App
      </Link>
      
      {/* Link to the new recipe form */}
      <Link to="/add-recipe" className="bg-blue-600 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-700 transition-colors">
        Add New Recipe
      </Link>
    </nav>
  );
}

export default Navbar;
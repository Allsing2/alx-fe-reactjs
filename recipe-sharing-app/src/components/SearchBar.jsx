import React from 'react';
import { useRecipeStore } from '../recipeStore';

const SearchBar = () => {
  const setSearchTerm = useRecipeStore(state => state.setSearchTerm);
  const searchTerm = useRecipeStore(state => state.searchTerm); // Get current search term for input value

  return (
    <div className="mb-8">
      <input
        type="text"
        placeholder="Search recipes by title or description..."
        value={searchTerm} // Controlled component
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-700"
      />
    </div>
  );
};

export default SearchBar;

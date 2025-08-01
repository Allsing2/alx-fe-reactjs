
import React, { useState } from 'react';
import { searchUsers } from '../services/githubService.js';

function Search() {
  // State for all search parameters
  const [username, setUsername] = useState('');
  const [location, setLocation] = useState('');
  const [minRepos, setMinRepos] = useState('');

  // State for search results and loading status
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // State for pagination
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);

  // Helper function to build a clean search query object
  const buildQuery = (currentPage) => ({
    username,
    location,
    minRepos,
    page: currentPage,
  });

  // Handle the initial search form submission
  const handleSearch = async (event) => {
    event.preventDefault();
    setUsers([]); // Clear previous results for a new search
    setPage(1); // Reset page to 1 for a new search
    setError('');

    // Ensure at least one search field is filled
    if (!username.trim() && !location.trim() && !minRepos.trim()) {
      setError('Please enter at least one search criteria.');
      return;
    }

    setIsLoading(true);
    try {
      const response = await searchUsers(buildQuery(1));
      setUsers(response.items);
      setHasMore(response.total_count > response.items.length); // Check if there are more results
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle loading more results for pagination
  const handleLoadMore = async () => {
    setIsLoading(true);
    const nextPage = page + 1;
    try {
      const response = await searchUsers(buildQuery(nextPage));
      setUsers([...users, ...response.items]); // Append new results to existing list
      setPage(nextPage); // Increment the page number
      // Check if there are more results to load based on total and current count
      setHasMore(response.total_count > users.length + response.items.length);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      {/* Advanced Search Form */}
      <form onSubmit={handleSearch} className="mb-6 space-y-4">
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="GitHub Username"
          className="w-full p-3 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Location (e.g., San Francisco)"
          className="w-full p-3 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <input
          type="number"
          value={minRepos}
          onChange={(e) => setMinRepos(e.target.value)}
          placeholder="Minimum Repositories"
          className="w-full p-3 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <button
          type="submit"
          className="w-full p-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition duration-300"
        >
          Search
        </button>
      </form>

      {/* Conditional Rendering of Results */}
      <div className="text-center">
        {isLoading && <p>Loading...</p>}
        {error && <p className="text-red-400">{error}</p>}
        
        {/* Display the list of users */}
        {users.length > 0 && (
          <div className="space-y-4">
            {users.map((user) => (
              <div 
                key={user.id}
                className="bg-gray-700 p-6 rounded-xl shadow-md flex items-center space-x-4"
              >
                <img 
                  src={user.avatar_url}
                  alt={user.login}
                  className="w-16 h-16 rounded-full border-2 border-indigo-500"
                />
                <div className="text-left">
                  <h3 className="text-xl font-semibold">{user.login}</h3>
                  <p className="text-sm text-gray-400">
                    <a
                      href={user.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-indigo-400 hover:text-indigo-300"
                    >
                      View Profile
                    </a>
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Load More button for pagination */}
        {hasMore && !isLoading && (
          <button
            onClick={handleLoadMore}
            className="mt-6 p-3 bg-gray-600 text-white font-semibold rounded-lg hover:bg-gray-700 transition duration-300"
          >
            Load More
          </button>
        )}
      </div>
    </div>
  );
}

export default Search;

import React, { useState } from 'react';

// The main application component
export default function App() {
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

  /**
   * Helper function to build a clean search query string for the GitHub API.
   * @param {string} currentPage The current page number for the API call
   * @returns {string} The formatted query string
   */
  const buildQueryString = (currentPage) => {
    let query = username.trim();
    if (location.trim()) {
      query += `+location:${location.trim()}`;
    }
    if (minRepos.trim()) {
      query += `+repos:>=${minRepos.trim()}`;
    }
    return `https://api.github.com/search/users?q=${query}&page=${currentPage}&per_page=30`;
  };

  /**
   * Handles the initial search form submission
   * @param {Event} event The form submission event
   */
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
      const response = await fetch(buildQueryString(1));
      if (!response.ok) {
        throw new Error('Failed to fetch data from GitHub API.');
      }
      const data = await response.json();
      if (data.items.length === 0) {
        setError("Looks like we can't find the user.");
      } else {
        setUsers(data.items);
        // Check if there are more results to load
        setHasMore(data.total_count > data.items.length);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Handles loading more results for pagination
   */
  const handleLoadMore = async () => {
    setIsLoading(true);
    const nextPage = page + 1;
    try {
      const response = await fetch(buildQueryString(nextPage));
      if (!response.ok) {
        throw new Error('Failed to load more users.');
      }
      const data = await response.json();
      setUsers((prevUsers) => [...prevUsers, ...data.items]); // Append new results
      setPage(nextPage); // Increment the page number
      // Check if there are more results to load based on total and current count
      setHasMore(data.total_count > users.length + data.items.length);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center p-4 text-white font-sans">
      <div className="w-full max-w-3xl bg-gray-800 rounded-2xl shadow-2xl p-8 space-y-8">
        {/* Application Title */}
        <h1 className="text-4xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-blue-500">
          Advanced GitHub Search
        </h1>

        {/* Advanced Search Form */}
        <form onSubmit={handleSearch} className="mb-6 space-y-4">
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="GitHub Username"
            className="w-full p-3 rounded-xl bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Location (e.g., San Francisco)"
            className="w-full p-3 rounded-xl bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <input
            type="number"
            value={minRepos}
            onChange={(e) => setMinRepos(e.target.value)}
            placeholder="Minimum Repositories"
            className="w-full p-3 rounded-xl bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <button
            type="submit"
            className="w-full p-3 bg-gradient-to-r from-indigo-500 to-blue-600 text-white font-bold rounded-xl shadow-lg hover:from-indigo-600 hover:to-blue-700 transition duration-300 ease-in-out transform hover:scale-105"
            disabled={isLoading}
          >
            {isLoading ? 'Searching...' : 'Search'}
          </button>
        </form>

        {/* Conditional Rendering of Results */}
        <div className="text-center">
          {isLoading && (
            <div className="flex justify-center items-center">
              <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-indigo-500"></div>
              <p className="ml-4 text-xl text-indigo-400">Loading...</p>
            </div>
          )}
          
          {error && (
            <div className="bg-red-500/20 text-red-300 p-4 rounded-xl text-center shadow-inner">
              <p className="font-semibold">{error}</p>
            </div>
          )}
          
          {/* Display the list of users */}
          {users.length > 0 && (
            <div className="space-y-4">
              {users.map((user) => (
                <div
                  key={user.id}
                  className="bg-gray-700 p-6 rounded-2xl shadow-lg flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4 transition duration-300 hover:bg-gray-600"
                >
                  <img
                    src={user.avatar_url}
                    alt={user.login}
                    className="w-20 h-20 rounded-full border-2 border-indigo-500 shadow-md"
                  />
                  <div className="text-center sm:text-left flex-grow">
                    <h3 className="text-2xl font-bold text-teal-300">
                      {user.login}
                    </h3>
                    <p className="text-sm text-gray-400 mt-1">
                      <a
                        href={user.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-indigo-400 hover:text-indigo-300 underline"
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
              className="mt-6 p-3 px-6 bg-gradient-to-r from-gray-600 to-gray-700 text-white font-bold rounded-xl shadow-lg hover:from-gray-700 hover:to-gray-800 transition duration-300"
            >
              Load More
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

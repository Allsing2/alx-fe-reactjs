import React, { useState } from 'react';

// The main application component
export default function App() {
  // State to hold the user's search query
  const [searchQuery, setSearchQuery] = useState('');
  // State to store the user data fetched from the API
  const [userData, setUserData] = useState(null);
  // State to track the loading status during API calls
  const [loading, setLoading] = useState(false);
  // State to store any error messages
  const [error, setError] = useState(null);

  /**
   * Handles the form submission to fetch GitHub user data.
   * @param {Event} e The form submission event
   */
  const handleSearch = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    // Reset previous state and set loading to true
    setLoading(true);
    setUserData(null);
    setError(null);

    // Guard clause for empty search query
    if (!searchQuery.trim()) {
      setError('Please enter a GitHub username.');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`https://api.github.com/users/${searchQuery}`);

      // Check if the API request was successful
      if (!response.ok) {
        // If not successful, display the custom error message
        setError("Looks like we can't find the user.");
      } else {
        // Parse the JSON response if successful
        const data = await response.json();
        setUserData(data);
      }
    } catch (err) {
      // Catch any other network-related errors during the fetch
      setError("An unexpected error occurred. Please try again.");
    } finally {
      // This block will always execute, regardless of success or failure
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center p-4 text-white">
      <div className="w-full max-w-2xl bg-gray-800 rounded-2xl shadow-xl p-8 space-y-8">
        {/* Application Title */}
        <h1 className="text-4xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-blue-500">
          GitHub User Search
        </h1>

        {/* Search Form */}
        <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-4">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Enter GitHub username"
            className="flex-grow p-3 rounded-xl bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-teal-500 placeholder-gray-400"
          />
          <button
            type="submit"
            className="p-3 bg-gradient-to-r from-teal-500 to-blue-600 text-white font-bold rounded-xl shadow-lg hover:from-teal-600 hover:to-blue-700 transition duration-300 ease-in-out transform hover:scale-105"
            disabled={loading}
          >
            {loading ? 'Searching...' : 'Search'}
          </button>
        </form>

        {/* Conditional rendering for status and results */}
        <div className="mt-8">
          {loading && (
            <div className="flex justify-center items-center">
              <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-teal-500"></div>
              <p className="ml-4 text-xl text-teal-400">Loading...</p>
            </div>
          )}

          {error && (
            <div className="bg-red-500/20 text-red-300 p-4 rounded-xl text-center shadow-inner">
              <p className="font-semibold">{error}</p>
            </div>
          )}

          {userData && (
            <div className="bg-gray-700 p-6 rounded-2xl shadow-lg flex flex-col sm:flex-row items-center space-y-6 sm:space-y-0 sm:space-x-6">
              {/* User Avatar */}
              <img
                src={userData.avatar_url}
                alt={`${userData.login}'s avatar`}
                className="w-32 h-32 rounded-full border-4 border-teal-500 shadow-xl"
              />

              {/* User Details */}
              <div className="flex-grow text-center sm:text-left">
                <h2 className="text-3xl font-bold text-teal-300 mb-1">
                  {userData.name || userData.login}
                </h2>
                <p className="text-xl text-gray-400 mb-2">@{userData.login}</p>
                {userData.bio && (
                  <p className="text-gray-300 text-lg italic mt-4">{userData.bio}</p>
                )}
                <div className="flex flex-col sm:flex-row justify-center sm:justify-start gap-4 mt-4 text-sm font-semibold">
                  <span className="bg-gray-600 text-gray-200 px-3 py-1 rounded-full shadow-md">
                    Followers: {userData.followers}
                  </span>
                  <span className="bg-gray-600 text-gray-200 px-3 py-1 rounded-full shadow-md">
                    Following: {userData.following}
                  </span>
                  <span className="bg-gray-600 text-gray-200 px-3 py-1 rounded-full shadow-md">
                    Public Repos: {userData.public_repos}
                  </span>
                </div>
                <a
                  href={userData.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-block px-6 py-2 bg-blue-600 text-white rounded-full font-bold shadow-lg hover:bg-blue-700 transition duration-300"
                >
                  View Profile
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

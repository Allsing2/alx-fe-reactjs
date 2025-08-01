// src/components/UserSearch.jsx

// 1. Import necessary React hooks and components
// We use useState for managing component state (search term, user data, etc.).
// We use useEffect for handling side effects, but it's not strictly needed here
// since the fetch is triggered by a form submit.
import React, { useState } from 'react';

// 2. Import the API service function
// This function will handle the actual API call to GitHub.
import { fetchUserData } from '../services/githubService.js';

// 3. Define the UserSearch component
function UserSearch() {
  // 4. Set up state variables using the useState hook
  // `username`: stores the value from the search input field.
  // `userData`: stores the user data fetched from the API.
  // `isLoading`: a boolean to track the loading state for conditional rendering.
  // `error`: stores an error message if the API call fails.
  const [username, setUsername] = useState('');
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // 5. Handle the form submission
  const handleSubmit = async (event) => {
    // Prevent the default form submission behavior (page reload)
    event.preventDefault();

    // Reset previous states before a new search
    setUserData(null);
    setError('');

    // Only proceed with the API call if the username is not empty
    if (!username.trim()) {
      setError('Please enter a GitHub username.');
      return;
    }

    // Set loading state to true and fetch data
    setIsLoading(true);
    try {
      // Call the service function to fetch user data
      const data = await fetchUserData(username);
      // If data is successfully returned, update the userData state
      setUserData(data);
    } catch (err) {
      // If an error occurs, set the error state
      setError(err.message);
    } finally {
      // Always set loading to false after the request is complete
      setIsLoading(false);
    }
  };

  // 6. Handle the input change
  const handleInputChange = (event) => {
    // Update the username state as the user types
    setUsername(event.target.value);
  };

  // 7. Render the component's UI
  return (
    <div>
      {/* Search Form */}
      {/* We use flexbox and rounded corners for a clean, modern look */}
      <form onSubmit={handleSubmit} className="mb-6 flex space-x-2">
        <input
          type="text"
          value={username}
          onChange={handleInputChange}
          placeholder="Enter GitHub username"
          className="flex-1 p-3 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <button
          type="submit"
          className="p-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition duration-300"
        >
          Search
        </button>
      </form>

      {/* Conditional Rendering of Results */}
      <div className="text-center">
        {/* If isLoading is true, show a loading message */}
        {isLoading && <p>Loading...</p>}

        {/* If there's an error, show the error message */}
        {error && <p className="text-red-400">{error}</p>}

        {/* If userData exists (and is not null), display the user's info */}
        {userData && (
          <div className="bg-gray-700 p-6 rounded-xl shadow-md flex flex-col items-center space-y-4">
            {/* User Avatar */}
            <img 
              src={userData.avatar_url}
              alt={userData.login}
              className="w-24 h-24 rounded-full border-4 border-indigo-500"
            />
            {/* User Name and Login */}
            <h2 className="text-2xl font-semibold">{userData.name || userData.login}</h2>
            {/* Link to GitHub Profile */}
            <a
              href={userData.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-400 hover:text-indigo-300 transition duration-300"
            >
              View GitHub Profile
            </a>
          </div>
        )}
      </div>
    </div>
  );
}

// 8. Export the component for use in other files
export default UserSearch;
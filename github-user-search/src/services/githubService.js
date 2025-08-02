// src/services/githubService.js

import axios from 'axios';

// 1. Define an asynchronous function to search for users
// This function takes an object with search parameters
export async function searchUsers({ username, location, minRepos, page = 1 }) {
  // 2. Build the query string for the advanced search API
  let queryString = '';

  // Add username to the query if it exists
  if (username) {
    queryString += `user:${username}`;
  }

  // Add location to the query if it exists
  if (location) {
    queryString += `+location:"${location}"`;
  }
  
  // Add minimum repositories to the query if it exists
  if (minRepos) {
    queryString += `+repos:>=${minRepos}`;
  }

  // 3. Construct the full API URL with the query string and pagination
  const url = `https://api.github.com/search/users?q=${queryString.trim()}&page=${page}&per_page=10`;

  try {
    // 4. Make the API request using axios.get
    const response = await axios.get(url);
    
    // 5. The advanced search API returns an object with a 'total_count' and 'items' array
    return response.data;
    
  } catch (error) {
    // 6. Handle errors from the Axios request
    if (error.response) {
      // The request was made, but the server responded with an error
      if (error.response.status === 404) {
        throw new Error("Looks like we can't find any users matching that criteria.");
      }
      throw new Error(`Error: ${error.response.status} - ${error.response.data.message}`);
    } else if (error.request) {
      // The request was made, but no response was received
      throw new Error("No response received from the server.");
    } else {
      // Something else went wrong
      throw new Error("Error setting up the request.");
    }
  }
};

/**
 * Fetches detailed user data from the GitHub API.
 * @param {string} username The username of the GitHub user to fetch.
 * @returns {Promise<object>} A promise that resolves to the user data.
 * @throws {Error} Throws an error if the request fails or the user is not found.
 */
export async function fetchUserData(username) {
  const url = `https://api.github.com/users/${username}`;

  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    if (error.response) {
      if (error.response.status === 404) {
        throw new Error("User not found. Please check the username.");
      }
      throw new Error(`Error: ${error.response.status} - ${error.response.data.message}`);
    } else if (error.request) {
      throw new Error("No response received from the server.");
    } else {
      throw new Error("Error setting up the request.");
    }
  }
}

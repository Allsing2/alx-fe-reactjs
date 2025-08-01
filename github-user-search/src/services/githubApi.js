// src/services/githubApi.js

// 1. Access the environment variable
// The 'VITE_APP_GITHUB_API_KEY' is read from the .env file
// by the build tool (Vite) and made available here.
const GITHUB_API_KEY = import.meta.env.VITE_APP_GITHUB_API_KEY;

// 2. Define the base URL for the GitHub API
const GITHUB_API_BASE_URL = 'https://api.github.com';

// 3. Create a reusable function to fetch user data
// This function encapsulates all the logic for a single API endpoint.
export async function searchGithubUser(username) {
  // Construct the full API endpoint URL
  const url = `${GITHUB_API_BASE_URL}/users/${username}`;

  // 4. Set up headers for the API request
  // The Authorization header with a token provides authentication,
  // which can increase your API rate limits.
  const headers = {
    'Authorization': `token ${GITHUB_API_KEY}`,
    'Accept': 'application/vnd.github.v3+json', // Recommended by GitHub for a specific API version
  };

  try {
    // 5. Make the API call using the browser's native fetch() API
    const response = await fetch(url, { headers });

    // 6. Handle the response
    // If the response is not successful (e.g., a 404 Not Found or a 403 Forbidden),
    // we throw an error to be caught by the component that called this function.
    if (!response.ok) {
      // Create a more informative error message
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to fetch user data');
    }

    // 7. Parse and return the JSON data
    const userData = await response.json();
    return userData;
  } catch (error) {
    // 8. Handle network or other errors during the request
    console.error("Error fetching GitHub user:", error);
    // Rethrow the error so the component can handle it (e.g., display an error message)
    throw error;
  }
}
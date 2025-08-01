// src/services/githubService.js

// 1. Define an asynchronous function to fetch user data
// This function takes a `username` as its only argument.
export async function fetchUserData(username) {
  // 2. Construct the API URL
  // We use the provided GitHub API endpoint and interpolate the username.
  const url = `https://api.github.com/users/${username}`;

  // 3. Make the API request using the Fetch API
  try {
    const response = await fetch(url);

    // 4. Handle HTTP errors
    // If the response status is not OK (e.g., 404 Not Found), throw an error.
    if (!response.ok) {
      // Check for a 404 specifically for a more user-friendly message
      if (response.status === 404) {
        throw new Error("Looks like we can't find that user.");
      }
      // For other errors, provide a generic message
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // 5. Parse the JSON data from the response
    const data = await response.json();
    return data;
    
  } catch (error) {
    // 6. Log and re-throw the error
    // This allows the calling component (UserSearch) to catch and handle it.
    console.error("Error fetching user data:", error);
    throw error;
  }
}
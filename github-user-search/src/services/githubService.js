// src/services/githubService.js

// 1. Import the axios library
// This is the correct way to import the library for use in this file.
import axios from 'axios';

// 2. Define an asynchronous function to fetch user data
// This function takes a `username` as its only argument.
export async function fetchUserData(username) {
  // 3. Construct the API URL
  // We use the provided GitHub API endpoint and interpolate the username.
  const url = `https://api.github.com/users/${username}`;

  try {
    // 4. Make the API request using axios.get
    // Axios returns a response object with a `data` property that contains the JSON payload.
    const response = await axios.get(url);
    
    // 5. Return the data directly from the response
    return response.data;
    
  } catch (error) {
    // 6. Handle errors specifically for Axios
    // Axios throws an error for any response outside the 2xx status code range.
    // We can access the response status and data from the error object.
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      if (error.response.status === 404) {
        throw new Error("Looks like we can't find that user.");
      }
      throw new Error(`Error: ${error.response.status} - ${error.response.statusText}`);
    } else if (error.request) {
      // The request was made but no response was received
      throw new Error("No response received from the server.");
    } else {
      // Something happened in setting up the request that triggered an Error
      throw new Error("Error setting up the request.");
    }
  }
}
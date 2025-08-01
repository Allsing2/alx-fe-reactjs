// src/components/UserSearch.jsx

// 1. Import necessary hooks and components
// 'useState' is a React Hook that lets you add state to functional components.
// It allows us to track changing data in our component.
import React, { useState } from 'react';

// 2. Import the API service function
// We import the function that we created earlier.
// This function handles all the logic for making the API call to GitHub.
// Our component doesn't need to know the API URL or the secret key.
import { searchGithubUser } from '../services/githubApi';

// 3. Define the main functional component
// This is a standard functional component in React.
function UserSearch() {
  // 4. State Management with useState
  // We use useState to declare state variables.
  // The first item in the array is the state variable itself.
  // The second item is the function to update that state.

  // 'username' will store the text from our input field.
  const [username, setUsername] = useState('');
  
  // 'userData' will store the data we get back from the GitHub API.
  // It's initialized as 'null' because we haven't fetched any data yet.
  const [userData, setUserData] = useState(null);
  
  // 'isLoading' is a boolean flag to let us know when an API call is in progress.
  // This is useful for showing a loading state to the user.
  const [isLoading, setIsLoading] = useState(false);
  
  // 'error' will store any error messages we receive from the API or network.
  // It's initialized as 'null' because there are no errors initially.
  const [error, setError] = useState(null);

  // 5. Define the event handler for form submission
  // This is an 'async' function because it will be making an asynchronous API call.
  // The 'event' parameter is passed automatically by the browser when the form is submitted.
  const handleSearch = async (event) => {
    // Prevent the default browser behavior of a form submission, which is to reload the page.
    event.preventDefault();

    // Reset all state variables before making a new API call
    // This clears any previous user data, error messages, or loading states.
    setIsLoading(true);
    setError(null);
    setUserData(null);

    try {
      // 6. Call the API service function and handle the result
      // The 'await' keyword pauses the function execution until the 'searchGithubUser'
      // function returns with a successful result.
      const data = await searchGithubUser(username);
      
      // Update the 'userData' state with the fetched data
      setUserData(data);
    } catch (err) {
      // 7. Error Handling
      // If the 'searchGithubUser' function throws an error (e.g., API returns 404),
      // the code jumps to this 'catch' block.
      setError(err.message);
    } finally {
      // 8. The 'finally' block
      // The code in this block always runs, regardless of whether the try block
      // succeeded or failed. This is the perfect place to set 'isLoading' back to false.
      setIsLoading(false);
    }
  };

  // 9. The Component's JSX (UI Rendering)
  // The return statement contains the UI that will be rendered by this component.
  return (
    <div>
      {/* The form element triggers the 'handleSearch' function on submission */}
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={username} // The input value is controlled by our 'username' state
          onChange={(e) => setUsername(e.target.value)} // Update state on every keystroke
          placeholder="Enter GitHub username"
        />
        <button type="submit" disabled={isLoading}>
          {/* Use conditional text for the button */}
          {isLoading ? 'Searching...' : 'Search'}
        </button>
      </form>

      {/* 10. Conditional Rendering */}
      {/* These lines render different parts of the UI based on the component's state. */}
      
      {/* If 'error' is not null, display the error message */}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      
      {/* If 'userData' is not null, display the user's information */}
      {userData && (
        <div>
          <h2>{userData.name}</h2>
          <p>Public Repos: {userData.public_repos}</p>
          <img src={userData.avatar_url} alt={`${userData.name}'s avatar`} width="100" />
        </div>
      )}
    </div>
  );
}

// 11. Export the component for use in other files
export default UserSearch;
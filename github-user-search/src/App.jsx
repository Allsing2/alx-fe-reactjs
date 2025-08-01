import index from 'index.js';
import React from 'react';
import Search from './components/Search.jsx';
import packageJson from '../package.json';

// 2. Define the main App component
// This is the top-level component of our application.
// Its primary role is to set up the overall layout and render other child components.
function App() {
  return (
    // 3. Set up the main container with Tailwind CSS for styling
    // 'min-h-screen' makes sure the container takes up at least the full height of the viewport.
    // 'bg-gray-900' sets a dark background color.
    // 'text-white' sets the text color to white for readability on the dark background.
    // 'flex items-center justify-center' centers the content both horizontally and vertically.
    // 'p-4' adds padding on all sides for mobile responsiveness.
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center p-4">
      {/* 4. The main content card */}
      {/* 'max-w-lg' limits the width of the card on larger screens.
          'w-full' ensures it takes full width on smaller screens.
          'bg-gray-800' provides a slightly lighter background for the card itself.
          'p-8' adds generous padding inside the card.
          'rounded-xl' gives it rounded corners.
          'shadow-lg' adds a subtle shadow. */}
      <div className="max-w-lg w-full bg-gray-800 p-8 rounded-xl shadow-lg">
        {/* 5. A simple title for the application */}
        <h1 className="text-3xl font-bold text-center mb-6 text-indigo-400">
          GitHub User Search
        </h1>
        
        {/* 6. Render the main functional component */}
        {/* We place the UserSearch component here. This is where all the user interaction
            and data display will happen, keeping our App.jsx file clean and simple. */}
        <UserSearch />
      </div>
    </div>
  );
}

// 7. Export the App component as the default export
// This makes the 'App' component available to be imported and used in other files,
// typically in 'main.jsx' or 'index.jsx' to render the entire application.
export default App;
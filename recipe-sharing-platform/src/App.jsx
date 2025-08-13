import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// Import our new components
import AddRecipeForm from './components/AddRecipeForm';
import Navbar from './components/Navbar';
import HomePage from './components/HomePage';
import RecipeDetail from './components/RecipeDetail';

function App() {
  return (
    // The Router component is the engine for our app's navigation.
    <Router>
      {/* The Navbar is placed outside the Routes, so it is always visible on every page. */}
      <Navbar />
      
      {/* The Routes component acts as a container for all our different pages. */}
      <Routes>
        {/* The first route is for our homepage, which is the root path "/" */}
        <Route path="/" element={<HomePage />} />
        
        {/* This route uses a dynamic parameter ":id" to show a specific recipe. */}
        <Route path="/recipe/:id" element={<RecipeDetail />} />
        <Route path="/add-recipe" element={<AddRecipeForm />} />
      </Routes>
    </Router>
  );
}

export default App;
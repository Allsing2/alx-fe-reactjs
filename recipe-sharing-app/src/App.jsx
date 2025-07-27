import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RecipeList from './components/RecipeList';
import AddRecipeForm from './components/AddRecipeForm';
import RecipeDetails from './components/RecipeDetails';
import './App.css';
import './index.css'; // Tailwind CSS directives

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100 font-sans text-gray-900 antialiased p-4">
        <header className="text-center py-8 bg-white shadow-md rounded-lg mb-8">
          <h1 className="text-4xl font-extrabold text-blue-600">My Recipe Sharing App</h1>
          <p className="text-gray-600 mt-2">Discover, add, edit, and share your favorite recipes!</p>
        </header>

        <main className="container mx-auto">
          <Routes>
            {/* Home page route: displays add form and recipe list */}
            <Route path="/" element={
              <>
                <AddRecipeForm />
                <hr className="my-10 border-gray-300" />
                <RecipeList />
              </>
            } />
            {/* Recipe details page route: displays a single recipe by ID */}
            <Route path="/recipes/:recipeId" element={<RecipeDetails />} />
            {/* Fallback route for unmatched paths */}
            <Route path="*" element={
              <div className="text-center p-8">
                <h2 className="text-3xl font-bold text-red-600 mb-4">404 - Page Not Found</h2>
                <p className="text-gray-700">The page you are looking for does not exist.</p>
                <button
                  onClick={() => window.location.href = '/'} // Simple navigation to home
                  className="mt-6 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md transition-colors duration-300"
                >
                  Go to Home
                </button>
              </div>
            } />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;

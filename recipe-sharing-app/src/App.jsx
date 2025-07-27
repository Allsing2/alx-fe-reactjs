import './App.css'
import RecipeList from './components/RecipeList'
import AddRecipeForm from './components/AddRecipeForm'
import recipeStoreecipeStore from components/recipeStore.js


function App() {
  return (
    <div className="app">
      <header>
        <h1>Recipe Sharing App</h1>
      </header>
      <main>
        <AddRecipeForm />
        <RecipeList />
      </main>
    </div>
  );
}

export default App;
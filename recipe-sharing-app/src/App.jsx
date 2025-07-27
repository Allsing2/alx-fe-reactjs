import RecipeList from './components/RecipeList';
import AddRecipeForm from './components/AddRecipeForm';
import './App.css'; // Assuming you might have some basic styling here

function App() {
  return (
    <div className="App" style={{ fontFamily: 'Arial, sans-serif', padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h1>My Recipe Sharing App</h1>
      <AddRecipeForm />
      <hr style={{ margin: '30px 0' }} />
      <RecipeList />
    </div>
  );
}

export default App;
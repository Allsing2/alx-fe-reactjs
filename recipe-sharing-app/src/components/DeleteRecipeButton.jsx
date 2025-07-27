// Note: This component is not directly used as a standalone component in the current setup.
// Its functionality (deleteRecipe and navigation) has been integrated directly into RecipeDetails.jsx
// for a more streamlined user experience within the recipe detail view.
// If you need a standalone button, you can use the logic below.

import { useRecipeStore } from '../recipeStore';
import { useNavigate } from 'react-router-dom';

const DeleteRecipeButton = ({ recipeId }) => {
  const deleteRecipe = useRecipeStore(state => state.deleteRecipe);
  const navigate = useNavigate();

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this recipe?')) {
      deleteRecipe(recipeId);
      navigate('/'); // Navigate back to the home page after deletion
    }
  };

  return (
    <button
      onClick={handleDelete}
      className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-md transition-colors duration-300"
    >
      Delete Recipe
    </button>
  );
};

export default DeleteRecipeButton;

import { useRecipeStore } from '../recipeStore';
import { Link } from 'react-router-dom';

const RecipeList = () => {
  const recipes = useRecipeStore(state => state.recipes);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Your Recipes</h2>
      {recipes.length === 0 ? (
        <p className="text-gray-600 italic">No recipes added yet. Add some delicious recipes!</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recipes.map(recipe => (
            <div key={recipe.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2 text-gray-900">{recipe.title}</h3>
                <p className="text-gray-700 text-sm line-clamp-3 mb-4">{recipe.description}</p>
                <Link
                  to={`/recipes/${recipe.id}`}
                  className="inline-block bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md transition-colors duration-300"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RecipeList;

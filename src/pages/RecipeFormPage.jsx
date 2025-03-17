import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import RecipeForm from "../components/RecipeForm/RecipeForm.jsx";

const RecipeFormPage = () => {
  const { id } = useParams();
  const existingRecipe = useSelector(state =>
    state.recipes.find(recipe => recipe.id === id)
  );

  return (
    <div>
      <RecipeForm existingRecipe={existingRecipe} />
    </div>
  );
};

export default RecipeFormPage;

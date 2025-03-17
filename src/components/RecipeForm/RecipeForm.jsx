import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addRecipe, updateRecipe, deleteRecipe } from "../../store/store";
import "./RecipeForm.css";

const RecipeForm = ({ existingRecipe }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState(
    existingRecipe || {
      id: "",
      title: "",
      category: "",
      ingredients: "",
      preparation: ""
    }
  );
  const [error, setError] = useState("");

  const generateId = () => "recipe-" + new Date().getTime();

  const handleChange = e => {
    setRecipe({
      ...recipe,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = e => {
    e.preventDefault();

    if (
      !recipe.title ||
      !recipe.category ||
      !recipe.ingredients ||
      !recipe.preparation
    ) {
      setError("Please fill out all fields before submitting.");
      return;
    }
    setError("");

    let updatedRecipes = JSON.parse(localStorage.getItem("recipes")) || [];

    if (recipe.id) {
      dispatch(updateRecipe(recipe));
      updatedRecipes = updatedRecipes.map(
        r => (r.id === recipe.id ? recipe : r)
      );
    } else {
      const newRecipe = { ...recipe, id: generateId() };
      dispatch(addRecipe(newRecipe));
      updatedRecipes.push(newRecipe);
    }

    localStorage.setItem("recipes", JSON.stringify(updatedRecipes));
    setRecipe({
      id: "",
      title: "",
      category: "",
      ingredients: "",
      preparation: ""
    });
  };

  const handleDelete = () => {
    if (recipe.id) {
      dispatch(deleteRecipe(recipe.id));
      let updatedRecipes = JSON.parse(localStorage.getItem("recipes")) || [];
      updatedRecipes = updatedRecipes.filter(r => r.id !== recipe.id);
      localStorage.setItem("recipes", JSON.stringify(updatedRecipes));
      setRecipe({
        id: "",
        title: "",
        category: "",
        ingredients: "",
        preparation: ""
      });
      navigate("/");
    }
  };

  return (
    <div className="add-edit-container">
      {error &&
        <p className="error-message">
          {error}
        </p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          value={recipe.title}
          onChange={handleChange}
          placeholder="Title"
        />
        <textarea
          name="category"
          value={recipe.category}
          onChange={handleChange}
          placeholder="Categories (comma separated)"
        />
        <textarea
          name="ingredients"
          value={recipe.ingredients}
          onChange={handleChange}
          placeholder="Ingredients (comma separated)"
        />
        <textarea
          name="preparation"
          value={recipe.preparation}
          onChange={handleChange}
          placeholder="Preparation"
        />
        <button type="submit">
          {recipe.id ? "Update Recipe" : "Add Recipe"}
        </button>
        {recipe.id &&
          <button type="button" onClick={handleDelete}>
            Delete Recipe
          </button>}
      </form>
    </div>
  );
};

export default RecipeForm;

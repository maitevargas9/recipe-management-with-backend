import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import { addFavorite, removeFavorite, deleteRecipe } from "../../store/store";
import dataRecipes from "../../data/recipes.json" with { type: "json" };
import "./RecipeDetail.css";

export default function RecipeDetail() {
  const { id } = useParams();
  const [recipes, setRecipes] = useState([]);
  const recipe = recipes.find(r => r.id === id);
  const dispatch = useDispatch();
  const favorites = useSelector(state => state.favorites);
  const isFavorite = favorites.includes(id);

  useEffect(() => {
    const savedRecipes = JSON.parse(localStorage.getItem("recipes")) || [];
    setRecipes(savedRecipes);
  }, []);

  const handleDelete = () => {
    dispatch(deleteRecipe(id));
  };

  if (!recipe) {
    return <p>Recipe not found.</p>;
  }

  return (
    <div className="recipe-card">
      <p className="recipe-title">
        {recipe.title}
      </p>
      <p className="recipe-category">
        Category: {recipe.category}
      </p>
      <p className="ingredients-list">
        Ingredients: {recipe.ingredients}
      </p>
      <p className="preparation-text">
        Preparation: {recipe.preparation}
      </p>
      <button
        className="favorite-btn"
        onClick={() =>
          isFavorite ? dispatch(removeFavorite(id)) : dispatch(addFavorite(id))}
      >
        {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
      </button>
      <NavLink to={`/edit-recipe/${recipe.id}`}>
        <button className="favorite-btn">Edit Recipe</button>
      </NavLink>
      <button className="favorite-btn" onClick={handleDelete}>
        Delete Recipe
      </button>
    </div>
  );
}

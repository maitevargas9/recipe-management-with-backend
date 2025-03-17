import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import FilterSearch from "../FilterSearch/FilterSearch.jsx";
import {
  getAllCategories,
  getAllIngredients,
  filterRecipes
} from "../../util/filterUtil.js";
import dataRecipes from "../../data/recipes.json" with { type: "json" };
import "./Favorites.css";

export default function Favorites() {
  const [favoritesData, setFavoritesData] = useState([]);
  const [recipesData, setRecipesData] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All Categories");
  const [ingredients, setIngredients] = useState("All Ingredients");

  useEffect(() => {
    const savedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    const savedRecipes = JSON.parse(localStorage.getItem("recipes")) || [];
    setFavoritesData(savedFavorites);
    setRecipesData(savedRecipes);
  }, []);
    
  const favoriteRecipes = recipesData.filter(recipe =>
    favoritesData.includes(recipe.id)
  );
    
  const allCategories = getAllCategories(favoriteRecipes);
  const allIngredients = getAllIngredients(favoriteRecipes);
  const filteredRecipes = filterRecipes(
    favoriteRecipes,
    search,
    category,
    ingredients
  );

  return (
    <div className="favorites-container">
      <FilterSearch
        search={search}
        setSearch={setSearch}
        category={category}
        setCategory={setCategory}
        ingredients={ingredients}
        setIngredients={setIngredients}
        allCategories={allCategories}
        allIngredients={allIngredients}
      />
      <div className="favorite-recipe-list">
        {filteredRecipes.length === 0
          ? <p className="no-favorites">No matching favorites found.</p>
          : <ul className="favorite-recipes-list">
              {filteredRecipes.map(recipe =>
                <li key={recipe.id} className="favorite-recipe-item">
                  <NavLink
                    to={`/recipe/${recipe.id}`}
                    className="favorite-recipe-link"
                  >
                    {recipe.title}
                  </NavLink>
                </li>
              )}
            </ul>}
      </div>
    </div>
  );
}

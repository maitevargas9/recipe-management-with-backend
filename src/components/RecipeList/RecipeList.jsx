import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { fetchRecipes } from "../../store/store";
import FilterSearch from "../FilterSearch/FilterSearch.jsx";
import {
  getAllCategories,
  getAllIngredients,
  filterRecipes
} from "../../util/filterUtil.js";
import "./RecipeList.css";

export default function RecipeList() {
  const [search, setSearch] = useState("");
  const [category, setCategories] = useState("All Categories");
  const [ingredients, setIngredients] = useState("All Ingredients");

  const dispatch = useDispatch();
  const recipes = useSelector(state => state.recipes);

  useEffect(
    () => {
      dispatch(fetchRecipes());
    },
    [dispatch]
  );

  const allCategories = getAllCategories(recipes);
  const allIngredients = getAllIngredients(recipes);
  const filteredRecipes = filterRecipes(recipes, search, category, ingredients);

  return (
    <div className="search-container">
      <FilterSearch
        search={search}
        setSearch={setSearch}
        category={category}
        setCategories={setCategories}
        ingredients={ingredients}
        setIngredients={setIngredients}
        allCategories={allCategories}
        allIngredients={allIngredients}
      />
      <ul className="recipe-list">
        {filteredRecipes.length > 0
          ? <ul className="recipe-list">
              {filteredRecipes.map((recipe, index) =>
                <li key={index} className="recipe-item">
                  <NavLink to={`/recipe/${recipe.id}`} className="recipe-link">
                    {recipe.title}
                  </NavLink>
                </li>
              )}
            </ul>
          : <p className="no-list">No recipes found.</p>}
      </ul>
    </div>
  );
}

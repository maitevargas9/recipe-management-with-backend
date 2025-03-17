export function stringToArray(value) {
  if (!value) return [];
  if (Array.isArray(value)) return value;
  if (typeof value !== "string") return [];
  return value
    .split(",")
    .map((item) => item.trim())
    .filter((item) => item !== "");
}

export function getAllCategories(data) {
  return [
    "All Categories",
    ...new Set(data.flatMap((r) => stringToArray(r.category)))
  ];
}

export function getAllIngredients(data) {
  return [
    "All Ingredients",
    ...new Set(data.flatMap((r) => stringToArray(r.ingredients)))
  ];
}

export function filterRecipes(recipes, search, category, ingredients) {
  return recipes.filter((recipe) => {
    const recipeIngredients = Array.isArray(recipe.ingredients)
      ? recipe.ingredients
      : stringToArray(recipe.ingredients);

    const recipeCategories = Array.isArray(recipe.category)
      ? recipe.category
      : stringToArray(recipe.category);

    const matchesCategory =
      category === "All Categories" || recipeCategories.includes(category);

    const matchesIngredient =
      ingredients === "All Ingredients" ||
      recipeIngredients.includes(ingredients);

    const matchesSearch =
      recipe.title.toLowerCase().includes(search.toLowerCase()) ||
      recipeCategories.some((cat) =>
        cat.toLowerCase().includes(search.toLowerCase())
      ) ||
      recipeIngredients.some((ingredient) =>
        ingredient.toLowerCase().includes(search.toLowerCase())
      );

    return matchesCategory && matchesIngredient && matchesSearch;
  });
}

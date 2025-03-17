import { configureStore, createSlice } from "@reduxjs/toolkit";

const loadRecipes = () => JSON.parse(localStorage.getItem("recipes")) || [];
const saveRecipes = (recipes) =>
  localStorage.setItem("recipes", JSON.stringify(recipes));

const recipesSlice = createSlice({
  name: "recipes",
  initialState: loadRecipes(),
  reducers: {
    addRecipe: (state, action) => {
      state.push(action.payload);
      saveRecipes(state);
    },
    updateRecipe: (state, action) => {
      const index = state.findIndex(
        (recipe) => recipe.id === action.payload.id
      );
      if (index !== -1) {
        state[index] = action.payload;
        saveRecipes(state);
      }
    },
    deleteRecipe: (state, action) => {
      const updatedState = state.filter(
        (recipe) => recipe.id !== action.payload
      );
      saveRecipes(updatedState);
      return updatedState;
    }
  }
});

const favoritesSlice = createSlice({
  name: "favorites",
  initialState: JSON.parse(localStorage.getItem("favorites")) || [],
  reducers: {
    addFavorite: (state, action) => {
      if (!state.includes(action.payload)) {
        state.push(action.payload);
      }
      localStorage.setItem("favorites", JSON.stringify(state));
    },
    removeFavorite: (state, action) => {
      const updatedState = state.filter((id) => id !== action.payload);
      localStorage.setItem("favorites", JSON.stringify(updatedState));
      return updatedState;
    }
  }
});

export const { addRecipe, updateRecipe, deleteRecipe } = recipesSlice.actions;
export const { addFavorite, removeFavorite } = favoritesSlice.actions;

const store = configureStore({
  reducer: {
    recipes: recipesSlice.reducer,
    favorites: favoritesSlice.reducer
  }
});

export default store;

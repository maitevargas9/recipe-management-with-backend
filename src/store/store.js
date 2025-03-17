import {
  configureStore,
  createSlice,
  createAsyncThunk
} from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:3000/recipes";
const FAVORITES_URL = "http://localhost:3000/favorites";

export const fetchRecipes = createAsyncThunk(
  "recipes/fetchRecipes",
  async () => {
    const response = await axios.get(API_URL);
    return response.data;
  }
);

export const addRecipe = createAsyncThunk(
  "recipes/addRecipe",
  async (recipe) => {
    const response = await axios.post(API_URL, recipe);
    return response.data;
  }
);

export const updateRecipe = createAsyncThunk(
  "recipes/updateRecipe",
  async (recipe) => {
    const response = await axios.put(`${API_URL}/${recipe.id}`, recipe);
    return response.data;
  }
);

export const deleteRecipe = createAsyncThunk(
  "recipes/deleteRecipe",
  async (id) => {
    await axios.delete(`${API_URL}/${id}`);
    return id;
  }
);

export const fetchFavorites = createAsyncThunk(
  "favorites/fetchFavorites",
  async () => {
    const response = await axios.get(FAVORITES_URL);
    return response.data;
  }
);

export const addFavorite = createAsyncThunk(
  "favorites/addFavorite",
  async (id) => {
    await axios.post(FAVORITES_URL, { id });
    return id;
  }
);

export const removeFavorite = createAsyncThunk(
  "favorites/removeFavorite",
  async (id) => {
    await axios.delete(`${FAVORITES_URL}/${id}`);
    return id;
  }
);

const recipesSlice = createSlice({
  name: "recipes",
  initialState: [],
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRecipes.fulfilled, (state, action) => action.payload)
      .addCase(addRecipe.fulfilled, (state, action) => {
        state.push(action.payload);
      })
      .addCase(updateRecipe.fulfilled, (state, action) => {
        const index = state.findIndex((r) => r.id === action.payload.id);
        if (index !== -1) state[index] = action.payload;
      })
      .addCase(deleteRecipe.fulfilled, (state, action) => {
        return state.filter((r) => r.id !== action.payload);
      });
  }
});

const favoritesSlice = createSlice({
  name: "favorites",
  initialState: [],
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFavorites.fulfilled, (state, action) => action.payload)
      .addCase(addFavorite.fulfilled, (state, action) => {
        if (!state.includes(action.payload)) state.push(action.payload);
      })
      .addCase(removeFavorite.fulfilled, (state, action) => {
        return state.filter((id) => id !== action.payload);
      });
  }
});

const store = configureStore({
  reducer: {
    recipes: recipesSlice.reducer,
    favorites: favoritesSlice.reducer
  }
});

export default store;

import express from "express";
import cors from "cors";
import fs from "fs";

const app = express();
const DATA_FILE = "./recipes.json";
const FAVORITES_FILE = "./favorites.json";

app.use(express.json());
app.use(cors());

const loadData = (file) => {
  if (!fs.existsSync(file)) return [];
  const data = fs.readFileSync(file);
  return JSON.parse(data);
};

const saveData = (file, data) => {
  fs.writeFileSync(file, JSON.stringify(data, null, 2));
};

let recipes = loadData(DATA_FILE);
let favorites = loadData(FAVORITES_FILE);

app.get("/recipes", (req, res) => {
  res.json(recipes);
});

app.post("/recipes", (req, res) => {
  const newRecipe = { id: recipes.length + 1, ...req.body };
  recipes.push(newRecipe);
  saveRecipes(recipes);
  res.status(201).json(newRecipe);
});

app.get("/recipes/:id", (req, res) => {
  const recipe = recipes.find((r) => r.id === parseInt(req.params.id));
  if (!recipe) return res.status(404).json({ message: "Recipe not found" });
  res.json(recipe);
});

app.put("/recipes/:id", (req, res) => {
  const index = recipes.findIndex((r) => r.id === parseInt(req.params.id));
  if (index === -1)
    return res.status(404).json({ message: "Recipe not found" });
  recipes[index] = { ...recipes[index], ...req.body };
  saveRecipes(recipes);
  res.json(recipes[index]);
});

app.delete("/recipes/:id", (req, res) => {
  recipes = recipes.filter((r) => r.id !== parseInt(req.params.id));
  saveRecipes(recipes);
  res.json({ message: "Recipe deleted" });
});

app.post("/favorites", (req, res) => {
  const { id } = req.body;
  if (!favorites.includes(id)) {
    favorites.push(id);
    saveData(FAVORITES_FILE, favorites);
  }
  res.json({ message: "Recipe added to favorites", favorites });
});

app.delete("/favorites/:id", (req, res) => {
  favorites = favorites.filter((favId) => favId !== parseInt(req.params.id));
  saveData(FAVORITES_FILE, favorites);
  res.json({ message: "Recipe deleted to favorites", favorites });
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});

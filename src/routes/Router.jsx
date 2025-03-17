import { Provider } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RecipeListPage from "../pages/RecipeListPage";
import RecipeDetailPage from "../pages/RecipeDetailPage";
import RecipeFormPage from "../pages/RecipeFormPage";
import FavoritesPage from "../pages/FavoritesPage";
import MainLayout from "../layouts/MainLayout";
import store from "../store/store";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <RecipeListPage /> },
      { path: "recipe/:id", element: <RecipeDetailPage /> },
      { path: "favorites", element: <FavoritesPage /> },
      { path: "add-recipe", element: <RecipeFormPage /> },
      { path: "edit-recipe/:id", element: <RecipeFormPage /> }
    ]
  }
]);

const AppRouter = () => {
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
};

export default AppRouter;

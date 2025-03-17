import Navigation from "../navigation/Navigation";
import RecipeManagementLogo from "/src/assets/recipe-management.png";
import "./Header.css";

export default function Header() {
  return (
    <div id="header">
      <img src={RecipeManagementLogo} alt="Recipe Management Logo" />
      <h1>Recipe Management</h1>
      <Navigation />
    </div>
  );
}

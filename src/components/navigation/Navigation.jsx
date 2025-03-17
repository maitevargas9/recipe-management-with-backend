import { NavLink } from "react-router-dom";
import { FaPlus } from "react-icons/fa6";
import { FaListAlt } from "react-icons/fa";
import { MdFavorite } from "react-icons/md";
import "./Navigation.css";

export default function Navigation() {
  return (
    <nav className="navbar">
      <ul className="nav-list">
        <li className="nav-item">
          <NavLink to="/add-recipe" className="nav-link">
            <span>New Recipe</span>
            <FaPlus className="nav-icon" />
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/" className="nav-link">
            <span>Recipe List</span>
            <FaListAlt className="nav-icon" />
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/favorites" className="nav-link">
            <span>Favorites</span>
            <MdFavorite className="nav-icon" />
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

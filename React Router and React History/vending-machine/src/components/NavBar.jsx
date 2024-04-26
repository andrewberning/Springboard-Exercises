import { NavLink } from "react-router-dom";
import "./NavBar.css";

export default function NavBar() {
  return (
    <nav className="NavBar">
      <NavLink exact activeClassName="active" to="/" className="NavBar-link">HOME</NavLink>
      <NavLink activeClassName="active" to="/soda" className="NavBar-link">SODA</NavLink>
      <NavLink activeClassName="active" to="/candy" className="NavBar-link">CANDY</NavLink>
      <NavLink activeClassName="active" to="/chips" className="NavBar-link">CHIPS</NavLink>
    </nav>
  )
}
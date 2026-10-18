import { NavLink } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function Navbar() {
  const { cartCount } = useCart();

  return (
    <header className="navbar">
      <div className="nav-inner">
        <NavLink to="/" className="logo">
          <span>🍴</span> Foodie
        </NavLink>

        <nav className="nav-links">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/menu">Menu</NavLink>
          <NavLink to="/about">About</NavLink>
          <NavLink to="/contact">Contact</NavLink>
        </nav>

        <NavLink to="/cart" className="cart-button">
          🛒 Cart <span>{cartCount}</span>
        </NavLink>
      </div>
    </header>
  );
}

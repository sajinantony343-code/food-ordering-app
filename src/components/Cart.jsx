import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import CartItem from "./CartItem";
import CartSummary from "./CartSummary";

export default function Cart() {
  const { cart } = useCart();

  if (cart.length === 0) {
    return (
      <div className="empty-cart">
        <div className="empty-icon">🛒</div>
        <h2>Your cart is empty</h2>
        <p>Add something delicious from our menu.</p>
        <Link to="/menu" className="btn btn-primary">Explore Menu</Link>
      </div>
    );
  }

  return (
    <div className="cart-layout">
      <div className="cart-list">
        {cart.map((item) => (
          <CartItem key={item.id} item={item} />
        ))}
      </div>

      <CartSummary />
    </div>
  );
}

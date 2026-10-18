import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function CartSummary() {
  const { subtotal, tax, deliveryFee, total } = useCart();

  return (
    <aside className="cart-summary">
      <h2>Order Summary</h2>

      <div className="summary-row">
        <span>Subtotal</span>
        <strong>₹{subtotal}</strong>
      </div>

      <div className="summary-row">
        <span>Tax (5%)</span>
        <strong>₹{tax}</strong>
      </div>

      <div className="summary-row">
        <span>Delivery</span>
        <strong>{deliveryFee === 0 && subtotal > 0 ? "FREE" : `₹${deliveryFee}`}</strong>
      </div>

      <div className="summary-divider" />

      <div className="summary-total">
        <span>Total</span>
        <strong>₹{total}</strong>
      </div>

      <Link
        to={subtotal > 0 ? "/checkout" : "/menu"}
        className="btn btn-primary full-width"
      >
        {subtotal > 0 ? "Proceed to Checkout →" : "Browse Menu →"}
      </Link>

      <p className="free-delivery-note">Free delivery on orders above ₹499</p>
    </aside>
  );
}

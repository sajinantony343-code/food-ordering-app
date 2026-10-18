import { useCart } from "../context/CartContext";

export default function OrderSummary() {
  const { cart, subtotal, tax, deliveryFee, total } = useCart();

  return (
    <aside className="checkout-summary">
      <h2>Your Order</h2>

      <div className="checkout-items">
        {cart.map((item) => (
          <div className="checkout-item" key={item.id}>
            <div>
              <strong>{item.name}</strong>
              <span>Qty: {item.quantity}</span>
            </div>
            <strong>₹{item.price * item.quantity}</strong>
          </div>
        ))}
      </div>

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
        <strong>{deliveryFee === 0 ? "FREE" : `₹${deliveryFee}`}</strong>
      </div>

      <div className="summary-divider" />

      <div className="summary-total">
        <span>Total</span>
        <strong>₹{total}</strong>
      </div>
    </aside>
  );
}

import { useCart } from "../context/CartContext";

export default function CartItem({ item }) {
  const { increaseQuantity, decreaseQuantity, removeFromCart } = useCart();

  return (
    <article className="cart-item">
      <img src={item.image} alt={item.name} loading="lazy" decoding="async" width="120" height="120" />

      <div className="cart-item-info">
        <p className="food-category">{item.category}</p>
        <h3>{item.name}</h3>
        <strong>₹{item.price}</strong>
      </div>

      <div className="quantity-control">
        <button type="button" aria-label={`Decrease ${item.name} quantity`} onClick={() => decreaseQuantity(item.id)}>-</button>
        <span aria-live="polite" aria-label={`${item.quantity} items`}>{item.quantity}</span>
        <button type="button" aria-label={`Increase ${item.name} quantity`} onClick={() => increaseQuantity(item.id)}>+</button>
      </div>

      <strong className="item-total">₹{item.price * item.quantity}</strong>

      <button type="button" className="remove-button" aria-label={`Remove ${item.name} from cart`} onClick={() => removeFromCart(item.id)}>
        ×
      </button>
    </article>
  );
}

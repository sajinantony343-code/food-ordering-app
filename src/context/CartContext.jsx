// Compatibility hook while the app migrates from Context to Redux Toolkit.
import { useDispatch, useSelector } from "react-redux";
import { addToCart, clearCart, removeFromCart, selectCartCount, selectCartItems, selectDeliveryFee, selectSubtotal, selectTotal, updateQuantity } from "../store/cartSlice";

export function useCart() {
  const dispatch = useDispatch();
  const cart = useSelector(selectCartItems);
  return {
    cart,
    cartCount: useSelector(selectCartCount),
    subtotal: useSelector(selectSubtotal),
    tax: useSelector((state) => Math.round(selectSubtotal(state) * 0.05)),
    deliveryFee: useSelector(selectDeliveryFee),
    total: useSelector(selectTotal),
    addToCart: (food) => dispatch(addToCart(food)),
    removeFromCart: (id) => dispatch(removeFromCart(id)),
    increaseQuantity: (id) => dispatch(updateQuantity({ id, quantity: (cart.find((item) => item.id === id)?.quantity || 0) + 1 })),
    decreaseQuantity: (id) => dispatch(updateQuantity({ id, quantity: (cart.find((item) => item.id === id)?.quantity || 0) - 1 })),
    updateQuantity: (id, quantity) => dispatch(updateQuantity({ id, quantity })),
    clearCart: () => dispatch(clearCart()),
  };
}

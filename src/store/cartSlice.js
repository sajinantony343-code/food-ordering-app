import { createSlice } from "@reduxjs/toolkit";

function readCart() {
  try {
    const parsed = JSON.parse(localStorage.getItem("foodie-cart") || "[]");
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

const cartSlice = createSlice({
  name: "cart",
  initialState: { foods: [], foodsStatus: "idle", items: readCart() },
  reducers: {
    foodsLoading(state) { state.foodsStatus = "loading"; },
    foodsLoaded(state, action) { state.foods = action.payload; state.foodsStatus = "succeeded"; },
    foodsFailed(state, action) { state.foodsStatus = "failed"; state.foodsError = action.payload || "Could not load the menu."; },
    addToCart(state, action) {
      const food = action.payload;
      const item = state.items.find((entry) => entry.id === food.id);
      if (item) item.quantity += 1;
      else state.items.push({ ...food, quantity: 1 });
    },
    removeFromCart(state, action) { state.items = state.items.filter((item) => item.id !== action.payload); },
    updateQuantity(state, action) {
      const { id, quantity } = action.payload;
      if (quantity <= 0) state.items = state.items.filter((item) => item.id !== id);
      else {
        const item = state.items.find((entry) => entry.id === id);
        if (item) item.quantity = quantity;
      }
    },
    clearCart(state) { state.items = []; },
  },
});

export const { foodsLoading, foodsLoaded, foodsFailed, addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions;
export const selectFoods = (state) => state.cart.foods;
export const selectFoodsStatus = (state) => state.cart.foodsStatus;
export const selectFoodsError = (state) => state.cart.foodsError;
export const selectCartItems = (state) => state.cart.items;
export const selectCartCount = (state) => state.cart.items.reduce((sum, item) => sum + item.quantity, 0);
export const selectSubtotal = (state) => state.cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
export const selectTax = (state) => Math.round(selectSubtotal(state) * 0.05);
export const selectDeliveryFee = (state) => selectSubtotal(state) === 0 || selectSubtotal(state) >= 499 ? 0 : 49;
export const selectTotal = (state) => selectSubtotal(state) + selectTax(state) + selectDeliveryFee(state);
export default cartSlice.reducer;

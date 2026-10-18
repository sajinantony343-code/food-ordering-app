import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import authReducer from "./authSlice";

const cartStorageMiddleware = (store) => (next) => (action) => {
  const result = next(action);
  if (action.type.startsWith("cart/") && action.type !== "cart/foodsLoading" && action.type !== "cart/foodsLoaded" && action.type !== "cart/foodsFailed") {
    const items = store.getState().cart.items;
    try { localStorage.setItem("foodie-cart", JSON.stringify(items)); }
    catch (error) { console.error("Could not save cart:", error); }
    console.info(`[cart middleware] ${action.type}`);
  }
  if (action.type === "auth/loginSucceeded") {
    localStorage.setItem("foodie-token", action.payload.token);
    localStorage.setItem("foodie-user", JSON.stringify(action.payload.user));
  }
  if (action.type === "auth/logout") {
    localStorage.removeItem("foodie-token");
    localStorage.removeItem("foodie-user");
  }
  return result;
};

export const store = configureStore({
  reducer: { cart: cartReducer, auth: authReducer },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(cartStorageMiddleware),
});

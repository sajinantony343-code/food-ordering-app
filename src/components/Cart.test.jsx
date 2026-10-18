import { configureStore } from "@reduxjs/toolkit";
import { fireEvent, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import cartReducer from "../store/cartSlice";
import Cart from "./Cart";

const food = { id: 8, name: "Mango Smoothie", category: "Drinks", price: 120, rating: 4.5, image: "/mango.jpg", description: "Chilled mango.", quantity: 2 };

function renderCart(items) {
  const store = configureStore({
    reducer: { cart: cartReducer },
    preloadedState: { cart: { foods: [], foodsStatus: "succeeded", items } },
  });
  const { container } = render(<Provider store={store}><MemoryRouter><Cart /></MemoryRouter></Provider>);
  return { store, container };
}

describe("Cart", () => {
  test("shows an appropriate empty-cart state", () => {
    renderCart([]);
    expect(screen.getByRole("heading", { name: "Your cart is empty" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Explore Menu" })).toHaveAttribute("href", "/menu");
  });

  test("renders cart food and removes it when requested", () => {
    const { store, container } = renderCart([food]);
    expect(screen.getByRole("heading", { name: "Mango Smoothie" })).toBeInTheDocument();
    expect(container.querySelector(".item-total")).toHaveTextContent("₹240");
    fireEvent.click(screen.getByRole("button", { name: "Remove Mango Smoothie from cart" }));
    expect(store.getState().cart.items).toHaveLength(0);
    expect(screen.getByRole("heading", { name: "Your cart is empty" })).toBeInTheDocument();
  });
});

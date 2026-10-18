import { configureStore } from "@reduxjs/toolkit";
import { fireEvent, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import cartReducer from "../store/cartSlice";
import FoodCard from "./FoodCard";

const food = { id: 21, name: "Test Pizza", category: "Pizza", price: 250, rating: 4.8, image: "/pizza.jpg", description: "Fresh tomato and cheese." };

function renderFoodCard() {
  const store = configureStore({ reducer: { cart: cartReducer } });
  render(<Provider store={store}><MemoryRouter><FoodCard food={food} /></MemoryRouter></Provider>);
  return store;
}

describe("FoodCard", () => {
  test("renders food information accessibly", () => {
    renderFoodCard();
    expect(screen.getByRole("heading", { name: "Test Pizza" })).toBeInTheDocument();
    expect(screen.getByText("Pizza")).toBeInTheDocument();
    expect(screen.getByText("Fresh tomato and cheese.")).toBeInTheDocument();
    expect(screen.getByText("₹250")).toBeInTheDocument();
    expect(screen.getByRole("img", { name: "Test Pizza" })).toHaveAttribute("src", "/pizza.jpg");
  });

  test("adds the selected food to the cart", () => {
    const store = renderFoodCard();
    fireEvent.click(screen.getByRole("button", { name: "Add Test Pizza to cart" }));
    expect(store.getState().cart.items).toEqual([{ ...food, quantity: 1 }]);
  });
});

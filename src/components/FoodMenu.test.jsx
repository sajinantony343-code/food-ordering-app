import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import FoodMenu from "./FoodMenu";

const foods = [
  { id: 1, name: "Veg Pizza", category: "Pizza", price: 220, rating: 4.5, image: "/veg.jpg", description: "Vegetable toppings" },
  { id: 2, name: "Chicken Burger", category: "Burger", price: 180, rating: 4.2, image: "/burger.jpg", description: "Grilled chicken" },
];

jest.mock("../context/CartContext", () => ({ useCart: () => ({ addToCart: jest.fn() }) }));

describe("FoodMenu", () => {
  test("renders each food item", () => {
    render(<MemoryRouter><FoodMenu foods={foods} /></MemoryRouter>);
    expect(screen.getByRole("heading", { name: "Veg Pizza" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Chicken Burger" })).toBeInTheDocument();
    expect(screen.getAllByRole("article")).toHaveLength(2);
  });

  test("shows an empty state when the list has no matches", () => {
    render(<MemoryRouter><FoodMenu foods={[]} /></MemoryRouter>);
    expect(screen.getByRole("heading", { name: "No food found" })).toBeInTheDocument();
    expect(screen.getByText("Try another search or category.")).toBeInTheDocument();
  });
});

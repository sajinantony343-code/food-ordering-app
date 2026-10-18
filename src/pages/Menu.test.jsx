import { configureStore } from "@reduxjs/toolkit";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import api from "../services/api";
import cartReducer from "../store/cartSlice";
import Menu from "./Menu";

jest.mock("../services/api", () => ({ __esModule: true, default: { get: jest.fn() } }));

const foods = [
  { id: 1, name: "Veggie Pizza", category: "Pizza", price: 250, rating: 4.8, image: "/pizza.jpg", description: "Fresh vegetables" },
  { id: 2, name: "Classic Burger", category: "Burger", price: 190, rating: 4.3, image: "/burger.jpg", description: "Grilled patty" },
  { id: 3, name: "Spicy Pizza", category: "Pizza", price: 270, rating: 4.6, image: "/spicy.jpg", description: "Hot peppers" },
];

describe("Menu search and category filters", () => {
  beforeEach(() => api.get.mockResolvedValue({ data: foods }));

  test("filters foods by category and search text", async () => {
    const store = configureStore({ reducer: { cart: cartReducer } });
    render(<Provider store={store}><MemoryRouter><Menu /></MemoryRouter></Provider>);

    expect(await screen.findByRole("heading", { name: "Veggie Pizza" })).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Filter category: Pizza" }));
    await waitFor(() => expect(screen.queryByRole("heading", { name: "Classic Burger" })).not.toBeInTheDocument());
    expect(screen.getByRole("heading", { name: "Spicy Pizza" })).toBeInTheDocument();

    fireEvent.change(screen.getByRole("textbox", { name: "Search menu" }), { target: { value: "veggie" } });
    expect(screen.getByRole("heading", { name: "Veggie Pizza" })).toBeInTheDocument();
    expect(screen.queryByRole("heading", { name: "Spicy Pizza" })).not.toBeInTheDocument();
  });
});

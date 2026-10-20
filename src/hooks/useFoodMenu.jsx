import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import api from "../services/api";
import { foodsFailed, foodsLoaded, foodsLoading, selectFoods, selectFoodsStatus } from "../store/cartSlice";

export default function useFoodMenu() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [maxPrice, setMaxPrice] = useState(500);
  const [minRating, setMinRating] = useState(0);
  const dispatch = useDispatch();
  const foodData = useSelector(selectFoods);
  const status = useSelector(selectFoodsStatus);

  useEffect(() => {
    if (status !== "idle") return;
    dispatch(foodsLoading());
    api.get("/foods")
      .then(({ data }) => dispatch(foodsLoaded(data)))
      .catch((error) => dispatch(foodsFailed(error.response?.data?.message)));
  }, [dispatch, status]);

  const categories = ["All", ...new Set(foodData.map((food) => food.category))];

  const filteredFoods = useMemo(() => {
    return foodData.filter((food) => {
      const matchesCategory =
        category === "All" || food.category === category;

      const text = `${food.name} ${food.category} ${food.description}`.toLowerCase();
      const matchesSearch = text.includes(search.toLowerCase());
      const matchesPrice = Number(food.price) <= maxPrice;
      const matchesRating = Number(food.rating) >= minRating;

      return matchesCategory && matchesSearch && matchesPrice && matchesRating;
    });
  }, [foodData, search, category, maxPrice, minRating]);

  return {
    foods: filteredFoods,
    status,
    categories,
    search,
    setSearch,
    category,
    setCategory,
    maxPrice,
    setMaxPrice,
    minRating,
    setMinRating,
  };
}

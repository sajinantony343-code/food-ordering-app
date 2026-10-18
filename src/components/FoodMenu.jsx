import { memo } from "react";
import FoodCard from "./FoodCard";

function FoodMenu({ foods }) {
  if (foods.length === 0) {
    return (
      <div className="empty-results">
        <div>🍽️</div>
        <h3>No food found</h3>
        <p>Try another search or category.</p>
      </div>
    );
  }

  return (
    <div className="food-grid">
      {foods.map((food) => (
        <FoodCard key={food.id} food={food} />
      ))}
    </div>
  );
}

export default memo(FoodMenu);

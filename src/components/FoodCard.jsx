import { memo } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

function FoodCard({ food }) {
  const { addToCart } = useCart();

  return (
    <article className="food-card">
      <div className="food-image-wrap">
        <img src={food.image} alt={food.name} loading="lazy" decoding="async" width="640" height="420" />
        <span className="food-rating">⭐ {food.rating}</span>
      </div>

      <div className="food-card-body">
        <p className="food-category">{food.category}</p>
        <h3><Link to={`/food/${food.id}`}>{food.name}</Link></h3>
        <p className="food-description">{food.description}</p>

        <div className="food-bottom">
          <strong>₹{food.price}</strong>
          <button
            className="add-button"
            type="button"
            onClick={() => addToCart(food)}
            aria-label={`Add ${food.name} to cart`}
          >
            +
          </button>
        </div>
      </div>
    </article>
  );
}

export default memo(FoodCard);

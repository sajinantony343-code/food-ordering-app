import { Link, useParams } from "react-router-dom";
import useFoodMenu from "../hooks/useFoodMenu";
import { useCart } from "../context/CartContext";

export default function FoodDetailsPage() {
  const { foodId } = useParams();
  const { foods, status } = useFoodMenu();
  const { addToCart } = useCart();
  const food = foods.find((item) => item.id === Number(foodId));

  if (status === "idle" || status === "loading") return <p className="menu-message" role="status">Loading food details…</p>;
  if (status === "failed") return <p className="menu-message" role="alert">Could not load this food item. Please try again.</p>;
  if (!food) return <div className="page section"><h1>Food item not found</h1><Link to="/menu">Back to menu</Link></div>;

  return (
    <div className="page">
      <section className="section food-detail">
        <img src={food.image} alt={food.name} width="800" height="600" fetchPriority="high" />
        <div>
          <p className="eyebrow">{food.category}</p>
          <h1>{food.name}</h1>
          <p>{food.description}</p>
          <p>⭐ {food.rating}</p>
          <strong>₹{food.price}</strong>
          <button type="button" className="btn btn-primary" onClick={() => addToCart(food)}>Add to cart</button>
          <Link to="/menu" className="btn btn-outline">Back to menu</Link>
        </div>
      </section>
    </div>
  );
}

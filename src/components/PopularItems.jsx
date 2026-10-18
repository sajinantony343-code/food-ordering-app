import FoodCard from "./FoodCard";

export default function PopularItems({ foods }) {
  return (
    <section className="section">
      <div className="section-heading">
        <div>
          <p className="eyebrow dark">TOP PICKS</p>
          <h2>Popular dishes</h2>
        </div>
      </div>

      <div className="food-grid">
        {foods.slice(0, 4).map((food) => (
          <FoodCard key={food.id} food={food} />
        ))}
      </div>
    </section>
  );
}

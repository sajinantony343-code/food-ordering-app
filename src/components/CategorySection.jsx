import CategoryCard from "./CategoryCard";

const categories = [
  { name: "All", emoji: "🍽️" },
  { name: "Pizza", emoji: "🍕" },
  { name: "Burger", emoji: "🍔" },
  { name: "Biryani", emoji: "🍛" },
  { name: "Chicken", emoji: "🍗" },
  { name: "Pasta", emoji: "🍝" },
  { name: "Drinks", emoji: "🥤" },
  { name: "Desserts", emoji: "🍰" }
];

export default function CategorySection({ selected, onSelect }) {
  return (
    <section className="section" aria-label="Food categories">
      <div className="section-heading">
        <div>
          <p className="eyebrow dark">EXPLORE</p>
          <h2>What are you craving?</h2>
        </div>
      </div>

      <div className="category-grid">
        {categories.map((category) => (
          <CategoryCard
            key={category.name}
            name={category.name}
            emoji={category.emoji}
            active={selected === category.name}
            onClick={() => onSelect(category.name)}
          />
        ))}
      </div>
    </section>
  );
}

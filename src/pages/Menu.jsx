import SearchBar from "../components/SearchBar";
import CategorySection from "../components/CategorySection";
import FoodMenu from "../components/FoodMenu";
import useFoodMenu from "../hooks/useFoodMenu";

export default function Menu() {
  const {
    foods,
    status,
    search,
    setSearch,
    category,
    setCategory,
    maxPrice,
    setMaxPrice,
    minRating,
    setMinRating,
  } = useFoodMenu();

  return (
    <div className="page menu-page">
      <section className="section menu-section menu-shell">
        <header className="menu-title">
          <div><p className="eyebrow dark">FRESHLY MADE</p><h1>Find something delicious</h1></div>
          <p>Good food, made fresh and delivered with care.</p>
        </header>
        <SearchBar value={search} onChange={setSearch} />

        <CategorySection
          selected={category}
          onSelect={setCategory}
        />

        <div className="menu-filters" aria-label="Menu filters">
          <label>
            <span>Max price: ₹{maxPrice}</span>
            <input aria-label="Maximum price" type="range" min="100" max="500" step="10" value={maxPrice} onChange={(event) => setMaxPrice(Number(event.target.value))} />
          </label>
          <label>
            <span>Min rating: {Number(minRating).toFixed(1)} ★</span>
            <input aria-label="Minimum rating" type="range" min="0" max="5" step="0.1" value={minRating} onChange={(event) => setMinRating(Number(event.target.value))} />
          </label>
        </div>

        <div className="menu-result-heading">
          <h2>{category === "All" ? "Our menu" : category}</h2>
          <span>{foods.length} items</span>
        </div>

        {status === "loading" || status === "idle" ? (
          <p role="status" className="menu-message">Loading menu…</p>
        ) : status === "failed" ? (
          <p role="alert" className="menu-message">Could not load the menu. Make sure the backend is running, then refresh.</p>
        ) : foods.length === 0 ? (
          <p className="menu-message">No dishes match your search.</p>
        ) : (
          <FoodMenu foods={foods} />
        )}
      </section>
    </div>
  );
}

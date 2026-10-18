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
    setCategory
  } = useFoodMenu();

  return (
    <div className="page">
      <section className="page-hero">
        <p className="eyebrow">OUR MENU</p>
        <h1>Find your next favourite meal.</h1>
        <p>Fresh food, bold flavours and something for every craving.</p>
      </section>

      <section className="section menu-section">
        <SearchBar value={search} onChange={setSearch} />

        <CategorySection
          selected={category}
          onSelect={setCategory}
        />

        <div className="menu-result-heading">
          <h2>{category === "All" ? "All dishes" : category}</h2>
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

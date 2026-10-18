export default function CategoryCard({ name, emoji, onClick, active }) {
  return (
    <button
      type="button"
      className={`category-card ${active ? "active" : ""}`}
      aria-pressed={active}
      aria-label={`Filter category: ${name}`}
      onClick={onClick}
    >
      <span className="category-emoji">{emoji}</span>
      <span>{name}</span>
    </button>
  );
}

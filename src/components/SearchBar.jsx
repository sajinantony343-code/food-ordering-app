export default function SearchBar({ value, onChange }) {
  return (
    <div className="search-box">
      <span aria-hidden="true">🔍</span>
      <input
        aria-label="Search menu"
        type="text"
        placeholder="Search pizza, burger, biryani..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}

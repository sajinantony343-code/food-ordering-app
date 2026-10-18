import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-overlay">
        <div className="hero-content">
          <p className="eyebrow">🔥 Fresh • Fast • Delicious</p>
          <h1>Good food.<br /><span>Good mood.</span></h1>
          <p className="hero-text">
            Your favourite meals, prepared with love and delivered straight to
            your door.
          </p>

          <div className="hero-actions">
            <Link to="/menu" className="btn btn-primary">Order Now →</Link>
            <Link to="/menu" className="btn btn-light">Explore Menu</Link>
          </div>
        </div>
      </div>
    </section>
  );
}

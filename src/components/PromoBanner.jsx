import { Link } from "react-router-dom";

export default function PromoBanner() {
  return (
    <section className="promo">
      <div>
        <p className="eyebrow">LIMITED TIME OFFER</p>
        <h2>Get 20% OFF your first order.</h2>
        <p>Use code <strong>FOODIE20</strong> at checkout.</p>
        <Link to="/menu" className="btn btn-dark">Order Now →</Link>
      </div>

      <div className="promo-food">🍕</div>
    </section>
  );
}

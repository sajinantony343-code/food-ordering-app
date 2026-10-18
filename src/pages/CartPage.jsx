import Cart from "../components/Cart";

export default function CartPage() {
  return (
    <div className="page">
      <section className="page-hero compact">
        <p className="eyebrow">YOUR CART</p>
        <h1>Ready to check out?</h1>
        <p>Review your delicious choices before placing your order.</p>
      </section>

      <section className="section">
        <Cart />
      </section>
    </div>
  );
}

import Cart from "../components/Cart";

export default function CartPage() {
  return (
    <div className="page">
      <section className="section cart-page-section">
        <header className="cart-page-heading">
          <p className="eyebrow dark">FOODYYY STORE</p>
          <h1>Your Cart</h1>
        </header>
        <Cart />
      </section>
    </div>
  );
}

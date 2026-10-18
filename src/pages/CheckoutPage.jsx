import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import CheckoutForm from "../components/CheckoutForm";
import OrderSummary from "../components/OrderSummary";
import api from "../services/api";

export default function CheckoutPage() {
  const { cart, clearCart } = useCart();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
    pincode: "",
    payment: "Cash on Delivery"
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  if (cart.length === 0) {
    return <Navigate to="/menu" replace />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");
    try {
      const { data } = await api.post("/orders", {
        customer: formData,
        items: cart.map(({ id, quantity }) => ({ foodId: id, quantity })),
      });
      sessionStorage.setItem("foodie-last-order", JSON.stringify(data));
      clearCart();
      navigate("/success");
    } catch (submitError) {
      setError(submitError.response?.data?.message || "Could not place your order. Is the backend running?");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="page">
      <section className="page-hero compact">
        <p className="eyebrow">CHECKOUT</p>
        <h1>Almost there.</h1>
        <p>Enter your details and we will handle the rest.</p>
      </section>

      <section className="section">
        <form className="checkout-layout" onSubmit={handleSubmit}>
          <CheckoutForm formData={formData} setFormData={setFormData} />

          <div>
            <OrderSummary />
            {error && <p role="alert">{error}</p>}
            <button type="submit" disabled={submitting} className="btn btn-primary full-width place-order">
              {submitting ? "Placing order…" : "Place Order ✓"}
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}

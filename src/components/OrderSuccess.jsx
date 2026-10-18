import { useMemo } from "react";
import { Link } from "react-router-dom";

export default function OrderSuccess() {
  const order = useMemo(() => {
    try {
      return JSON.parse(sessionStorage.getItem("foodie-last-order") || "null");
    } catch {
      return null;
    }
  }, []);

  return (
    <div className="success-card">
      <div className="success-icon">✓</div>
      <p className="eyebrow dark">ORDER CONFIRMED</p>
      <h1>Order placed successfully!</h1>
      <p>
        Thank you for ordering with Foodie. Your food is being prepared and
        will be on its way soon.
      </p>

      <div className="order-number">Order #{order?.id?.slice(0, 8).toUpperCase() || "CONFIRMED"}</div>

      <div className="success-actions">
        <Link to="/" className="btn btn-primary">Back to Home</Link>
        <Link to="/menu" className="btn btn-outline">Order More</Link>
      </div>
    </div>
  );
}

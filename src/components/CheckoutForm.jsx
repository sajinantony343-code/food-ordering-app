export default function CheckoutForm({ formData, setFormData }) {
  const update = (field) => (e) =>
    setFormData((current) => ({ ...current, [field]: e.target.value }));

  return (
    <div className="checkout-form">
      <h2>Delivery Information</h2>

      <div className="form-grid">
        <label>
          Full Name
          <input
            required
            value={formData.name}
            onChange={update("name")}
            placeholder="Your name"
          />
        </label>

        <label>
          Phone Number
          <input
            required
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            pattern="[+0-9][0-9\s-]{6,14}"
            title="Enter a valid phone number"
            maxLength={15}
            value={formData.phone}
            onChange={update("phone")}
            placeholder="+91 XXXXX XXXXX"
          />
        </label>
      </div>

      <label>
        Delivery Address
        <textarea
          required
          value={formData.address}
          onChange={update("address")}
          placeholder="House number, street, area..."
          rows="4"
        />
      </label>

      <div className="form-grid">
        <label>
          City
          <input
            required
            inputMode="numeric"
            pattern="[0-9]{6}"
            title="Enter a 6-digit pincode"
            maxLength={6}
            value={formData.city}
            onChange={update("city")}
            placeholder="Coimbatore"
          />
        </label>

        <label>
          Pincode
          <input
            required
            value={formData.pincode}
            onChange={update("pincode")}
            placeholder="641001"
          />
        </label>
      </div>

      <h2 className="payment-heading">Payment Method</h2>

      <div className="payment-options">
        <label className="payment-option">
          <input
            type="radio"
            name="payment"
            value="Cash on Delivery"
            checked={formData.payment === "Cash on Delivery"}
            onChange={update("payment")}
          />
          💵 Cash on Delivery
        </label>

        <label className="payment-option">
          <input
            type="radio"
            name="payment"
            value="UPI"
            checked={formData.payment === "UPI"}
            onChange={update("payment")}
          />
          📱 UPI
        </label>

        <label className="payment-option">
          <input
            type="radio"
            name="payment"
            value="Card"
            checked={formData.payment === "Card"}
            onChange={update("payment")}
          />
          💳 Card
        </label>
      </div>
    </div>
  );
}

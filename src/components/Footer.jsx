import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-grid">
        <div className="footer-brand">
          <Link to="/" className="logo">
            <span>🍴</span> Foodie
          </Link>
          <p>
            Delicious food, fresh ingredients and fast delivery. Your favourite
            meals are just a few clicks away.
          </p>
        </div>

        <div>
          <h3>Quick Links</h3>
          <Link to="/">Home</Link>
          <Link to="/menu">Menu</Link>
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
        </div>

        <div>
          <h3>Contact</h3>
          <p>📍 Coimbatore, Tamil Nadu</p>
          <p>📞 +91 98765 43210</p>
          <p>📧 hello@foodie.com</p>
        </div>

        <div>
          <h3>Follow Us</h3>
          <div className="socials">
            <span>Instagram</span>
            <span>Facebook</span>
            <span>YouTube</span>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        © 2026 Foodie. All Rights Reserved.
      </div>
    </footer>
  );
}

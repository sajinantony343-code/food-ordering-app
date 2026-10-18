import { useState } from "react";

export default function Contact() {
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
    e.target.reset();
  };

  return (
    <div className="page">
      <section className="page-hero">
        <p className="eyebrow">CONTACT US</p>
        <h1>We would love to hear from you.</h1>
        <p>Questions, feedback or just saying hello? Send us a message.</p>
      </section>

      <section className="section contact-grid">
        <div className="contact-info">
          <p className="eyebrow dark">GET IN TOUCH</p>
          <h2>Let's talk.</h2>
          <p>
            Our team is here to help with orders, feedback and general
            questions.
          </p>

          <div className="contact-card">📍 Coimbatore, Tamil Nadu</div>
          <div className="contact-card">📞 +91 98765 43210</div>
          <div className="contact-card">📧 sajin@foodie.com</div>
        </div>

        <form className="contact-form" onSubmit={handleSubmit}>
          <label>
            Name
            <input required placeholder="Your name" />
          </label>

          <label>
            Email
            <input required type="email" placeholder="you@example.com" />
          </label>

          <label>
            Message
            <textarea required rows="6" placeholder="Write your message..." />
          </label>

          <button className="btn btn-primary" type="submit">
            Send Message →
          </button>

          {sent && <p className="success-message">Message sent successfully!</p>}
        </form>
      </section>
    </div>
  );
}

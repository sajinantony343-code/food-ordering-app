export default function Testimonial({ name, text, rating }) {
  return (
    <article className="testimonial">
      <div className="stars">{"⭐".repeat(rating)}</div>
      <p>"{text}"</p>
      <strong>{name}</strong>
      <span>Verified customer</span>
    </article>
  );
}

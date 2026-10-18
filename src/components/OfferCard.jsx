export default function OfferCard({ title, description }) {
  return (
    <article className="testimonial">
      <p className="eyebrow dark">SPECIAL OFFER</p>
      <h3>{title}</h3>
      <p>{description}</p>
    </article>
  );
}

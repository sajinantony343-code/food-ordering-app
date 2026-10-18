import Testimonial from "./Testimonial";

const reviews = [
  {
    name: "Arun K.",
    text: "The biryani was amazing and arrived really hot. Definitely ordering again!",
    rating: 5
  },
  {
    name: "Meera S.",
    text: "Beautiful website, fast delivery and the burger was seriously good.",
    rating: 5
  },
  {
    name: "Rahul P.",
    text: "Great prices and plenty of options. The chocolate cake is my favourite.",
    rating: 5
  }
];

export default function Testimonials() {
  return (
    <section className="section soft-section">
      <div className="section-heading center">
        <div>
          <p className="eyebrow dark">CUSTOMER LOVE</p>
          <h2>What people say</h2>
        </div>
      </div>

      <div className="testimonial-grid">
        {reviews.map((review) => (
          <Testimonial key={review.name} {...review} />
        ))}
      </div>
    </section>
  );
}

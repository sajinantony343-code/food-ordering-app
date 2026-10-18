export default function About() {
  return (
    <div className="page">
      <section className="page-hero">
        <p className="eyebrow">ABOUT FOODIE</p>
        <h1>Made for people who love great food.</h1>
        <p>Simple ingredients. Big flavours. Fast delivery.</p>
      </section>

      <section className="section about-grid">
        <div className="about-image">
          <img
            src="https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?auto=format&fit=crop&w=1200&q=80"
            alt="Restaurant food"
          />
        </div>

        <div className="about-content">
          <p className="eyebrow dark">OUR STORY</p>
          <h2>Good food should make your day better.</h2>
          <p>
            Foodie is a modern food-ordering experience built around one idea:
            great meals should be easy to discover and easy to order.
          </p>
          <p>
            We bring together comfort food, classic favourites and fresh
            flavours so you can enjoy restaurant-style meals from home.
          </p>

          <div className="stats">
            <div><strong>50+</strong><span>Dishes</span></div>
            <div><strong>4.9★</strong><span>Average Rating</span></div>
            <div><strong>30 min</strong><span>Avg. Delivery</span></div>
          </div>
        </div>
      </section>
    </div>
  );
}

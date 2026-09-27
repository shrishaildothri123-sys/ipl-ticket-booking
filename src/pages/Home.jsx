import { Link } from 'react-router-dom'

function Home() {
  return (
    <main className="home-page">
      <section className="home-hero">
        <img
          className="home-hero-image"
          src="https://images.unsplash.com/photo-1531415074968-036ba1b575da?auto=format&fit=crop&w=2000&q=85"
          alt="A cricket ball resting on the grass of a playing field"
          fetchPriority="high"
        />
        <div className="home-hero-shade" aria-hidden="true" />
        <div className="home-hero-content">
          <p className="home-eyebrow">The stands are waiting</p>
          <h1>IPL Ticket Booking</h1>
          <p className="home-intro">
            Find your match, choose your stand, and make matchday yours.
          </p>
          <Link className="home-cta" to="/matches">
            Explore upcoming matches
          </Link>
        </div>
        <p className="home-image-credit">Cricket, together.</p>
      </section>
    </main>
  )
}

export default Home
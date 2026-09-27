import { Link, NavLink } from 'react-router-dom'

function Navbar() {
  return (
    <header className="site-header">
      <div className="site-header-inner">
        <Link className="site-brand" to="/" aria-label="IPL Ticket Booking home">
          <span className="site-brand-mark">IPL</span>
          <span>Ticket Booking</span>
        </Link>
        <nav className="site-nav" aria-label="Main navigation">
          <NavLink to="/" end>Home</NavLink>
          <NavLink to="/matches">Matches</NavLink>
          <NavLink to="/booking">Book Ticket</NavLink>
          <NavLink to="/history">Booking History</NavLink>
        </nav>
      </div>
    </header>
  )
}

export default Navbar
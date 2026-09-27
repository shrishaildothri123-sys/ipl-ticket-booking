import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import {
  isSupabaseConfigured,
  supabase,
  supabaseSetupMessage,
} from '../lib/supabase.js'

function Booking() {
  const location = useLocation()
  const selectedMatch = location.state?.match
  const [name, setName] = useState('')
  const [tickets, setTickets] = useState('')
  const [stand, setStand] = useState('')
  const [venue, setVenue] = useState(selectedMatch?.venue ?? '')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  async function handleBooking(event) {
    event.preventDefault()
    setError('')
    setSuccess('')

    const ticketCount = Number(tickets)
    if (!name.trim() || !Number.isInteger(ticketCount) || ticketCount < 1 || !stand || !venue) {
      setError('Please fill all the details with a valid ticket quantity.')
      return
    }

    if (!isSupabaseConfigured || !supabase) {
      setError(supabaseSetupMessage)
      return
    }

    setIsSubmitting(true)

    try {
      const { error: insertError } = await supabase.from('bookings').insert({
        name: name.trim(),
        tickets: ticketCount,
        stand,
        venue,
      })

      if (insertError) {
        throw insertError
      }

      setSuccess('Ticket booked successfully!')
      setName('')
      setTickets('')
      setStand('')
      setVenue('')
    } catch (bookingError) {
      setError(`Could not save your booking: ${bookingError.message}`)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <main className="booking-page">
      <h1>Book Your Ticket</h1>

      {selectedMatch && (
        <section className="selected-match">
          <h2>{selectedMatch.team1} vs {selectedMatch.team2}</h2>
          <p>{selectedMatch.date} at {selectedMatch.time}</p>
          <p>{selectedMatch.venue}</p>
        </section>
      )}

      <form className="booking-form" onSubmit={handleBooking}>
        <label htmlFor="name">Name</label>
        <input
          id="name"
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />

        <label htmlFor="tickets">Number of Tickets</label>
        <input
          id="tickets"
          type="number"
          min="1"
          placeholder="Enter number of tickets"
          value={tickets}
          onChange={(event) => setTickets(event.target.value)}
        />

        <label htmlFor="stand">Select Stand</label>
        <select
          id="stand"
          value={stand}
          onChange={(event) => setStand(event.target.value)}
        >
          <option value="">Select Stand</option>
          <option value="General Stand">General Stand</option>
          <option value="VIP Stand">VIP Stand</option>
        </select>

        <label htmlFor="venue">Select Venue</label>
        <select
          id="venue"
          value={venue}
          onChange={(event) => setVenue(event.target.value)}
        >
          <option value="">Select Venue</option>
          <option value="M. Chinnaswamy Stadium, Bengaluru">
            M. Chinnaswamy Stadium, Bengaluru
          </option>
          <option value="Wankhede Stadium, Mumbai">Wankhede Stadium, Mumbai</option>
          <option value="Rajiv Gandhi International Cricket Stadium, Hyderabad">
            Rajiv Gandhi International Cricket Stadium, Hyderabad
          </option>
          <option value="Arun Jaitley Stadium, Delhi">Arun Jaitley Stadium, Delhi</option>
          <option value="Narendra Modi Stadium, Ahmedabad">
            Narendra Modi Stadium, Ahmedabad
          </option>
          <option value="M. A. Chidambaram Stadium, Chennai">
            M. A. Chidambaram Stadium, Chennai
          </option>
        </select>

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Saving booking...' : 'Book Ticket'}
        </button>
      </form>

      {error && <p className="form-message error-message" role="alert">{error}</p>}
      {success && (
        <p className="form-message success-message" role="status">
          {success}{' '}
          <Link className="history-link" to="/history">
            View Booking History
          </Link>
        </p>
      )}

      <section className="booking-details">
        <h2>Booking Details</h2>
        <p>Name: {name || '-'}</p>
        <p>Tickets: {tickets || '-'}</p>
        <p>Stand: {stand || '-'}</p>
        <p>Venue: {venue || '-'}</p>
      </section>
    </main>
  )
}

export default Booking
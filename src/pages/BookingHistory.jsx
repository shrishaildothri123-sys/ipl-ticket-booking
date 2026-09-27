import { useEffect, useState } from 'react'
import {
  isSupabaseConfigured,
  supabase,
  supabaseSetupMessage,
} from '../lib/supabase.js'

function BookingHistory() {
  const [bookings, setBookings] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let isActive = true

    async function loadBookings() {
      if (!isSupabaseConfigured || !supabase) {
        setError(supabaseSetupMessage)
        setIsLoading(false)
        return
      }

      try {
        const { data, error: fetchError } = await supabase
          .from('bookings')
          .select('id, name, tickets, stand, venue, created_at')
          .order('created_at', { ascending: false })

        if (fetchError) {
          throw fetchError
        }

        if (isActive) {
          setBookings(data ?? [])
        }
      } catch (bookingError) {
        if (isActive) {
          setError(`Could not load booking history: ${bookingError.message}`)
        }
      } finally {
        if (isActive) {
          setIsLoading(false)
        }
      }
    }

    loadBookings()

    return () => {
      isActive = false
    }
  }, [])

  return (
    <main className="history-page">
      <h1>Booking History</h1>

      {isLoading && <p role="status">Loading bookings...</p>}
      {error && <p className="form-message error-message" role="alert">{error}</p>}
      {!isLoading && !error && bookings.length === 0 && <p>No bookings yet.</p>}

      {!isLoading && !error && bookings.length > 0 && (
        <div className="history-list">
          {bookings.map((booking) => (
            <article className="history-card" key={booking.id}>
              <h2>{booking.name}</h2>
              <p>Tickets: {booking.tickets}</p>
              <p>Stand: {booking.stand}</p>
              <p>Venue: {booking.venue}</p>
              <p>Booked: {new Date(booking.created_at).toLocaleString()}</p>
            </article>
          ))}
        </div>
      )}
    </main>
  )
}

export default BookingHistory
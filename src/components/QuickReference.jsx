import { Link } from 'react-router-dom'
import { hotels, flights, bookedActivities, emergency, quickFacts } from '../data/verified-data'
import './QuickReference.css'

// Format date string (YYYY-MM-DD) without timezone issues
function formatDate(dateStr, options = { month: 'short', day: 'numeric' }) {
  const [year, month, day] = dateStr.split('-').map(Number)
  const date = new Date(year, month - 1, day) // Local time, not UTC
  return date.toLocaleDateString('en-US', options)
}

function QuickReference() {
  return (
    <div className="quick-ref">
      <header className="quick-ref-header">
        <Link to="/" className="quick-ref-back">Home</Link>
        <h1>Quick Reference</h1>
        <p>Switzerland | January 19-27, 2026</p>
      </header>

      <main className="quick-ref-main">
        {/* Emergency */}
        <section className="quick-ref-section quick-ref-emergency">
          <h2>Emergency</h2>
          <div className="quick-ref-emergency-grid">
            <a href="tel:112" className="quick-ref-emerg-btn">
              <span className="quick-ref-emerg-num">112</span>
              <span className="quick-ref-emerg-label">General Emergency</span>
            </a>
            <a href="tel:117" className="quick-ref-emerg-btn">
              <span className="quick-ref-emerg-num">117</span>
              <span className="quick-ref-emerg-label">Police</span>
            </a>
            <a href="tel:144" className="quick-ref-emerg-btn">
              <span className="quick-ref-emerg-num">144</span>
              <span className="quick-ref-emerg-label">Ambulance</span>
            </a>
            <a href="tel:118" className="quick-ref-emerg-btn">
              <span className="quick-ref-emerg-num">118</span>
              <span className="quick-ref-emerg-label">Fire</span>
            </a>
          </div>
        </section>

        {/* Flight */}
        <section className="quick-ref-section">
          <h2>Flight</h2>
          <div className="quick-ref-card">
            <div className="quick-ref-flight">
              <div className="quick-ref-flight-leg">
                <span className="quick-ref-flight-direction">Outbound</span>
                <strong>{formatDate(flights.outbound.date, { weekday: 'short', month: 'short', day: 'numeric' })}</strong>
                <span>{flights.outbound.departure.time} {flights.outbound.departure.airport}</span>
                <span>Arrive {flights.outbound.arrival.time} {flights.outbound.arrival.airport}</span>
                <code>{flights.outbound.flights}</code>
              </div>
              <div className="quick-ref-flight-leg">
                <span className="quick-ref-flight-direction">Return</span>
                <strong>{formatDate(flights.return.date, { weekday: 'short', month: 'short', day: 'numeric' })}</strong>
                <span>{flights.return.departure.time} {flights.return.departure.airport}</span>
                <span>Arrive {flights.return.arrival.time} {flights.return.arrival.airport}</span>
                <code>{flights.return.flights}</code>
                <span className="quick-ref-flight-warning">{flights.return.warning}</span>
              </div>
            </div>
          </div>
        </section>

        {/* Hotels */}
        <section className="quick-ref-section">
          <h2>Hotels</h2>
          <div className="quick-ref-hotels">
            {hotels.map(hotel => (
              <div key={hotel.id} className="quick-ref-card quick-ref-hotel">
                <div className="quick-ref-hotel-header">
                  <strong>{hotel.name}</strong>
                  <span className="quick-ref-hotel-dates">
                    {formatDate(hotel.dates.checkIn)} - {formatDate(hotel.dates.checkOut)}
                  </span>
                </div>
                <p className="quick-ref-hotel-addr">{hotel.address}</p>
                <div className="quick-ref-hotel-meta">
                  <span>Conf: <code>{hotel.confirmation}</code></span>
                  <a href={`tel:${hotel.phone}`}>{hotel.phone}</a>
                </div>
                <p className="quick-ref-hotel-times">
                  In: {hotel.times.checkIn} | Out: {hotel.times.checkOut}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Booked Activities */}
        <section className="quick-ref-section">
          <h2>Booked</h2>
          {bookedActivities.map((activity, i) => (
            <div key={i} className="quick-ref-card quick-ref-booked">
              <div className="quick-ref-booked-header">
                <strong>{activity.name}</strong>
                <span className="quick-ref-booked-datetime">
                  {formatDate(activity.date, { weekday: 'short', month: 'short', day: 'numeric' })} @ {activity.time}
                </span>
              </div>
              <p>{activity.location}</p>
              {activity.confirmation && <span>Conf: <code>{activity.confirmation}</code></span>}
              {activity.phone && <a href={`tel:${activity.phone}`}>{activity.phone}</a>}
              {activity.note && <p className="quick-ref-note">{activity.note}</p>}
            </div>
          ))}
        </section>

        {/* Quick Facts */}
        <section className="quick-ref-section">
          <h2>Quick Facts</h2>
          <div className="quick-ref-facts">
            {Object.entries(quickFacts).map(([key, value]) => (
              <div key={key} className="quick-ref-fact">
                <span className="quick-ref-fact-key">{key.replace(/([A-Z])/g, ' $1')}</span>
                <span className="quick-ref-fact-val">{value}</span>
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer className="quick-ref-footer">
        <div className="quick-ref-footer-links">
          <Link to="/story">Story</Link>
          <Link to="/reference">Full Guide</Link>
          <Link to="/planner">Planner</Link>
        </div>
        <p>Ray & Katie | Switzerland 2026</p>
      </footer>
    </div>
  )
}

export default QuickReference

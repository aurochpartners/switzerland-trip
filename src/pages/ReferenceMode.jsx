import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { days } from '../data/days'
import { hotels, restaurants, quickFacts } from '../data/verified-data'
import './ReferenceMode.css'

function DayAccordion({ day }) {
  const [isOpen, setIsOpen] = useState(false)
  const hotel = day.hotel ? hotels.find(h => h.id === day.hotel) : null

  return (
    <div className={`ref-day ${day.isSpecial ? 'ref-day--special' : ''}`}>
      <button 
        className="ref-day-header"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        <div className="ref-day-date">
          <span className="ref-day-num">Day {day.number}</span>
          <span className="ref-day-weekday">{day.dayOfWeek}</span>
          <span className="ref-day-date-str">{new Date(day.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
        </div>
        <div className="ref-day-info">
          <h3 className="ref-day-title">{day.title}</h3>
          <p className="ref-day-summary">{day.summary}</p>
          {day.highlight && <span className="ref-day-highlight">{day.highlight}</span>}
        </div>
        <svg 
          className={`ref-day-chevron ${isOpen ? 'ref-day-chevron--open' : ''}`}
          width="24" 
          height="24" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2"
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            className="ref-day-content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Alert */}
            {day.alert && (
              <div className={`ref-alert ref-alert--${day.alert.type}`}>
                <strong>{day.alert.title}</strong>
                <p>{day.alert.message}</p>
              </div>
            )}

            {/* Critical booking */}
            {day.critical && (
              <div className="ref-critical">
                <strong>{day.critical.title}</strong>
                <a href={`tel:${day.critical.phone}`}>{day.critical.phone}</a>
                <p>{day.critical.details}</p>
              </div>
            )}

            {/* Booked activity */}
            {day.booked && (
              <div className="ref-booked">
                <div className="ref-booked-header">
                  <span className="ref-booked-label">Booked</span>
                  <span className="ref-booked-time">{day.booked.time}</span>
                </div>
                <h4>{day.booked.name}</h4>
                <p className="ref-booked-location">{day.booked.location}</p>
                <p className="ref-booked-conf">Confirmation: {day.booked.confirmation}</p>
                <p>{day.booked.description}</p>
                <p className="ref-booked-note">{day.booked.note}</p>
              </div>
            )}

            {/* Options */}
            {day.options && day.options.length > 0 && (
              <div className="ref-options">
                <h4>Options for the Day</h4>
                <div className="ref-options-grid">
                  {day.options.map((opt, i) => (
                    <div key={i} className="ref-option">
                      <div className="ref-option-header">
                        <h5>{opt.name}</h5>
                        <span className="ref-option-weather" title={`Weather: ${opt.weather}`}>
                          {opt.weather === 'Any' && '☁️'}
                          {opt.weather === 'Clear only' && '☀️'}
                          {opt.weather === 'Clear preferred' && '🌤️'}
                          {opt.weather === 'Partial' && '⛅'}
                          {opt.weather === 'CLEAR ONLY' && '☀️ Only'}
                        </span>
                      </div>
                      <p className="ref-option-desc">{opt.description}</p>
                      <div className="ref-option-meta">
                        <span>{opt.duration}</span>
                        <span>{opt.price}</span>
                      </div>
                      {opt.warning && <p className="ref-option-warning">{opt.warning}</p>}
                      {opt.best_for && <p className="ref-option-best">Best for: {opt.best_for}</p>}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Schedule */}
            {day.schedule && day.schedule.length > 0 && (
              <div className="ref-schedule">
                <h4>Schedule</h4>
                <ul className="ref-schedule-list">
                  {day.schedule.map((item, i) => (
                    <li key={i} className={`ref-schedule-item ref-schedule-item--${item.type}`}>
                      <span className="ref-schedule-time">{item.time}</span>
                      <span className="ref-schedule-activity">{item.activity}</span>
                      {item.details && <span className="ref-schedule-details">{item.details}</span>}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Hotel */}
            {hotel && (
              <div className="ref-hotel">
                <h4>Hotel</h4>
                <div className="ref-hotel-card">
                  <strong>{hotel.name}</strong>
                  <p>{hotel.address}</p>
                  <p>
                    <span>Confirmation: </span>
                    <code>{hotel.confirmation}</code>
                  </p>
                  <a href={`tel:${hotel.phone}`}>{hotel.phone}</a>
                  <p className="ref-hotel-times">
                    Check-in: {hotel.times.checkIn} | Check-out: {hotel.times.checkOut}
                  </p>
                </div>
              </div>
            )}

            {/* Meals */}
            {day.meals && (
              <div className="ref-meals">
                <h4>Meals</h4>
                {day.meals.breakfast && <p><strong>Breakfast:</strong> {day.meals.breakfast}</p>}
                {day.meals.lunch && <p><strong>Lunch:</strong> {day.meals.lunch}</p>}
                {day.meals.dinner && <p><strong>Dinner:</strong> {day.meals.dinner}</p>}
              </div>
            )}

            {/* Walking route */}
            {day.walkingRoute && (
              <div className="ref-walking">
                <h4>Walking Route</h4>
                <ol>
                  {day.walkingRoute.map((stop, i) => (
                    <li key={i}>{stop}</li>
                  ))}
                </ol>
              </div>
            )}

            {/* Tips */}
            {day.tips && day.tips.length > 0 && (
              <div className="ref-tips">
                <h4>Tips</h4>
                <ul>
                  {day.tips.map((tip, i) => (
                    <li key={i}>{tip}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Night sledding note */}
            {day.nightSledding && (
              <div className="ref-sledding-note">
                <strong>Night Sledding Available</strong>
                <p>{day.nightSledding.note}</p>
                <a href={`tel:${day.nightSledding.phone}`}>{day.nightSledding.phone}</a>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function ReferenceMode() {
  return (
    <div className="reference-mode">
      <header className="ref-header">
        <div className="ref-header-content">
          <Link to="/" className="ref-back">Home</Link>
          <h1>Reference Guide</h1>
          <p className="ref-subtitle">January 19-27, 2026</p>
          <nav className="ref-nav-links">
            <Link to="/story">Story View</Link>
            <Link to="/quick">Quick Reference</Link>
          </nav>
        </div>
      </header>

      <main className="ref-main">
        {/* Quick facts */}
        <section className="ref-section ref-quickfacts">
          <h2>Quick Facts</h2>
          <div className="ref-facts-grid">
            {Object.entries(quickFacts).map(([key, value]) => (
              <div key={key} className="ref-fact">
                <span className="ref-fact-label">{key.replace(/([A-Z])/g, ' $1').toLowerCase()}</span>
                <span className="ref-fact-value">{value}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Days */}
        <section className="ref-section ref-days">
          <h2>Day by Day</h2>
          <div className="ref-days-list">
            {days.map(day => (
              <DayAccordion key={day.number} day={day} />
            ))}
          </div>
        </section>

        {/* Restaurants */}
        <section className="ref-section ref-restaurants">
          <h2>Restaurant Options</h2>
          
          <h3>Lucerne</h3>
          <div className="ref-restaurant-grid">
            {restaurants.lucerne.map((r, i) => (
              <div key={i} className="ref-restaurant">
                <strong>{r.name}</strong>
                <span className="ref-restaurant-specialty">{r.specialty}</span>
                <span className="ref-restaurant-price">{r.price}</span>
                <span className="ref-restaurant-note">{r.note}</span>
              </div>
            ))}
          </div>

          <h3>Grindelwald</h3>
          <div className="ref-restaurant-grid">
            {restaurants.grindelwald.map((r, i) => (
              <div key={i} className="ref-restaurant">
                <strong>{r.name}</strong>
                <span className="ref-restaurant-specialty">{r.specialty}</span>
                <span className="ref-restaurant-price">{r.price}</span>
                <span className="ref-restaurant-note">{r.note}</span>
              </div>
            ))}
          </div>

          <h3>Zürich</h3>
          <div className="ref-restaurant-grid">
            {restaurants.zurich.map((r, i) => (
              <div key={i} className="ref-restaurant">
                <strong>{r.name}</strong>
                <span className="ref-restaurant-specialty">{r.specialty}</span>
                <span className="ref-restaurant-price">{r.price}</span>
                <span className="ref-restaurant-note">{r.note}</span>
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer className="ref-footer">
        <p>Switzerland 2026 | Ray & Katie</p>
        <div className="ref-footer-links">
          <Link to="/story">Story</Link>
          <Link to="/quick">Quick Ref</Link>
        </div>
      </footer>
    </div>
  )
}

export default ReferenceMode

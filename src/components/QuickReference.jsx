import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { chapters, emergencyNumbers, quickFacts } from '../data/chapters'
import './QuickReference.css'

function QuickReference() {
  // Extract hotels from chapters
  const hotels = chapters
    .filter(c => c.content.hotel)
    .map(c => ({
      ...c.content.hotel,
      location: c.location,
      dates: c.date
    }))

  // Get flight info
  const departureChapter = chapters.find(c => c.id === 'beginning')
  const returnChapter = chapters.find(c => c.id === 'until-next-time')
  
  const flight = departureChapter?.content.flight
  const departure = returnChapter?.content.departure

  return (
    <div className="quick-ref dark">
      <header className="quick-ref-header">
        <Link to="/" className="quick-ref-back">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
          Back
        </Link>
        <h1>Quick Reference</h1>
        <p>All the essentials in one place</p>
      </header>

      <main className="quick-ref-content">
        {/* Emergency */}
        <section className="quick-ref-section emergency-section">
          <h2 className="section-title">Emergency</h2>
          <div className="emergency-grid">
            <div className="emergency-item">
              <span className="emergency-label">General</span>
              <a href={`tel:${emergencyNumbers.general}`} className="emergency-number">
                {emergencyNumbers.general}
              </a>
            </div>
            <div className="emergency-item">
              <span className="emergency-label">Police</span>
              <a href={`tel:${emergencyNumbers.police}`} className="emergency-number">
                {emergencyNumbers.police}
              </a>
            </div>
            <div className="emergency-item">
              <span className="emergency-label">Ambulance</span>
              <a href={`tel:${emergencyNumbers.ambulance}`} className="emergency-number">
                {emergencyNumbers.ambulance}
              </a>
            </div>
            <div className="emergency-item">
              <span className="emergency-label">Fire</span>
              <a href={`tel:${emergencyNumbers.fire}`} className="emergency-number">
                {emergencyNumbers.fire}
              </a>
            </div>
          </div>
        </section>

        {/* Reminders */}
        <section className="quick-ref-section">
          <h2 className="section-title">Don't Forget</h2>
          <div className="reminder-card">
            <strong>Saturday, January 24</strong>
            <p>Book night sledding before 2 PM</p>
            <a href="tel:+41338541616" className="reminder-phone">+41 33 854 16 16</a>
          </div>
          <div className="reminder-card warning">
            <strong>Tuesday, January 27</strong>
            <p>Flight at 1:00 PM. Leave hotel by 9:30 AM.</p>
          </div>
        </section>

        {/* Hotels */}
        <section className="quick-ref-section">
          <h2 className="section-title">Hotels</h2>
          <div className="hotels-list">
            {hotels.map((hotel, i) => (
              <motion.div 
                key={i} 
                className="hotel-item"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="hotel-item-header">
                  <span className="hotel-item-location">{hotel.location}</span>
                  <span className="hotel-item-dates">{hotel.dates}</span>
                </div>
                <h3 className="hotel-item-name">{hotel.name}</h3>
                <div className="hotel-item-details">
                  <div className="hotel-item-field">
                    <span className="field-label">Confirmation</span>
                    <span className="field-value mono">{hotel.confirmation}</span>
                  </div>
                  <div className="hotel-item-field">
                    <span className="field-label">Phone</span>
                    <a href={`tel:${hotel.phone}`} className="field-value phone">
                      {hotel.phone}
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Flights */}
        <section className="quick-ref-section">
          <h2 className="section-title">Flights</h2>
          <div className="flight-card">
            <div className="flight-row">
              <div>
                <span className="flight-label">Outbound</span>
                <span className="flight-route">Newark → Zürich</span>
              </div>
              <div className="flight-details">
                <span>Jan 19, {flight?.departure}</span>
                <span className="flight-arrive">Arrive Jan 20, {flight?.arrival?.split(' ')[0]}</span>
              </div>
            </div>
            <div className="flight-row">
              <div>
                <span className="flight-label">Return</span>
                <span className="flight-route">Zürich → Newark</span>
              </div>
              <div className="flight-details">
                <span>Jan 27, {departure?.flight}</span>
              </div>
            </div>
            <p className="flight-numbers">{flight?.numbers}</p>
          </div>
        </section>

        {/* Quick Facts */}
        <section className="quick-ref-section">
          <h2 className="section-title">Quick Facts</h2>
          <div className="facts-grid">
            <div className="fact-item">
              <span className="fact-label">Currency</span>
              <span className="fact-value">{quickFacts.currency}</span>
            </div>
            <div className="fact-item">
              <span className="fact-label">Plugs</span>
              <span className="fact-value">{quickFacts.plugs}</span>
            </div>
            <div className="fact-item">
              <span className="fact-label">Tipping</span>
              <span className="fact-value">{quickFacts.tipping}</span>
            </div>
            <div className="fact-item">
              <span className="fact-label">Water</span>
              <span className="fact-value">{quickFacts.water}</span>
            </div>
            <div className="fact-item">
              <span className="fact-label">Hello</span>
              <span className="fact-value">{quickFacts.hello}</span>
            </div>
            <div className="fact-item">
              <span className="fact-label">Thanks</span>
              <span className="fact-value">{quickFacts.thanks}</span>
            </div>
          </div>
        </section>
      </main>

      <footer className="quick-ref-footer">
        <p>Ray & Katie</p>
        <p>January 2026</p>
      </footer>
    </div>
  )
}

export default QuickReference

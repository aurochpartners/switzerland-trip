import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { images } from '../data/images'
import { tripInfo } from '../data/verified-data'
import './Landing.css'

function Landing() {
  return (
    <div className="landing">
      {/* Hero */}
      <header className="landing-hero">
        <div 
          className="landing-hero-bg"
          style={{ backgroundImage: `url(${images.hero.url})` }}
        />
        <div className="landing-hero-overlay" />
        
        <motion.div 
          className="landing-hero-content"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          <p className="landing-hero-date">January 19-27, 2026</p>
          <h1 className="landing-hero-title">Switzerland</h1>
          <p className="landing-hero-names">{tripInfo.travelers.join(' & ')}</p>
        </motion.div>
      </header>

      {/* Navigation */}
      <main className="landing-main">
        <motion.div 
          className="landing-nav-grid"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <Link to="/story" className="landing-nav-card landing-nav-card--story">
            <div className="landing-nav-card-bg" style={{ backgroundImage: `url(${images.grindelwald.village.url})` }} />
            <div className="landing-nav-card-overlay" />
            <div className="landing-nav-card-content">
              <h2>Story</h2>
              <p>A flowing journey through the Alps. Beautiful photos, smooth scrolling, minimal text.</p>
              <span className="landing-nav-card-cta">Begin the journey</span>
            </div>
          </Link>

          <Link to="/reference" className="landing-nav-card landing-nav-card--reference">
            <div className="landing-nav-card-bg" style={{ backgroundImage: `url(${images.lucerne.chapel_bridge.url})` }} />
            <div className="landing-nav-card-overlay" />
            <div className="landing-nav-card-content">
              <h2>Reference</h2>
              <p>Day-by-day details with all activity options, schedules, pricing, and restaurant picks.</p>
              <span className="landing-nav-card-cta">View full guide</span>
            </div>
          </Link>

          <Link to="/quick" className="landing-nav-card landing-nav-card--quick">
            <div className="landing-nav-card-content">
              <h2>Quick Reference</h2>
              <p>Emergency numbers, hotel confirmations, booked activities. Dark mode, phone-friendly.</p>
              <span className="landing-nav-card-cta">Open quick ref</span>
            </div>
          </Link>
        </motion.div>

        {/* Key dates */}
        <motion.section 
          className="landing-dates"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.9 }}
        >
          <h3>Your Journey</h3>
          <div className="landing-dates-timeline">
            <div className="landing-date">
              <span className="landing-date-day">Jan 20-22</span>
              <span className="landing-date-place">Lucerne</span>
              <span className="landing-date-highlight">LILU Light Festival</span>
            </div>
            <div className="landing-date">
              <span className="landing-date-day">Jan 22-23</span>
              <span className="landing-date-place">Rigi Kaltbad</span>
              <span className="landing-date-highlight">Thermal Spa</span>
            </div>
            <div className="landing-date">
              <span className="landing-date-day">Jan 23-26</span>
              <span className="landing-date-place">Grindelwald</span>
              <span className="landing-date-highlight">Fondue Gondola</span>
            </div>
            <div className="landing-date">
              <span className="landing-date-day">Jan 26-27</span>
              <span className="landing-date-place">Zürich</span>
              <span className="landing-date-highlight">Old Town</span>
            </div>
          </div>
        </motion.section>

        {/* Critical reminders */}
        <motion.section 
          className="landing-reminders"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.1 }}
        >
          <h3>Don't Forget</h3>
          <div className="landing-reminder">
            <strong>Saturday Jan 24</strong>
            <p>Book night sledding by 2pm</p>
            <a href="tel:+41338541616">+41 33 854 16 16</a>
          </div>
          <div className="landing-reminder">
            <strong>Sunday Jan 25 @ 4pm</strong>
            <p>Fondue Gondola</p>
            <span>Conf: 5093 | Arrive 15 min early</span>
          </div>
          <div className="landing-reminder landing-reminder--warning">
            <strong>Tuesday Jan 27</strong>
            <p>Flight at 1pm - leave hotel by 9:30am</p>
          </div>
        </motion.section>
      </main>

      <footer className="landing-footer">
        <p>Have an amazing trip.</p>
      </footer>
    </div>
  )
}

export default Landing

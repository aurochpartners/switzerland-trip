import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { images } from '../data/images'
import SmartReminders from '../components/SmartReminders'
import './Landing.css'

const DESTINATIONS = [
  { 
    id: 'lucerne', 
    name: 'Lucerne', 
    dates: 'Jan 20-22',
    highlight: 'LILU Light Festival',
    image: images.lucerne.chapel_bridge.url
  },
  { 
    id: 'rigi', 
    name: 'Rigi Kaltbad', 
    dates: 'Jan 22-23',
    highlight: 'Thermal Spa',
    image: images.rigi.spa.url
  },
  { 
    id: 'grindelwald', 
    name: 'Grindelwald', 
    dates: 'Jan 23-26',
    highlight: 'Fondue Gondola',
    image: images.grindelwald.village.url
  },
  { 
    id: 'zurich', 
    name: 'Zürich', 
    dates: 'Jan 26-27',
    highlight: 'Old Town',
    image: images.zurich.old_town.url
  }
]

function Landing() {
  return (
    <div className="landing">
      {/* Hero - fullscreen */}
      <section className="landing-hero">
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
          <span className="landing-hero-dates">January 19–27, 2026</span>
          <h1 className="landing-hero-title">Switzerland</h1>
          <p className="landing-hero-subtitle">Ray & Katie</p>
        </motion.div>

        <motion.div 
          className="landing-scroll-hint"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          <span>Scroll</span>
          <div className="scroll-line" />
        </motion.div>
      </section>

      {/* Intro */}
      <section className="landing-intro">
        <motion.p 
          className="landing-intro-text"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          Nine days. Four cities. One Swiss winter.
        </motion.p>
      </section>

      {/* Journey preview */}
      <section className="landing-journey">
        <motion.h2 
          className="landing-section-title"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          The Route
        </motion.h2>

        <div className="landing-destinations">
          {DESTINATIONS.map((dest, index) => (
            <motion.div 
              key={dest.id}
              className="destination-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <div 
                className="destination-card-image"
                style={{ backgroundImage: `url(${dest.image})` }}
              />
              <div className="destination-card-content">
                <span className="destination-dates">{dest.dates}</span>
                <h3 className="destination-name">{dest.name}</h3>
                <span className="destination-highlight">{dest.highlight}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Reminders */}
      <section className="landing-reminders-section">
        <SmartReminders />
      </section>

      {/* Navigation cards */}
      <section className="landing-nav-section">
        <motion.h2 
          className="landing-section-title"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          Explore
        </motion.h2>

        <div className="landing-nav-grid">
          <Link to="/planner" className="nav-card nav-card--primary">
            <div className="nav-card-content">
              <h3>Plan Your Adventure</h3>
              <p>Vote on activities, compare costs, build your itinerary</p>
              <span className="nav-card-cta">Start planning →</span>
            </div>
          </Link>

          <Link to="/story" className="nav-card nav-card--story">
            <div 
              className="nav-card-bg" 
              style={{ backgroundImage: `url(${images.grindelwald.eiger.url})` }} 
            />
            <div className="nav-card-overlay" />
            <div className="nav-card-content">
              <h3>Story</h3>
              <p>Scroll through the journey</p>
            </div>
          </Link>

          <Link to="/reference" className="nav-card nav-card--reference">
            <div 
              className="nav-card-bg" 
              style={{ backgroundImage: `url(${images.lucerne.old_town.url})` }} 
            />
            <div className="nav-card-overlay" />
            <div className="nav-card-content">
              <h3>Reference</h3>
              <p>Day-by-day details</p>
            </div>
          </Link>

          <Link to="/quick" className="nav-card nav-card--quick">
            <div className="nav-card-content">
              <h3>Quick Reference</h3>
              <p>Confirmations & contacts</p>
            </div>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="landing-footer">
        <p>See you in the Alps.</p>
      </footer>
    </div>
  )
}

export default Landing

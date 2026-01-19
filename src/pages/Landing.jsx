import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'framer-motion'
import { images } from '../data/images'
import './Landing.css'

const DESTINATIONS = [
  { 
    id: 'lucerne', 
    name: 'Lucerne', 
    dates: 'Jan 20-22',
    teaser: 'Where light meets water',
    image: images.lucerne.chapel_bridge.url
  },
  { 
    id: 'rigi', 
    name: 'Rigi Kaltbad', 
    dates: 'Jan 22-23',
    teaser: 'Above the clouds',
    image: images.rigi.above_clouds.url
  },
  { 
    id: 'grindelwald', 
    name: 'Grindelwald', 
    dates: 'Jan 23-26',
    teaser: 'In the shadow of giants',
    image: images.grindelwald.village.url
  },
  { 
    id: 'zurich', 
    name: 'Zürich', 
    dates: 'Jan 26-27',
    teaser: 'One last night',
    image: images.zurich.old_town.url
  }
]

function Landing() {
  const heroRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start']
  })
  
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.2])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  return (
    <div className="landing">
      {/* Hero - fullscreen with parallax */}
      <section className="landing-hero" ref={heroRef}>
        <motion.div 
          className="landing-hero-bg"
          style={{ 
            backgroundImage: `url(${images.hero.url})`,
            scale: heroScale
          }}
        />
        <div className="landing-hero-overlay" />
        
        <motion.div 
          className="landing-hero-content"
          style={{ opacity: heroOpacity }}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <motion.span 
            className="landing-hero-dates"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            January 19–27, 2026
          </motion.span>
          <h1 className="landing-hero-title">Switzerland</h1>
          <motion.p 
            className="landing-hero-subtitle"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1 }}
          >
            Ray & Katie
          </motion.p>
        </motion.div>

        <motion.div 
          className="landing-scroll-hint"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          style={{ opacity: heroOpacity }}
        >
          <span>Begin the story</span>
          <div className="scroll-line" />
        </motion.div>
      </section>

      {/* Intro */}
      <section className="landing-intro">
        <motion.div
          className="landing-intro-inner"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8 }}
        >
          <p className="landing-intro-text">
            A winter wonderland awaits.
          </p>
          <p className="landing-intro-sub">
            Nine days through snow-capped peaks, lakeside cities, and mountain villages.
          </p>
        </motion.div>
      </section>

      {/* Journey preview */}
      <section className="landing-journey">
        <motion.h2 
          className="landing-section-title"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          The Journey
        </motion.h2>

        <div className="landing-destinations">
          {DESTINATIONS.map((dest, index) => (
            <motion.div 
              key={dest.id}
              className="destination-card"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ 
                duration: 0.6, 
                delay: index * 0.15,
                ease: [0.25, 0.1, 0.25, 1]
              }}
              whileHover={{ y: -8 }}
            >
              <div 
                className="destination-card-image"
                style={{ backgroundImage: `url(${dest.image})` }}
              />
              <div className="destination-card-content">
                <span className="destination-dates">{dest.dates}</span>
                <h3 className="destination-name">{dest.name}</h3>
                <span className="destination-teaser">{dest.teaser}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA to Planner */}
      <section className="landing-cta">
        <motion.div
          className="landing-cta-inner"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6 }}
        >
          <h2>Ready to explore?</h2>
          <p>Choose your adventures, track your plans, discover hidden gems.</p>
          <Link to="/planner" className="landing-cta-button">
            Start Planning
          </Link>
        </motion.div>
      </section>

      {/* Navigation cards */}
      <section className="landing-nav-section">
        <div className="landing-nav-grid">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Link to="/story" className="nav-card nav-card--story">
              <div 
                className="nav-card-bg" 
                style={{ backgroundImage: `url(${images.grindelwald.eiger.url})` }} 
              />
              <div className="nav-card-overlay" />
              <div className="nav-card-content">
                <h3>Story Mode</h3>
                <p>Scroll through the journey</p>
              </div>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Link to="/reference" className="nav-card nav-card--reference">
              <div 
                className="nav-card-bg" 
                style={{ backgroundImage: `url(${images.lucerne.lake.url})` }} 
              />
              <div className="nav-card-overlay" />
              <div className="nav-card-content">
                <h3>Full Guide</h3>
                <p>Day-by-day details</p>
              </div>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Link to="/quick" className="nav-card nav-card--quick">
              <div className="nav-card-content">
                <h3>Quick Reference</h3>
                <p>Confirmations, contacts, essentials</p>
              </div>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="landing-footer">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          Until the mountains call.
        </motion.p>
      </footer>
    </div>
  )
}

export default Landing

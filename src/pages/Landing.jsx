import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'framer-motion'
import { images } from '../data/images'
import { hotels, bookedActivities, events } from '../data/verified-data'
import { getMapsUrl } from '../utils/maps'
import './Landing.css'

// Reusable location section with parallax background
function LocationSection({ title, subtitle, image, children, id, isSpecial }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start']
  })
  
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '20%'])
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])

  return (
    <section ref={ref} id={id} className={`location-section ${isSpecial ? 'location-section--special' : ''}`}>
      <div className="location-bg-wrap">
        <motion.div 
          className="location-bg"
          style={{ 
            backgroundImage: `url(${image})`,
            y 
          }}
        />
        <div className="location-overlay" />
      </div>
      
      <motion.div className="location-content" style={{ opacity }}>
        <div className="location-header">
          {subtitle && <p className="location-subtitle">{subtitle}</p>}
          <h2 className="location-title">{title}</h2>
        </div>
        <div className="location-body">
          {children}
        </div>
      </motion.div>
    </section>
  )
}

function Landing() {
  const heroRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start']
  })
  
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.2])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  const scrollToStory = () => {
    document.getElementById('lucerne')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="landing">
      {/* Hero - fullscreen */}
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

        <motion.button 
          className="landing-scroll-hint"
          onClick={scrollToStory}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          style={{ opacity: heroOpacity }}
        >
          <span>Begin the story</span>
          <div className="scroll-line" />
        </motion.button>
      </section>

      {/* Story Sections - Each city as an immersive experience */}
      
      {/* Lucerne */}
      <LocationSection
        id="lucerne"
        title="Lucerne"
        subtitle="January 20-22"
        image={images.lucerne.chapel_bridge.url}
      >
        <p>
          You arrive jet-lagged but excited. The train from Zürich delivers you to a city 
          where medieval bridges cross clear alpine water and mountains frame every view.
        </p>
        <p>
          Two nights at the Schweizerhof, right on the lake. The LILU Light Festival 
          transforms the Old Town after dark—walk the illuminated streets both evenings.
        </p>
        <div className="story-hotel">
          <strong>Hotel Schweizerhof Luzern</strong>
          <span>Confirmation: {hotels[0].confirmation}</span>
          <a href={`tel:${hotels[0].phone}`}>{hotels[0].phone}</a>
        </div>
        {events.lilu && (
          <div className="story-event">
            <strong>LILU Light Festival</strong>
            <span>6pm - 10pm, free outdoor installations</span>
          </div>
        )}
      </LocationSection>

      {/* Rigi */}
      <LocationSection
        id="rigi"
        title="Rigi Kaltbad"
        subtitle="January 22-23"
        image={images.rigi.above_clouds.url}
      >
        <p>
          Leave the lake behind. Boat to Vitznau, then cogwheel train up through the fog 
          to a village perched 1,450 meters above the world.
        </p>
        <p>
          Mario Botta designed the thermal baths here. The indoor pool flows to an outdoor 
          infinity pool where you float in warm mineral water, watching the clouds below.
        </p>
        <div className="story-hotel">
          <strong>Hotel Rigi Kaltbad</strong>
          <span>Confirmation: {hotels[1].confirmation}</span>
          <a href={`tel:${hotels[1].phone}`}>{hotels[1].phone}</a>
        </div>
        <div className="story-alert">
          <strong>Note:</strong> Weggis cable car closed for renovation. 
          Take the boat to Vitznau instead—more scenic anyway.
        </div>
      </LocationSection>

      {/* Grindelwald */}
      <LocationSection
        id="grindelwald"
        title="Grindelwald"
        subtitle="January 23-26"
        image={images.grindelwald.village.url}
      >
        <p>
          The Eiger appears. You have arrived in the heart of the Bernese Alps.
        </p>
        <p>
          Three nights at Bergwelt, an alpine design resort with views of the north face. 
          The World Snow Festival fills the village square with ice sculptures that glow 
          after dark. Take the First gondola up for cliff walks and ziplines.
        </p>
        <p>
          On Saturday night, you sled 4.5 kilometers down a moonlit mountain after fondue. 
          Just you, headlamps, stars, and snow.
        </p>
        <div className="story-hotel">
          <strong>Bergwelt Grindelwald</strong>
          <span>Confirmation: {hotels[2].confirmation}</span>
          <a href={`tel:${hotels[2].phone}`}>{hotels[2].phone}</a>
        </div>
        <div className="story-reminder">
          <strong>Saturday Jan 24:</strong> Book night sledding by 2pm
          <a href="tel:+41338541616">+41 33 854 16 16</a>
        </div>
      </LocationSection>

      {/* Fondue Gondola - Special moment */}
      <LocationSection
        id="fondue"
        title="Fondue Gondola"
        subtitle="January 25, 4pm"
        image={images.activities.fondue.url}
        isSpecial={true}
      >
        <p>
          A relaxed morning, a light afternoon, and then—at four o'clock—fondue for two 
          in a vintage gondola cabin. The Eiger stands as backdrop. A proper Swiss send-off 
          from Grindelwald.
        </p>
        <div className="story-booked">
          <strong>Fondue Gondola</strong>
          <a 
            href={getMapsUrl('Dorfstrasse 53, 3818 Grindelwald', 'Hotel Belvedere Grindelwald')} 
            target="_blank" 
            rel="noopener noreferrer"
            className="story-location-link"
          >
            Hotel Belvedere, Dorfstrasse 53
          </a>
          <span>Confirmation: {bookedActivities[0].confirmation}</span>
          <span>Arrive 15 min early</span>
        </div>
      </LocationSection>

      {/* Zürich */}
      <LocationSection
        id="zurich"
        title="Zürich"
        subtitle="January 26-27"
        image={images.zurich.old_town.url}
      >
        <p>
          The mountains recede as the train carries you toward the city. One final night 
          in Switzerland—time for the Old Town, a special dinner, and quiet gratitude.
        </p>
        <p>
          Walk from Bahnhofstrasse to Lindenhof for the view. Find the Chagall windows 
          in Fraumünster. Climb the Grossmünster towers. Wander Niederdorf until dinner.
        </p>
        <div className="story-hotel">
          <strong>Hotel Schweizerhof Zürich</strong>
          <span>Confirmation: {hotels[3].confirmation}</span>
          <a href={`tel:${hotels[3].phone}`}>{hotels[3].phone}</a>
        </div>
        <div className="story-alert warning">
          <strong>Tuesday Jan 27:</strong> Flight at 1pm. Leave hotel by 9:30am.
        </div>
      </LocationSection>

      {/* Navigation Cards */}
      <section className="landing-nav-section">
        <motion.div
          className="landing-nav-intro"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2>Ready to explore?</h2>
          <p>Plan your adventures, check the details, or grab the essentials.</p>
        </motion.div>

        <div className="landing-nav-grid">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Link to="/journey" className="nav-card nav-card--planner">
              <div 
                className="nav-card-bg" 
                style={{ backgroundImage: `url(${images.grindelwald.first.url})` }} 
              />
              <div className="nav-card-overlay" />
              <div className="nav-card-content">
                <h3>Plan Your Journey</h3>
                <p>Day-by-day guide with activities to choose</p>
              </div>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Link to="/quick" className="nav-card nav-card--reference">
              <div 
                className="nav-card-bg" 
                style={{ backgroundImage: `url(${images.lucerne.lake.url})` }} 
              />
              <div className="nav-card-overlay" />
              <div className="nav-card-content">
                <h3>Quick Reference</h3>
                <p>Confirmations, contacts, emergency info</p>
              </div>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Link to="/reference" className="nav-card nav-card--quick">
              <div className="nav-card-content">
                <h3>Full Reference</h3>
                <p>Detailed day-by-day breakdown</p>
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

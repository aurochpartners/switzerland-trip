import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Link } from 'react-router-dom'
import { images } from '../data/images'
import { hotels, bookedActivities, events } from '../data/verified-data'
import './StoryMode.css'

function LocationSection({ title, subtitle, image, children, id, isSpecial }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start']
  })
  
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '20%'])
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0])

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

function StoryMode() {
  return (
    <div className="story-mode">
      {/* Fixed nav */}
      <nav className="story-nav">
        <Link to="/" className="story-nav-link">Home</Link>
        <Link to="/reference" className="story-nav-link">Reference</Link>
        <Link to="/quick" className="story-nav-link">Quick Ref</Link>
      </nav>

      {/* Hero */}
      <header className="story-hero">
        <motion.div 
          className="story-hero-bg"
          style={{ backgroundImage: `url(${images.hero.url})` }}
        />
        <div className="story-hero-overlay" />
        <motion.div 
          className="story-hero-content"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          <p className="story-hero-date">January 19-27, 2026</p>
          <h1 className="story-hero-title">Switzerland</h1>
          <p className="story-hero-names">Ray & Katie</p>
        </motion.div>
        <motion.div 
          className="scroll-hint"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          <span>Scroll to begin</span>
        </motion.div>
      </header>

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

      {/* Fondue Gondola */}
      <LocationSection
        id="fondue"
        title="Fondue Gondola"
        subtitle="January 25, 4pm"
        image={images.activities.fondue.url}
      >
        <p>
          A relaxed morning, a light afternoon, and then—at four o'clock—fondue for two 
          in a vintage gondola cabin. The Eiger stands as backdrop. A proper Swiss send-off 
          from Grindelwald.
        </p>
        <div className="story-booked">
          <strong>Fondue Gondola</strong>
          <span>Hotel Belvedere, Dorfstrasse 53</span>
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

      {/* Footer */}
      <footer className="story-footer">
        <div className="story-footer-content">
          <p className="story-footer-names">Ray & Katie</p>
          <p className="story-footer-date">January 2026</p>
          <div className="story-footer-links">
            <Link to="/reference">Full Reference Guide</Link>
            <Link to="/quick">Quick Reference</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default StoryMode

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { destinations } from '../data/chapters'
import './JourneyMap.css'

function JourneyMap({ onDestinationClick }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 80%', 'end 60%']
  })
  
  const pathLength = useTransform(scrollYProgress, [0, 1], [0, 1])

  return (
    <section ref={ref} className="journey-map section">
      <div className="container">
        <motion.div 
          className="journey-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="journey-label">The Journey</p>
          <h2 className="journey-title">Four destinations, seven nights</h2>
        </motion.div>

        <div className="journey-track">
          <svg 
            className="journey-line-svg" 
            viewBox="0 0 800 60" 
            preserveAspectRatio="none"
          >
            <motion.path
              d="M 0 30 L 800 30"
              fill="none"
              stroke="var(--rose-gold)"
              strokeWidth="2"
              style={{ pathLength }}
            />
          </svg>
          
          <div className="journey-stops">
            {destinations.map((dest, index) => (
              <motion.button
                key={dest.id}
                className="journey-stop"
                onClick={() => onDestinationClick?.(dest.id)}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.15 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="stop-dot" />
                <span className="stop-name">{dest.name}</span>
                <span className="stop-dates">{dest.dates}</span>
              </motion.button>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default JourneyMap

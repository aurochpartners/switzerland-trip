import { motion } from 'framer-motion'
import HotelCard from './HotelCard'
import './ChapterContent.css'

const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
}

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4 }
}

function ChapterContent({ chapter }) {
  const { content } = chapter

  return (
    <motion.div 
      className="chapter-content"
      variants={stagger}
      initial="initial"
      animate="animate"
    >
      {/* Intro */}
      {content.intro && (
        <motion.p className="chapter-intro" variants={fadeIn}>
          {content.intro}
        </motion.p>
      )}

      {/* Alert */}
      {content.alert && (
        <motion.div className="alert" variants={fadeIn}>
          <strong>{content.alert.title}</strong>
          <p>{content.alert.message}</p>
        </motion.div>
      )}

      {/* Reminder */}
      {content.reminder && (
        <motion.div className="reminder" variants={fadeIn}>
          <strong>{content.reminder.title}</strong>
          <a href={`tel:${content.reminder.phone}`} className="reminder-phone">
            {content.reminder.phone}
          </a>
          <p>{content.reminder.details}</p>
        </motion.div>
      )}

      {/* Special Highlight (for Fondue Gondola) */}
      {content.highlight && (
        <motion.div className="special-highlight" variants={fadeIn}>
          <span className="special-time">{content.highlight.time}</span>
          <h4 className="special-title">{content.highlight.title}</h4>
          {content.highlight.location && (
            <p className="special-location">{content.highlight.location}</p>
          )}
          <p className="special-description">{content.highlight.description}</p>
          {content.highlight.duration && (
            <p className="special-duration">{content.highlight.duration}</p>
          )}
        </motion.div>
      )}

      {/* Day Plan (for special chapter) */}
      {content.dayPlan && (
        <motion.div className="day-plan" variants={fadeIn}>
          {content.dayPlan.map((item, i) => (
            <div key={i} className="day-plan-item">
              <span className="day-plan-time">{item.time}</span>
              <span className="day-plan-activity">{item.activity}</span>
            </div>
          ))}
        </motion.div>
      )}

      {/* Hotel */}
      {content.hotel && (
        <motion.div variants={fadeIn}>
          <HotelCard hotel={content.hotel} />
        </motion.div>
      )}

      {/* Flight */}
      {content.flight && (
        <motion.div className="flight-card" variants={fadeIn}>
          <div className="flight-times">
            <div className="flight-time">
              <span className="flight-time-label">Depart</span>
              <span className="flight-time-value">{content.flight.departure}</span>
              <span className="flight-time-airport">{content.flight.airport}</span>
            </div>
            <div className="flight-arrow">→</div>
            <div className="flight-time">
              <span className="flight-time-label">Arrive</span>
              <span className="flight-time-value">{content.flight.arrival}</span>
              <span className="flight-time-airport">{content.flight.destination}</span>
            </div>
          </div>
          <p className="flight-number">{content.flight.numbers}</p>
        </motion.div>
      )}

      {/* Route */}
      {content.route && (
        <motion.div className="route-card" variants={fadeIn}>
          <h4 className="route-title">Getting there</h4>
          {content.route.steps ? (
            <div className="route-steps">
              {content.route.steps.map((step, i) => (
                <div key={i} className="route-step">
                  <span className="route-mode">{step.mode}</span>
                  <span className="route-path">{step.from} → {step.to}</span>
                  <span className="route-duration">{step.duration}</span>
                </div>
              ))}
            </div>
          ) : (
            <p>{content.route.from} → {content.route.to}</p>
          )}
          {content.route.duration && (
            <p className="route-total">{content.route.duration}</p>
          )}
          {content.route.note && (
            <p className="route-note">{content.route.note}</p>
          )}
        </motion.div>
      )}

      {/* Highlights */}
      {content.highlights && content.highlights.length > 0 && (
        <motion.div className="highlights" variants={fadeIn}>
          {content.highlights.map((h, i) => (
            <div key={i} className="highlight-item">
              <div className="highlight-header">
                <h4>{h.title}</h4>
                {h.time && <span className="highlight-time">{h.time}</span>}
              </div>
              <p>{h.description}</p>
              {h.dates && <p className="highlight-dates">{h.dates}</p>}
            </div>
          ))}
        </motion.div>
      )}

      {/* Activities */}
      {content.activities && content.activities.length > 0 && (
        <motion.div className="activities" variants={fadeIn}>
          <h4>Things to do</h4>
          <div className="activities-list">
            {content.activities.map((a, i) => (
              <div key={i} className="activity-item">
                <strong>{a.name}</strong>
                {a.description && <p>{a.description}</p>}
                {a.note && <p className="activity-note">{a.note}</p>}
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Walking Route */}
      {content.walkingRoute && (
        <motion.div className="walking-route" variants={fadeIn}>
          <h4>Walking route</h4>
          <div className="walking-stops">
            {content.walkingRoute.map((stop, i) => (
              <span key={i} className="walking-stop">{stop}</span>
            ))}
          </div>
        </motion.div>
      )}

      {/* Departure */}
      {content.departure && (
        <motion.div className="departure-card" variants={fadeIn}>
          <h4>{content.departure.date}</h4>
          {content.departure.warning && (
            <p className="departure-warning">{content.departure.warning}</p>
          )}
          <div className="departure-timeline">
            <div className="departure-item">
              <span className="departure-label">Leave hotel</span>
              <span className="departure-value">{content.departure.leaveHotel}</span>
            </div>
            <div className="departure-item">
              <span className="departure-label">Train to airport</span>
              <span className="departure-value">{content.departure.trainToAirport}</span>
            </div>
            <div className="departure-item">
              <span className="departure-label">Flight</span>
              <span className="departure-value">{content.departure.flight}</span>
            </div>
          </div>
          {content.departure.tips && (
            <ul className="departure-tips">
              {content.departure.tips.map((tip, i) => (
                <li key={i}>{tip}</li>
              ))}
            </ul>
          )}
        </motion.div>
      )}

      {/* Tips */}
      {content.tips && content.tips.length > 0 && (
        <motion.ul className="tips-list" variants={fadeIn}>
          {content.tips.map((tip, i) => (
            <li key={i}>{tip}</li>
          ))}
        </motion.ul>
      )}

      {/* Dining */}
      {content.dining && content.dining.length > 0 && (
        <motion.div className="dining" variants={fadeIn}>
          <h4>Where to eat</h4>
          <ul>
            {content.dining.map((d, i) => (
              <li key={i}>{d}</li>
            ))}
          </ul>
        </motion.div>
      )}

      {/* Note */}
      {content.note && (
        <motion.p className="chapter-note" variants={fadeIn}>
          {content.note}
        </motion.p>
      )}
    </motion.div>
  )
}

export default ChapterContent

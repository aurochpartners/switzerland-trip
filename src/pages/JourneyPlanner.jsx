import { useState, useRef, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { useTripState } from '../hooks/useTripState'
import { days } from '../data/days'
import { activities } from '../data/activities'
import { images } from '../data/images'
import { hotels, events, bookedActivities } from '../data/verified-data'
import ActivityCard from '../components/ActivityCard'
import './JourneyPlanner.css'

// Map each day number to a specific image for variety and context
const dayImages = {
  1: images.transport.flight.url,          // Day 1: Departure - flying to Switzerland
  2: images.lucerne.chapel_bridge.url,     // Day 2: Arrival - iconic Chapel Bridge first impression
  3: images.lucerne.pilatus.url,           // Day 3: Lucerne exploration - Pilatus option
  4: images.rigi.spa.url,                  // Day 4: Rigi Kaltbad - thermal spa highlight
  5: images.grindelwald.village.url,       // Day 5: Arrive Grindelwald - village with Eiger
  6: images.grindelwald.jungfraujoch.url,  // Day 6: Adventure - Jungfraujoch/First options
  7: images.activities.fondue.url,         // Day 7: Fondue Gondola - the booked experience
  8: images.zurich.old_town.url,           // Day 8: Zürich - Old Town exploration
  9: images.zurich.grossmunster.url        // Day 9: Departure - goodbye to Zürich's towers
}

// Map day locations to activity keys
const locationActivityKeys = {
  'Lucerne': 'lucerne',
  'Rigi Kaltbad': 'rigi',
  'Grindelwald': 'grindelwald',
  'Zürich': 'zurich'
}

// Day Hero with parallax
function DayHero({ day, image }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start']
  })
  
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.3, 1, 1, 0.3])

  const dateObj = new Date(day.date + 'T12:00:00')
  const formattedDate = dateObj.toLocaleDateString('en-US', { 
    weekday: 'long', 
    month: 'long', 
    day: 'numeric' 
  })

  return (
    <div ref={ref} className="day-hero">
      <motion.div 
        className="day-hero-bg"
        style={{ 
          backgroundImage: `url(${image})`,
          y 
        }}
      />
      <div className="day-hero-overlay" />
      <motion.div className="day-hero-content" style={{ opacity }}>
        <span className="day-hero-date">{formattedDate}</span>
        <h2 className="day-hero-title">{day.location}</h2>
        <p className="day-hero-subtitle">Day {day.number} · {day.title}</p>
      </motion.div>
    </div>
  )
}

// Day Progress Dots
function DayProgress({ days, activeDay, selectedByDay, onDayClick }) {
  return (
    <nav className="day-progress">
      <div className="day-progress-track">
        {days.map((day) => {
          const hasSelections = selectedByDay[day.number]?.length > 0
          const isActive = activeDay === day.number
          
          return (
            <button
              key={day.number}
              className={`day-dot ${isActive ? 'day-dot--active' : ''} ${hasSelections ? 'day-dot--filled' : ''}`}
              onClick={() => onDayClick(day.number)}
              title={`Day ${day.number}: ${day.location}`}
            >
              <span className="day-dot-number">{day.number}</span>
            </button>
          )
        })}
      </div>
    </nav>
  )
}

// Hotel Card
function HotelCard({ hotelId }) {
  const hotel = hotels.find(h => h.id === hotelId)
  if (!hotel) return null

  return (
    <div className="journey-hotel">
      <div className="journey-hotel-header">
        <span className="journey-hotel-label">Your Hotel</span>
      </div>
      <h4 className="journey-hotel-name">{hotel.name}</h4>
      <div className="journey-hotel-details">
        <span className="journey-hotel-conf">
          <strong>Confirmation:</strong> {hotel.confirmation}
        </span>
        <a href={`tel:${hotel.phone}`} className="journey-hotel-phone">{hotel.phone}</a>
      </div>
      <p className="journey-hotel-times">
        Check-in: {hotel.times.checkIn} · Check-out: {hotel.times.checkOut}
      </p>
    </div>
  )
}

// Event Card (LILU, Snow Festival)
function EventCard({ event, time }) {
  return (
    <div className="journey-event">
      <div className="journey-event-badge">Tonight</div>
      <h4 className="journey-event-name">{event.name}</h4>
      <p className="journey-event-time">{time || event.hours} · {event.price}</p>
      <p className="journey-event-desc">{event.description}</p>
    </div>
  )
}

// Alert Card
function AlertCard({ alert }) {
  return (
    <div className={`journey-alert journey-alert--${alert.type}`}>
      <strong>{alert.title}</strong>
      <p>{alert.message}</p>
    </div>
  )
}

// Critical Booking Card
function CriticalCard({ critical }) {
  return (
    <div className="journey-critical">
      <div className="journey-critical-badge">Action Required</div>
      <strong>{critical.title}</strong>
      <a href={`tel:${critical.phone}`} className="journey-critical-phone">{critical.phone}</a>
      <p>{critical.details}</p>
    </div>
  )
}

// Booked Activity Card
function BookedCard({ booked }) {
  return (
    <div className="journey-booked">
      <div className="journey-booked-header">
        <span className="journey-booked-badge">Booked</span>
        <span className="journey-booked-time">{booked.time}</span>
      </div>
      <h4 className="journey-booked-name">{booked.name}</h4>
      <p className="journey-booked-location">{booked.location}</p>
      <p className="journey-booked-conf">Confirmation: <code>{booked.confirmation}</code></p>
      <p className="journey-booked-desc">{booked.description}</p>
      {booked.note && <p className="journey-booked-note">{booked.note}</p>}
    </div>
  )
}

// Expandable Day Details
function DayDetails({ day }) {
  const [isOpen, setIsOpen] = useState(false)

  const hasDetails = day.schedule?.length > 0 || day.meals || day.tips?.length > 0 || day.walkingRoute

  if (!hasDetails) return null

  return (
    <div className="journey-details">
      <button 
        className={`journey-details-toggle ${isOpen ? 'journey-details-toggle--open' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>Day Details</span>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            className="journey-details-content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Schedule */}
            {day.schedule && day.schedule.length > 0 && (
              <div className="journey-schedule">
                <h5>Suggested Schedule</h5>
                <ul>
                  {day.schedule.map((item, i) => (
                    <li key={i} className={`schedule-item schedule-item--${item.type}`}>
                      <span className="schedule-time">{item.time}</span>
                      <span className="schedule-activity">{item.activity}</span>
                      {item.details && <span className="schedule-details">{item.details}</span>}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Meals */}
            {day.meals && (
              <div className="journey-meals">
                <h5>Meal Ideas</h5>
                {day.meals.breakfast && <p><strong>Breakfast:</strong> {day.meals.breakfast}</p>}
                {day.meals.lunch && <p><strong>Lunch:</strong> {day.meals.lunch}</p>}
                {day.meals.dinner && <p><strong>Dinner:</strong> {day.meals.dinner}</p>}
              </div>
            )}

            {/* Walking Route */}
            {day.walkingRoute && (
              <div className="journey-walking">
                <h5>Walking Route</h5>
                <ol>
                  {day.walkingRoute.map((stop, i) => (
                    <li key={i}>{stop}</li>
                  ))}
                </ol>
              </div>
            )}

            {/* Tips */}
            {day.tips && day.tips.length > 0 && (
              <div className="journey-tips">
                <h5>Tips</h5>
                <ul>
                  {day.tips.map((tip, i) => (
                    <li key={i}>{tip}</li>
                  ))}
                </ul>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// Floating Plan Bar
function FloatingPlanBar({ selected, activities, hasSwissPass, onToggle }) {
  const [isOpen, setIsOpen] = useState(false)

  // Calculate totals
  const { total, savings, items } = selected.reduce((acc, activityId) => {
    // Find activity across all locations
    for (const [location, actList] of Object.entries(activities)) {
      const activity = actList.find(a => a.id === activityId)
      if (activity && activity.price) {
        const price = hasSwissPass && activity.price.withPass !== undefined 
          ? activity.price.withPass 
          : activity.price.regular
        const regularPrice = activity.price.regular || 0
        
        acc.total += price
        if (hasSwissPass && activity.price.withPass !== undefined) {
          acc.savings += (regularPrice - (activity.price.withPass || 0))
        }
        acc.items.push({ 
          ...activity, 
          location, 
          displayPrice: price 
        })
        break
      }
    }
    return acc
  }, { total: 0, savings: 0, items: [] })

  return (
    <>
      {/* Backdrop */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            className="plan-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Bar */}
      <div className={`floating-plan-bar ${isOpen ? 'floating-plan-bar--open' : ''}`}>
        <button 
          className="floating-plan-bar-toggle"
          onClick={() => setIsOpen(!isOpen)}
        >
          <div className="floating-plan-bar-summary">
            <span className="floating-plan-bar-count">{selected.length} activities</span>
            <span className="floating-plan-bar-total">CHF {total * 2}</span>
          </div>
          <span className="floating-plan-bar-cta">
            {isOpen ? 'Close' : 'View Plan'} →
          </span>
        </button>

        {/* Expanded sheet */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              className="plan-sheet"
              initial={{ height: 0 }}
              animate={{ height: 'auto' }}
              exit={{ height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="plan-sheet-content">
                <div className="plan-sheet-header">
                  <h3>Your Plan</h3>
                  <span className="plan-sheet-total">CHF {total * 2} total</span>
                </div>

                {items.length === 0 ? (
                  <p className="plan-sheet-empty">
                    Tap "Add to Plan" on activities that interest you.
                  </p>
                ) : (
                  <ul className="plan-sheet-items">
                    {items.map(item => (
                      <li key={item.id} className="plan-sheet-item">
                        <div className="plan-sheet-item-info">
                          <span className="plan-sheet-item-name">{item.name}</span>
                          <span className="plan-sheet-item-location">{item.location}</span>
                        </div>
                        <span className="plan-sheet-item-price">
                          CHF {item.displayPrice * 2}
                        </span>
                      </li>
                    ))}
                  </ul>
                )}

                {savings > 0 && (
                  <div className="plan-sheet-savings">
                    <span>Swiss Pass savings:</span>
                    <span className="plan-sheet-savings-amount">CHF {savings * 2}</span>
                  </div>
                )}

                <div className="plan-sheet-pass">
                  <label className="plan-sheet-pass-toggle">
                    <input 
                      type="checkbox" 
                      checked={hasSwissPass}
                      onChange={onToggle}
                    />
                    <span>We have Swiss Pass</span>
                  </label>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  )
}

// Day Section
function DaySection({ day, dayActivities }) {
  const image = dayImages[day.number] || images.hero.url
  const hotel = day.hotel ? hotels.find(h => h.id === day.hotel) : null
  
  // Check for events on this day
  const liluActive = events.lilu?.yourDates?.includes(day.date)
  const snowFestivalActive = events.snowFestival?.yourDates?.includes(day.date)

  return (
    <section id={`day-${day.number}`} className="day-section">
      <DayHero day={day} image={image} />

      <div className="day-content">
        {/* Alert */}
        {day.alert && <AlertCard alert={day.alert} />}

        {/* Critical */}
        {day.critical && <CriticalCard critical={day.critical} />}

        {/* Events */}
        {liluActive && <EventCard event={events.lilu} time="6pm - 10pm" />}
        {snowFestivalActive && <EventCard event={events.snowFestival} />}

        {/* Booked Activity */}
        {day.booked && <BookedCard booked={day.booked} />}

        {/* Hotel */}
        {day.hotel && <HotelCard hotelId={day.hotel} />}

        {/* Activities */}
        {dayActivities && dayActivities.length > 0 && (
          <div className="day-activities">
            <h3 className="day-activities-title">Choose Your Adventures</h3>
            <div className="day-activities-grid">
              {dayActivities.map(activity => (
                <ActivityCard key={activity.id} activity={activity} />
              ))}
            </div>
          </div>
        )}

        {/* Day Details */}
        <DayDetails day={day} />
      </div>
    </section>
  )
}

// Main Component
function JourneyPlanner() {
  const { selected, preferences, toggleSwissPass, syncStatus } = useTripState()
  const [activeDay, setActiveDay] = useState(1)
  const dayRefs = useRef({})

  // Calculate which day has which selected activities
  const selectedByDay = days.reduce((acc, day) => {
    const locationKey = locationActivityKeys[day.location]
    if (locationKey && activities[locationKey]) {
      const dayActivityIds = activities[locationKey].map(a => a.id)
      acc[day.number] = selected.filter(id => dayActivityIds.includes(id))
    } else {
      acc[day.number] = []
    }
    return acc
  }, {})

  // Track scroll position to update active day
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const dayNum = parseInt(entry.target.id.replace('day-', ''))
            setActiveDay(dayNum)
          }
        })
      },
      { threshold: 0.3, rootMargin: '-100px 0px -50% 0px' }
    )

    days.forEach(day => {
      const el = document.getElementById(`day-${day.number}`)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  const scrollToDay = useCallback((dayNumber) => {
    const el = document.getElementById(`day-${dayNumber}`)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }, [])

  return (
    <div className="journey-planner">
      {/* Header */}
      <header className="journey-header">
        <div className="journey-header-content">
          <Link to="/" className="journey-back">← Home</Link>
          <div className="journey-header-center">
            <h1 className="journey-title">Switzerland</h1>
            <span className={`journey-sync journey-sync--${syncStatus}`}>
              {syncStatus === 'synced' ? '✓ Synced' : 
               syncStatus === 'loading' ? 'Loading...' : 'Offline'}
            </span>
          </div>
          <label className="journey-pass-toggle">
            <input 
              type="checkbox" 
              checked={preferences.hasSwissPass}
              onChange={toggleSwissPass}
            />
            <span>Swiss Pass</span>
          </label>
        </div>
        
        <DayProgress 
          days={days} 
          activeDay={activeDay} 
          selectedByDay={selectedByDay}
          onDayClick={scrollToDay}
        />
      </header>

      {/* Day Sections */}
      <main className="journey-main">
        {days.map(day => {
          const locationKey = locationActivityKeys[day.location]
          const dayActivities = locationKey ? activities[locationKey] : []
          
          return (
            <DaySection 
              key={day.number} 
              day={day} 
              dayActivities={dayActivities}
            />
          )
        })}
      </main>

      {/* Floating Plan Bar */}
      <FloatingPlanBar 
        selected={selected}
        activities={activities}
        hasSwissPass={preferences.hasSwissPass}
        onToggle={toggleSwissPass}
      />

      {/* Footer */}
      <footer className="journey-footer">
        <p>January 2026 · Ray & Katie</p>
        <div className="journey-footer-links">
          <Link to="/">Home</Link>
          <Link to="/quick">Quick Reference</Link>
        </div>
      </footer>
    </div>
  )
}

export default JourneyPlanner

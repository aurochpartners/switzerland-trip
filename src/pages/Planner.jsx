import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useTripState } from '../hooks/useTripState'
import { activities } from '../data/activities'
import ActivityCard from '../components/ActivityCard'
import CostTracker from '../components/CostTracker'
import SmartReminders from '../components/SmartReminders'
import './Planner.css'

const LOCATIONS = [
  { id: 'lucerne', name: 'Lucerne', dates: 'Jan 20-22' },
  { id: 'rigi', name: 'Rigi Kaltbad', dates: 'Jan 22-23' },
  { id: 'grindelwald', name: 'Grindelwald', dates: 'Jan 23-26' },
  { id: 'zurich', name: 'Zürich', dates: 'Jan 26-27' }
]

function Planner() {
  const [activeLocation, setActiveLocation] = useState('lucerne')
  const [showCostTracker, setShowCostTracker] = useState(false)
  const { selected, preferences, toggleSwissPass } = useTripState()

  const locationActivities = activities[activeLocation] || []

  return (
    <div className="planner">
      <header className="planner-header">
        <div className="planner-header-content">
          <Link to="/" className="planner-back">← Home</Link>
          <div className="planner-title-group">
            <h1>Pick Your Adventures</h1>
            <p>Mark what interests you, see the costs</p>
          </div>
          <button 
            className="planner-cost-toggle"
            onClick={() => setShowCostTracker(!showCostTracker)}
          >
            {selected.length} selected
          </button>
        </div>
      </header>

      <div className="planner-layout">
        {/* Main content */}
        <main className="planner-main">
          {/* Smart Reminders */}
          <SmartReminders />

          {/* Location tabs */}
          <nav className="planner-locations">
            {LOCATIONS.map(loc => (
              <button
                key={loc.id}
                className={`location-tab ${activeLocation === loc.id ? 'location-tab--active' : ''}`}
                onClick={() => setActiveLocation(loc.id)}
              >
                <span className="location-tab-name">{loc.name}</span>
                <span className="location-tab-dates">{loc.dates}</span>
              </button>
            ))}
          </nav>

          {/* Pass toggle */}
          <div className="planner-pass-toggle">
            <label className="pass-toggle-inline">
              <input 
                type="checkbox" 
                checked={preferences.hasSwissPass}
                onChange={toggleSwissPass}
              />
              <span>Show prices with Swiss Pass</span>
            </label>
          </div>

          {/* Activities */}
          <section className="planner-activities">
            <h2 className="planner-section-title">
              {LOCATIONS.find(l => l.id === activeLocation)?.name} Activities
            </h2>
            
            <div className="activities-grid">
              {locationActivities.map(activity => (
                <ActivityCard key={activity.id} activity={activity} />
              ))}
            </div>

            {locationActivities.length === 0 && (
              <p className="no-activities">Nothing here yet.</p>
            )}
          </section>
        </main>

        {/* Sidebar - Cost tracker */}
        <aside className={`planner-sidebar ${showCostTracker ? 'planner-sidebar--visible' : ''}`}>
          <button 
            className="sidebar-close"
            onClick={() => setShowCostTracker(false)}
          >
            ×
          </button>
          <CostTracker />
          
          {/* Selected activities summary */}
          <div className="selected-summary">
            <h4>Your Plan</h4>
            {selected.length === 0 ? (
              <p className="no-selected">Click "Add to Plan" on anything that catches your eye.</p>
            ) : (
              <ul className="selected-list">
                {selected.map(activityId => {
                  let activity = null
                  let location = null
                  for (const [loc, list] of Object.entries(activities)) {
                    const found = list.find(a => a.id === activityId)
                    if (found) {
                      activity = found
                      location = loc
                      break
                    }
                  }
                  if (!activity) return null
                  return (
                    <li key={activityId} className="selected-item">
                      <span className="selected-item-name">{activity.name}</span>
                      <span className="selected-item-location">{location}</span>
                    </li>
                  )
                })}
              </ul>
            )}
          </div>
        </aside>
      </div>

      {/* Mobile cost bar */}
      <div className="planner-mobile-bar">
        <div className="mobile-bar-info">
          <span className="mobile-bar-count">{selected.length} activities</span>
          <button 
            className="mobile-bar-toggle"
            onClick={() => setShowCostTracker(!showCostTracker)}
          >
            View Plan
          </button>
        </div>
      </div>

      {/* Footer nav */}
      <footer className="planner-footer">
        <div className="planner-footer-links">
          <Link to="/">Home</Link>
          <Link to="/reference">Full Reference</Link>
          <Link to="/quick">Quick Reference</Link>
        </div>
      </footer>
    </div>
  )
}

export default Planner

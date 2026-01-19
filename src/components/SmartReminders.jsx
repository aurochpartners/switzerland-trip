import { useMemo } from 'react'
import { useTripState } from '../hooks/useTripState'
import { activities } from '../data/activities'
import './SmartReminders.css'

function SmartReminders({ currentDate = new Date() }) {
  const { 
    selected, 
    booked, 
    dismissedReminders, 
    dismissReminder,
    markBooked,
    toggleSelected
  } = useTripState()

  const reminders = useMemo(() => {
    const result = []
    const today = new Date(currentDate)
    today.setHours(0, 0, 0, 0)

    // Find all selected activities
    const selectedActivities = []
    selected.forEach(activityId => {
      for (const [location, activityList] of Object.entries(activities)) {
        const activity = activityList.find(a => a.id === activityId)
        if (activity) {
          selectedActivities.push({ ...activity, location })
          break
        }
      }
    })

    // Check for booking deadlines
    selectedActivities.forEach(activity => {
      if (activity.bookingRequired && !booked[activity.id]) {
        const reminderId = `book-${activity.id}`
        if (!dismissedReminders.includes(reminderId)) {
          result.push({
            id: reminderId,
            type: 'booking',
            priority: activity.critical ? 'high' : 'medium',
            title: activity.name,
            message: `Booking required${activity.bookingDeadline ? ` by ${activity.bookingDeadline}` : ''}`,
            action: activity.links?.phone ? {
              type: 'call',
              label: activity.links.phone,
              href: `tel:${activity.links.phone}`
            } : null,
            activity
          })
        }
      }
    })

    // Check for weather-dependent activities
    selectedActivities.forEach(activity => {
      if (activity.weather === 'clear-only' || activity.weather === 'clear') {
        const reminderId = `weather-${activity.id}`
        if (!dismissedReminders.includes(reminderId)) {
          result.push({
            id: reminderId,
            type: 'weather',
            priority: activity.weather === 'clear-only' ? 'high' : 'low',
            title: activity.name,
            message: activity.weather === 'clear-only' 
              ? 'Only go if clear — check webcams first'
              : 'Best in clear weather — check forecast',
            action: activity.links?.webcams ? {
              type: 'link',
              label: 'Check Webcams',
              href: activity.links.webcams
            } : {
              type: 'link',
              label: 'Check Weather',
              href: 'https://www.meteoswiss.admin.ch'
            },
            activity
          })
        }
      }
    })

    // Pre-booked activities reminders
    const fondue = activities.grindelwald.find(a => a.id === 'fondue-gondola')
    if (fondue && !dismissedReminders.includes('fondue-reminder')) {
      result.push({
        id: 'fondue-reminder',
        type: 'booked',
        priority: 'high',
        title: 'Fondue Gondola',
        message: 'Sunday Jan 25 at 4pm — arrive 15 min early',
        subtext: 'Hotel Belvedere, Dorfstrasse 53 | Conf: 5093',
        activity: fondue
      })
    }

    // Night sledding reminder if it's Friday/Saturday and selected
    const nightSledding = selectedActivities.find(a => a.id === 'night-sledding')
    if (nightSledding && !booked['night-sledding']) {
      const reminderId = 'sledding-deadline'
      if (!dismissedReminders.includes(reminderId)) {
        result.push({
          id: reminderId,
          type: 'deadline',
          priority: 'high',
          title: 'Night Sledding at Bussalp',
          message: 'Book by 2pm on the day — Friday or Saturday only',
          action: {
            type: 'call',
            label: '+41 33 854 16 16',
            href: 'tel:+41338541616'
          },
          activity: nightSledding
        })
      }
    }

    // Departure day warning
    if (!dismissedReminders.includes('departure-warning')) {
      result.push({
        id: 'departure-warning',
        type: 'warning',
        priority: 'medium',
        title: 'Tuesday Jan 27 — Departure',
        message: 'Flight at 1pm. Leave hotel by 9:30am.',
        subtext: 'Train to airport: 12 min, every 5-10 min'
      })
    }

    // Sort by priority
    const priorityOrder = { high: 0, medium: 1, low: 2 }
    result.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority])

    return result
  }, [selected, booked, dismissedReminders, currentDate])

  const handleDismiss = (reminderId) => {
    dismissReminder(reminderId)
  }

  const handleMarkBooked = (activityId) => {
    markBooked(activityId, { bookedAt: new Date().toISOString() })
  }

  const handleRemoveFromPlan = (activityId) => {
    toggleSelected(activityId)
  }

  if (reminders.length === 0) {
    return null
  }

  return (
    <div className="smart-reminders">
      <h3 className="smart-reminders-title">Action Needed</h3>
      
      <div className="smart-reminders-list">
        {reminders.map(reminder => (
          <div 
            key={reminder.id} 
            className={`reminder-card reminder-card--${reminder.type} reminder-card--${reminder.priority}`}
          >
            <div className="reminder-content">
              <div className="reminder-header">
                <span className={`reminder-type reminder-type--${reminder.type}`}>
                  {reminder.type === 'booking' && 'Book'}
                  {reminder.type === 'weather' && 'Weather'}
                  {reminder.type === 'booked' && 'Booked'}
                  {reminder.type === 'deadline' && 'Deadline'}
                  {reminder.type === 'warning' && 'Note'}
                </span>
                <h4 className="reminder-title">{reminder.title}</h4>
              </div>
              
              <p className="reminder-message">{reminder.message}</p>
              
              {reminder.subtext && (
                <p className="reminder-subtext">{reminder.subtext}</p>
              )}

              <div className="reminder-actions">
                {reminder.action && (
                  <a 
                    href={reminder.action.href}
                    className={`reminder-action reminder-action--${reminder.action.type}`}
                    target={reminder.action.type === 'link' ? '_blank' : undefined}
                    rel={reminder.action.type === 'link' ? 'noopener noreferrer' : undefined}
                  >
                    {reminder.action.label}
                  </a>
                )}

                {reminder.type === 'booking' && reminder.activity && (
                  <button 
                    className="reminder-action reminder-action--secondary"
                    onClick={() => handleMarkBooked(reminder.activity.id)}
                  >
                    Mark as Booked
                  </button>
                )}

                {reminder.activity && !reminder.activity.isBooked && (
                  <button 
                    className="reminder-action reminder-action--remove"
                    onClick={() => handleRemoveFromPlan(reminder.activity.id)}
                  >
                    Remove
                  </button>
                )}
              </div>
            </div>

            {reminder.type !== 'booked' && (
              <button 
                className="reminder-dismiss"
                onClick={() => handleDismiss(reminder.id)}
                title="Dismiss"
              >
                ×
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default SmartReminders

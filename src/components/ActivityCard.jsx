import { useTripState } from '../hooks/useTripState'
import './ActivityCard.css'

function WeatherIcon({ weather }) {
  switch (weather) {
    case 'clear':
      return <span className="weather-icon weather-clear" title="Clear weather recommended">☀️</span>
    case 'clear-only':
      return <span className="weather-icon weather-clear-only" title="Clear weather required">☀️!</span>
    case 'any':
      return <span className="weather-icon weather-any" title="Any weather">☁️</span>
    default:
      return null
  }
}

function ActivityCard({ activity, compact = false }) {
  const { 
    vote, 
    toggleSelected, 
    getVote, 
    isSelected, 
    isBooked,
    getBooking,
    preferences 
  } = useTripState()

  const currentVote = getVote(activity.id)
  const selected = isSelected(activity.id)
  const booked = isBooked(activity.id)
  const booking = getBooking(activity.id)
  const hasSwissPass = preferences.hasSwissPass

  const price = activity.price || {}
  const displayPrice = hasSwissPass && price.withPass !== undefined 
    ? price.withPass 
    : price.regular

  const handleVote = (voteType, e) => {
    e.stopPropagation()
    vote(activity.id, voteType)
  }

  const handleSelect = (e) => {
    e.stopPropagation()
    toggleSelected(activity.id)
  }

  const openLink = (url, e) => {
    e.stopPropagation()
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  if (compact) {
    return (
      <div className={`activity-card activity-card--compact ${selected ? 'activity-card--selected' : ''}`}>
        <div className="activity-card-main">
          <div className="activity-card-header">
            <h4 className="activity-card-name">{activity.name}</h4>
            <WeatherIcon weather={activity.weather} />
          </div>
          <div className="activity-card-meta">
            <span className="activity-card-duration">{activity.duration}</span>
            {displayPrice > 0 ? (
              <span className="activity-card-price">
                CHF {displayPrice}
                {hasSwissPass && price.withPass !== price.regular && (
                  <span className="activity-card-savings"> (was {price.regular})</span>
                )}
              </span>
            ) : (
              <span className="activity-card-price activity-card-price--free">
                {price.note || 'Free'}
              </span>
            )}
          </div>
        </div>
        <div className="activity-card-actions">
          <button 
            className={`vote-btn vote-btn--interested ${currentVote === 'interested' ? 'vote-btn--active' : ''}`}
            onClick={(e) => handleVote('interested', e)}
            title="Interested"
          >
            ♡
          </button>
          <button 
            className={`vote-btn vote-btn--must ${currentVote === 'must-do' ? 'vote-btn--active' : ''}`}
            onClick={(e) => handleVote('must-do', e)}
            title="Must do"
          >
            ★
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className={`activity-card ${selected ? 'activity-card--selected' : ''} ${booked ? 'activity-card--booked' : ''} ${activity.critical ? 'activity-card--critical' : ''}`}>
      <div className="activity-card-header">
        <div className="activity-card-title-row">
          <h4 className="activity-card-name">{activity.name}</h4>
          <WeatherIcon weather={activity.weather} />
        </div>
        {activity.category && (
          <span className={`activity-card-category activity-card-category--${activity.category}`}>
            {activity.category}
          </span>
        )}
      </div>

      <p className="activity-card-description">{activity.description}</p>

      <div className="activity-card-details">
        <div className="activity-card-meta">
          <span className="activity-card-duration">{activity.duration}</span>
          {displayPrice > 0 ? (
            <span className="activity-card-price">
              CHF {displayPrice}/person
              {hasSwissPass && price.withPass < price.regular && (
                <span className="activity-card-savings"> (save CHF {price.regular - price.withPass})</span>
              )}
            </span>
          ) : (
            <span className="activity-card-price activity-card-price--free">
              {price.note || 'Free'}
            </span>
          )}
        </div>

        {activity.hours && (
          <div className="activity-card-hours">
            Hours: {activity.hours}
          </div>
        )}

        {activity.tips && activity.tips.length > 0 && (
          <ul className="activity-card-tips">
            {activity.tips.slice(0, 2).map((tip, i) => (
              <li key={i}>{tip}</li>
            ))}
          </ul>
        )}

        {activity.bookingRequired && !booked && (
          <div className="activity-card-booking-needed">
            Booking required
            {activity.bookingDeadline && (
              <span className="booking-deadline"> — by {activity.bookingDeadline}</span>
            )}
          </div>
        )}

        {booked && booking && (
          <div className="activity-card-booked-info">
            <span className="booked-badge">Booked</span>
            {booking.confirmation && <span>Conf: {booking.confirmation}</span>}
            {booking.date && <span>{booking.date} @ {booking.time}</span>}
          </div>
        )}
      </div>

      <div className="activity-card-footer">
        <div className="activity-card-votes">
          <button 
            className={`vote-btn vote-btn--interested ${currentVote === 'interested' ? 'vote-btn--active' : ''}`}
            onClick={(e) => handleVote('interested', e)}
            title="Interested"
          >
            <span className="vote-icon">♡</span>
            <span className="vote-label">Interested</span>
          </button>
          <button 
            className={`vote-btn vote-btn--must ${currentVote === 'must-do' ? 'vote-btn--active' : ''}`}
            onClick={(e) => handleVote('must-do', e)}
            title="Must do"
          >
            <span className="vote-icon">★</span>
            <span className="vote-label">Must Do</span>
          </button>
        </div>

        <div className="activity-card-actions">
          {activity.links && (
            <>
              {activity.links.website && (
                <button 
                  className="action-btn action-btn--link"
                  onClick={(e) => openLink(activity.links.website, e)}
                >
                  Website
                </button>
              )}
              {activity.links.webcams && (
                <button 
                  className="action-btn action-btn--webcam"
                  onClick={(e) => openLink(activity.links.webcams, e)}
                >
                  Webcams
                </button>
              )}
              {activity.links.phone && (
                <a 
                  href={`tel:${activity.links.phone}`}
                  className="action-btn action-btn--phone"
                  onClick={(e) => e.stopPropagation()}
                >
                  {activity.links.phone}
                </a>
              )}
            </>
          )}

          <button 
            className={`action-btn action-btn--select ${selected ? 'action-btn--selected' : ''}`}
            onClick={handleSelect}
          >
            {selected ? '✓ Added' : '+ Add to Plan'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default ActivityCard

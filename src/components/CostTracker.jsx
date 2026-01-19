import { useMemo } from 'react'
import { useTripState } from '../hooks/useTripState'
import { activities } from '../data/activities'
import './CostTracker.css'

function CostTracker({ minimal = false }) {
  const { selected, preferences, toggleSwissPass } = useTripState()
  const { hasSwissPass, travelerCount } = preferences

  const costs = useMemo(() => {
    let activitiesWithoutPass = 0
    let activitiesWithPass = 0
    let selectedActivities = []

    // Calculate activity costs
    selected.forEach(activityId => {
      // Find activity in all locations
      let activity = null
      for (const [location, activityList] of Object.entries(activities)) {
        activity = activityList.find(a => a.id === activityId)
        if (activity) {
          selectedActivities.push({ ...activity, location })
          break
        }
      }

      if (activity && activity.price) {
        const regularPrice = activity.price.regular || 0
        const passPrice = activity.price.withPass ?? regularPrice

        activitiesWithoutPass += regularPrice * travelerCount
        activitiesWithPass += passPrice * travelerCount
      }
    })

    // Transport costs (from pricing data)
    const transportWithoutPass = 377 // CHF for 2 people base transport
    const transportWithPass = 0 // Free with pass

    // Pass cost
    const passCost = 878 // 8-day pass for 2

    const totalWithoutPass = activitiesWithoutPass + transportWithoutPass
    const totalWithPass = activitiesWithPass + transportWithPass + passCost

    const passWorthIt = totalWithoutPass > totalWithPass
    const savings = Math.abs(totalWithoutPass - totalWithPass)

    return {
      activitiesWithoutPass,
      activitiesWithPass,
      transportWithoutPass,
      transportWithPass,
      passCost,
      totalWithoutPass,
      totalWithPass,
      passWorthIt,
      savings,
      selectedActivities,
      selectedCount: selected.length
    }
  }, [selected, travelerCount])

  if (minimal) {
    return (
      <div className="cost-tracker cost-tracker--minimal">
        <div className="cost-tracker-summary">
          <span className="cost-label">Selected: {costs.selectedCount}</span>
          <span className="cost-value">
            CHF {hasSwissPass ? costs.totalWithPass : costs.totalWithoutPass}
          </span>
        </div>
      </div>
    )
  }

  return (
    <div className="cost-tracker">
      <div className="cost-tracker-header">
        <h3>Trip Cost Estimate</h3>
        <span className="cost-tracker-count">{costs.selectedCount} activities selected</span>
      </div>

      <div className="cost-tracker-toggle">
        <label className="pass-toggle">
          <input 
            type="checkbox" 
            checked={hasSwissPass}
            onChange={toggleSwissPass}
          />
          <span className="pass-toggle-slider"></span>
          <span className="pass-toggle-label">Swiss Travel Pass</span>
        </label>
      </div>

      <div className="cost-tracker-breakdown">
        <div className="cost-row">
          <span className="cost-label">Activities</span>
          <span className="cost-value">
            CHF {hasSwissPass ? costs.activitiesWithPass : costs.activitiesWithoutPass}
          </span>
        </div>
        <div className="cost-row">
          <span className="cost-label">Transport</span>
          <span className="cost-value">
            CHF {hasSwissPass ? costs.transportWithPass : costs.transportWithoutPass}
          </span>
        </div>
        {hasSwissPass && (
          <div className="cost-row">
            <span className="cost-label">8-Day Pass (2 ppl)</span>
            <span className="cost-value">CHF {costs.passCost}</span>
          </div>
        )}
        <div className="cost-row cost-row--total">
          <span className="cost-label">Total</span>
          <span className="cost-value">
            CHF {hasSwissPass ? costs.totalWithPass : costs.totalWithoutPass}
          </span>
        </div>
      </div>

      <div className={`cost-tracker-verdict ${costs.passWorthIt ? 'verdict--pass' : 'verdict--no-pass'}`}>
        {costs.passWorthIt ? (
          <span className="verdict-text">
            Swiss Pass saves CHF {costs.savings}
          </span>
        ) : (
          <span className="verdict-text">
            Skip the pass, save CHF {costs.savings}
          </span>
        )}
      </div>

      <div className="cost-tracker-compare">
        <div className="compare-option">
          <span className="compare-label">Without Pass</span>
          <span className="compare-value">CHF {costs.totalWithoutPass}</span>
        </div>
        <div className="compare-option">
          <span className="compare-label">With Pass</span>
          <span className="compare-value">CHF {costs.totalWithPass}</span>
        </div>
      </div>

      {costs.selectedActivities.length > 0 && (
        <div className="cost-tracker-selected">
          <h4>Selected Activities</h4>
          <ul>
            {costs.selectedActivities.map(activity => (
              <li key={activity.id}>
                <span className="selected-name">{activity.name}</span>
                <span className="selected-price">
                  CHF {hasSwissPass 
                    ? (activity.price.withPass ?? activity.price.regular) 
                    : activity.price.regular}
                  {hasSwissPass && activity.price.withPass !== undefined && activity.price.withPass < activity.price.regular && (
                    <span className="selected-savings"> saved</span>
                  )}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}

      <p className="cost-tracker-note">
        Prices per person × {travelerCount}. Some activities may have additional add-ons.
      </p>
    </div>
  )
}

export default CostTracker

import { useState, useEffect, useCallback } from 'react'

const STORAGE_KEY = 'switzerland-trip-state'

const defaultState = {
  // Activity votes: { activityId: 'interested' | 'must-do' | null }
  votes: {},
  // Selected activities for the trip
  selected: [],
  // Booked activities with confirmation numbers
  booked: {
    'fondue-gondola': { confirmation: '5093', date: '2026-01-25', time: '16:00' }
  },
  // Completed/done activities
  completed: [],
  // User preferences
  preferences: {
    hasSwissPass: false,
    travelerCount: 2
  },
  // Dismissed reminders
  dismissedReminders: []
}

export function useTripState() {
  const [state, setState] = useState(() => {
    if (typeof window === 'undefined') return defaultState
    
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved) {
        const parsed = JSON.parse(saved)
        // Merge with defaults to handle new fields
        return { ...defaultState, ...parsed }
      }
    } catch (e) {
      console.error('Error loading trip state:', e)
    }
    return defaultState
  })

  // Persist to localStorage whenever state changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
    }
  }, [state])

  // Vote on an activity
  const vote = useCallback((activityId, voteType) => {
    setState(prev => ({
      ...prev,
      votes: {
        ...prev.votes,
        [activityId]: prev.votes[activityId] === voteType ? null : voteType
      }
    }))
  }, [])

  // Toggle activity selection
  const toggleSelected = useCallback((activityId) => {
    setState(prev => ({
      ...prev,
      selected: prev.selected.includes(activityId)
        ? prev.selected.filter(id => id !== activityId)
        : [...prev.selected, activityId]
    }))
  }, [])

  // Mark activity as booked
  const markBooked = useCallback((activityId, details = {}) => {
    setState(prev => ({
      ...prev,
      booked: {
        ...prev.booked,
        [activityId]: { ...details, bookedAt: new Date().toISOString() }
      }
    }))
  }, [])

  // Remove booking
  const removeBooking = useCallback((activityId) => {
    setState(prev => {
      const { [activityId]: removed, ...rest } = prev.booked
      return { ...prev, booked: rest }
    })
  }, [])

  // Mark activity as completed
  const markCompleted = useCallback((activityId) => {
    setState(prev => ({
      ...prev,
      completed: prev.completed.includes(activityId)
        ? prev.completed
        : [...prev.completed, activityId]
    }))
  }, [])

  // Toggle Swiss Pass preference
  const toggleSwissPass = useCallback(() => {
    setState(prev => ({
      ...prev,
      preferences: {
        ...prev.preferences,
        hasSwissPass: !prev.preferences.hasSwissPass
      }
    }))
  }, [])

  // Dismiss a reminder
  const dismissReminder = useCallback((reminderId) => {
    setState(prev => ({
      ...prev,
      dismissedReminders: [...prev.dismissedReminders, reminderId]
    }))
  }, [])

  // Reset all state
  const resetState = useCallback(() => {
    setState(defaultState)
    if (typeof window !== 'undefined') {
      localStorage.removeItem(STORAGE_KEY)
    }
  }, [])

  // Calculate costs based on selections
  const calculateCosts = useCallback((activities) => {
    const { selected, preferences } = state
    const { hasSwissPass, travelerCount } = preferences

    let totalWithoutPass = 0
    let totalWithPass = 0

    selected.forEach(activityId => {
      // Find activity in all locations
      let activity = null
      for (const location of Object.values(activities)) {
        activity = location.find(a => a.id === activityId)
        if (activity) break
      }

      if (activity && activity.price) {
        const regularPrice = activity.price.regular || 0
        const passPrice = activity.price.withPass ?? regularPrice

        totalWithoutPass += regularPrice * travelerCount
        totalWithPass += passPrice * travelerCount
      }
    })

    // Add transport costs (approximate)
    const transportWithoutPass = 377 * (travelerCount / 2) // Base transport for 2
    const transportWithPass = 0

    return {
      activitiesWithoutPass: totalWithoutPass,
      activitiesWithPass: totalWithPass,
      transportWithoutPass,
      transportWithPass,
      totalWithoutPass: totalWithoutPass + transportWithoutPass,
      totalWithPass: totalWithPass + transportWithPass + 878, // Pass cost for 2
      passCost: 878,
      savings: hasSwissPass
        ? (totalWithoutPass + transportWithoutPass) - (totalWithPass + transportWithPass + 878)
        : 0,
      recommendation: (totalWithoutPass + transportWithoutPass) < (totalWithPass + transportWithPass + 878)
        ? 'skip-pass'
        : 'get-pass'
    }
  }, [state])

  // Get activities by vote type
  const getVotedActivities = useCallback((voteType) => {
    return Object.entries(state.votes)
      .filter(([_, vote]) => vote === voteType)
      .map(([id]) => id)
  }, [state.votes])

  // Check if activity is selected
  const isSelected = useCallback((activityId) => {
    return state.selected.includes(activityId)
  }, [state.selected])

  // Check if activity is booked
  const isBooked = useCallback((activityId) => {
    return activityId in state.booked
  }, [state.booked])

  // Get booking details
  const getBooking = useCallback((activityId) => {
    return state.booked[activityId] || null
  }, [state.booked])

  // Check if activity is completed
  const isCompleted = useCallback((activityId) => {
    return state.completed.includes(activityId)
  }, [state.completed])

  // Get vote for activity
  const getVote = useCallback((activityId) => {
    return state.votes[activityId] || null
  }, [state.votes])

  return {
    // State
    state,
    votes: state.votes,
    selected: state.selected,
    booked: state.booked,
    completed: state.completed,
    preferences: state.preferences,
    dismissedReminders: state.dismissedReminders,

    // Actions
    vote,
    toggleSelected,
    markBooked,
    removeBooking,
    markCompleted,
    toggleSwissPass,
    dismissReminder,
    resetState,

    // Computed
    calculateCosts,
    getVotedActivities,
    isSelected,
    isBooked,
    getBooking,
    isCompleted,
    getVote,

    // Convenience
    interestedActivities: getVotedActivities('interested'),
    mustDoActivities: getVotedActivities('must-do'),
    hasSwissPass: state.preferences.hasSwissPass
  }
}

export default useTripState

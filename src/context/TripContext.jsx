import { createContext, useContext, useState, useEffect, useCallback } from 'react'

const TripContext = createContext(null)

const STORAGE_KEY = 'switzerland-trip-state'

const defaultState = {
  votes: {},
  selected: [],
  booked: {
    'fondue-gondola': { confirmation: '5093', date: '2026-01-25', time: '16:00' }
  },
  completed: [],
  preferences: {
    hasSwissPass: false,
    travelerCount: 2
  },
  dismissedReminders: []
}

export function TripProvider({ children }) {
  const [state, setState] = useState(() => {
    if (typeof window === 'undefined') return defaultState
    
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved) {
        const parsed = JSON.parse(saved)
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

  const vote = useCallback((activityId, voteType) => {
    setState(prev => ({
      ...prev,
      votes: {
        ...prev.votes,
        [activityId]: prev.votes[activityId] === voteType ? null : voteType
      }
    }))
  }, [])

  const toggleSelected = useCallback((activityId) => {
    setState(prev => ({
      ...prev,
      selected: prev.selected.includes(activityId)
        ? prev.selected.filter(id => id !== activityId)
        : [...prev.selected, activityId]
    }))
  }, [])

  const markBooked = useCallback((activityId, details = {}) => {
    setState(prev => ({
      ...prev,
      booked: {
        ...prev.booked,
        [activityId]: { ...details, bookedAt: new Date().toISOString() }
      }
    }))
  }, [])

  const removeBooking = useCallback((activityId) => {
    setState(prev => {
      const { [activityId]: removed, ...rest } = prev.booked
      return { ...prev, booked: rest }
    })
  }, [])

  const markCompleted = useCallback((activityId) => {
    setState(prev => ({
      ...prev,
      completed: prev.completed.includes(activityId)
        ? prev.completed
        : [...prev.completed, activityId]
    }))
  }, [])

  const toggleSwissPass = useCallback(() => {
    setState(prev => ({
      ...prev,
      preferences: {
        ...prev.preferences,
        hasSwissPass: !prev.preferences.hasSwissPass
      }
    }))
  }, [])

  const dismissReminder = useCallback((reminderId) => {
    setState(prev => ({
      ...prev,
      dismissedReminders: [...prev.dismissedReminders, reminderId]
    }))
  }, [])

  const resetState = useCallback(() => {
    setState(defaultState)
    if (typeof window !== 'undefined') {
      localStorage.removeItem(STORAGE_KEY)
    }
  }, [])

  const value = {
    state,
    votes: state.votes,
    selected: state.selected,
    booked: state.booked,
    completed: state.completed,
    preferences: state.preferences,
    dismissedReminders: state.dismissedReminders,
    vote,
    toggleSelected,
    markBooked,
    removeBooking,
    markCompleted,
    toggleSwissPass,
    dismissReminder,
    resetState
  }

  return (
    <TripContext.Provider value={value}>
      {children}
    </TripContext.Provider>
  )
}

export function useTripState() {
  const context = useContext(TripContext)
  if (!context) {
    throw new Error('useTripState must be used within a TripProvider')
  }
  
  const { state, ...actions } = context
  
  const isSelected = useCallback((activityId) => {
    return state.selected.includes(activityId)
  }, [state.selected])

  const isBooked = useCallback((activityId) => {
    return activityId in state.booked
  }, [state.booked])

  const getBooking = useCallback((activityId) => {
    return state.booked[activityId] || null
  }, [state.booked])

  const isCompleted = useCallback((activityId) => {
    return state.completed.includes(activityId)
  }, [state.completed])

  const getVote = useCallback((activityId) => {
    return state.votes[activityId] || null
  }, [state.votes])

  const getVotedActivities = useCallback((voteType) => {
    return Object.entries(state.votes)
      .filter(([_, vote]) => vote === voteType)
      .map(([id]) => id)
  }, [state.votes])

  return {
    ...context,
    isSelected,
    isBooked,
    getBooking,
    isCompleted,
    getVote,
    getVotedActivities,
    interestedActivities: getVotedActivities('interested'),
    mustDoActivities: getVotedActivities('must-do'),
    hasSwissPass: state.preferences.hasSwissPass
  }
}

export default TripContext

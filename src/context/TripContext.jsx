import { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react'

const TripContext = createContext(null)

const STORAGE_KEY = 'switzerland-trip-state'
const API_URL = '/api/trip-state'
const SYNC_INTERVAL = 5000 // Poll every 5 seconds for updates

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
  dismissedReminders: [],
  lastUpdated: null
}

// Sync functions
async function fetchRemoteState() {
  try {
    const response = await fetch(API_URL)
    if (response.ok) {
      const data = await response.json()
      if (!data.empty) {
        return data
      }
    }
  } catch (e) {
    console.log('Remote fetch failed, using local')
  }
  return null
}

async function saveRemoteState(state) {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(state)
    })
    return response.ok
  } catch (e) {
    console.log('Remote save failed')
    return false
  }
}

export function TripProvider({ children }) {
  const [state, setState] = useState(() => {
    // Load from localStorage immediately
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved) {
        return { ...defaultState, ...JSON.parse(saved) }
      }
    } catch (e) {
      console.error('Error loading local state:', e)
    }
    return defaultState
  })
  
  const [syncStatus, setSyncStatus] = useState('loading')
  const isInitialized = useRef(false)
  const lastSavedRef = useRef(null)

  // Initial sync from server
  useEffect(() => {
    async function initialize() {
      const remoteState = await fetchRemoteState()
      if (remoteState) {
        // Use remote state if it's newer
        setState(prev => {
          const remoteTime = new Date(remoteState.lastUpdated || 0)
          const localTime = new Date(prev.lastUpdated || 0)
          if (remoteTime > localTime) {
            return { ...defaultState, ...remoteState }
          }
          return prev
        })
      }
      setSyncStatus('synced')
      isInitialized.current = true
    }
    initialize()
  }, [])

  // Poll for updates from other devices
  useEffect(() => {
    const interval = setInterval(async () => {
      const remoteState = await fetchRemoteState()
      if (remoteState && remoteState.lastUpdated !== lastSavedRef.current) {
        setState(prev => {
          const remoteTime = new Date(remoteState.lastUpdated || 0)
          const localTime = new Date(prev.lastUpdated || 0)
          if (remoteTime > localTime) {
            setSyncStatus('synced')
            return { ...defaultState, ...remoteState }
          }
          return prev
        })
      }
    }, SYNC_INTERVAL)

    return () => clearInterval(interval)
  }, [])

  // Save state whenever it changes
  useEffect(() => {
    if (!isInitialized.current) return

    // Always save to localStorage
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state))

    // Save to server
    saveRemoteState(state).then(success => {
      if (success) {
        lastSavedRef.current = state.lastUpdated
        setSyncStatus('synced')
      } else {
        setSyncStatus('offline')
      }
    })
  }, [state])

  const updateState = useCallback((updater) => {
    setState(prev => {
      const newState = typeof updater === 'function' ? updater(prev) : updater
      return {
        ...newState,
        lastUpdated: new Date().toISOString()
      }
    })
  }, [])

  const vote = useCallback((activityId, voteType) => {
    updateState(prev => ({
      ...prev,
      votes: {
        ...prev.votes,
        [activityId]: prev.votes[activityId] === voteType ? null : voteType
      }
    }))
  }, [updateState])

  const toggleSelected = useCallback((activityId) => {
    updateState(prev => ({
      ...prev,
      selected: prev.selected.includes(activityId)
        ? prev.selected.filter(id => id !== activityId)
        : [...prev.selected, activityId]
    }))
  }, [updateState])

  const markBooked = useCallback((activityId, details = {}) => {
    updateState(prev => ({
      ...prev,
      booked: {
        ...prev.booked,
        [activityId]: { ...details, bookedAt: new Date().toISOString() }
      }
    }))
  }, [updateState])

  const removeBooking = useCallback((activityId) => {
    updateState(prev => {
      const { [activityId]: removed, ...rest } = prev.booked
      return { ...prev, booked: rest }
    })
  }, [updateState])

  const markCompleted = useCallback((activityId) => {
    updateState(prev => ({
      ...prev,
      completed: prev.completed.includes(activityId)
        ? prev.completed
        : [...prev.completed, activityId]
    }))
  }, [updateState])

  const toggleSwissPass = useCallback(() => {
    updateState(prev => ({
      ...prev,
      preferences: {
        ...prev.preferences,
        hasSwissPass: !prev.preferences.hasSwissPass
      }
    }))
  }, [updateState])

  const dismissReminder = useCallback((reminderId) => {
    updateState(prev => ({
      ...prev,
      dismissedReminders: [...prev.dismissedReminders, reminderId]
    }))
  }, [updateState])

  const resetState = useCallback(() => {
    updateState(defaultState)
    localStorage.removeItem(STORAGE_KEY)
  }, [updateState])

  const value = {
    state,
    votes: state.votes,
    selected: state.selected,
    booked: state.booked,
    completed: state.completed,
    preferences: state.preferences,
    dismissedReminders: state.dismissedReminders,
    syncStatus,
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
  
  const { state, ...rest } = context
  
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
    ...rest,
    state,
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

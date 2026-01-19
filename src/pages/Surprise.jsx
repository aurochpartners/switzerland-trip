import { useEffect, useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { images } from '../data/images'
import './Surprise.css'

const loveNotes = [
  "From the moment I met you, I knew adventures would be more magical with you by my side.",
  "Switzerland has always been a dream destination. Sharing it with you makes it perfect.",
  "I can't wait to watch the sunrise over the Alps with you.",
  "Here's to fondue dinners, cozy mountain lodges, and memories we'll treasure forever.",
  "You make every journey an adventure and every moment feel like home."
]

function Surprise() {
  const [currentNote, setCurrentNote] = useState(0)
  const [showMessage, setShowMessage] = useState(false)
  const [hearts, setHearts] = useState([])
  const containerRef = useRef(null)

  useEffect(() => {
    // Gradually reveal the message
    const timer = setTimeout(() => setShowMessage(true), 1500)
    return () => clearTimeout(timer)
  }, [])

  // Cycle through love notes
  useEffect(() => {
    if (!showMessage) return
    const interval = setInterval(() => {
      setCurrentNote(prev => (prev + 1) % loveNotes.length)
    }, 6000)
    return () => clearInterval(interval)
  }, [showMessage])

  // Floating hearts effect on click
  const handleClick = (e) => {
    const rect = containerRef.current?.getBoundingClientRect()
    if (!rect) return
    
    const newHeart = {
      id: Date.now(),
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    }
    setHearts(prev => [...prev, newHeart])
    
    // Remove heart after animation
    setTimeout(() => {
      setHearts(prev => prev.filter(h => h.id !== newHeart.id))
    }, 2000)
  }

  return (
    <div className="surprise" ref={containerRef} onClick={handleClick}>
      {/* Background */}
      <div className="surprise-bg">
        <motion.div 
          className="surprise-bg-image"
          style={{ backgroundImage: `url(${images.grindelwald.winter.url})` }}
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 20, ease: 'linear' }}
        />
        <div className="surprise-overlay" />
      </div>

      {/* Floating hearts */}
      <AnimatePresence>
        {hearts.map(heart => (
          <motion.div
            key={heart.id}
            className="floating-heart"
            initial={{ x: heart.x, y: heart.y, scale: 0, opacity: 1 }}
            animate={{ 
              y: heart.y - 150, 
              scale: [0, 1.2, 1],
              opacity: [1, 1, 0]
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 2, ease: 'easeOut' }}
          >
            ❤️
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Content */}
      <motion.div 
        className="surprise-content"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
      >
        <motion.div
          className="surprise-header"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <span className="surprise-for">For</span>
          <h1 className="surprise-name">Katie</h1>
        </motion.div>

        <AnimatePresence mode="wait">
          {showMessage && (
            <motion.div
              className="surprise-message"
              key={currentNote}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.8 }}
            >
              <p className="surprise-note">"{loveNotes[currentNote]}"</p>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div
          className="surprise-signature"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 2 }}
        >
          <p>With all my love,</p>
          <p className="surprise-from">Ray</p>
        </motion.div>

        <motion.div
          className="surprise-hearts-row"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 2.5 }}
        >
          <span>❤️</span>
          <span>🏔️</span>
          <span>❤️</span>
        </motion.div>

        <motion.p
          className="surprise-hint"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.4 }}
          transition={{ duration: 1, delay: 3 }}
        >
          (tap anywhere to spread the love)
        </motion.p>
      </motion.div>

      {/* Back link */}
      <motion.div
        className="surprise-back"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3 }}
      >
        <Link to="/">← Back to our adventure</Link>
      </motion.div>
    </div>
  )
}

export default Surprise

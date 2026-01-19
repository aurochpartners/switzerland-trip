import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ChapterContent from './ChapterContent'
import './Chapter.css'

function Chapter({ chapter, index }) {
  const [isExpanded, setIsExpanded] = useState(false)
  const isSpecial = chapter.isSpecial

  return (
    <motion.article
      id={chapter.id}
      className={`chapter ${isSpecial ? 'chapter--special' : ''} ${isExpanded ? 'chapter--expanded' : ''}`}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
    >
      <button 
        className="chapter-header"
        onClick={() => setIsExpanded(!isExpanded)}
        aria-expanded={isExpanded}
      >
        <div className="chapter-image-wrap">
          <motion.img
            src={chapter.image}
            alt={chapter.title}
            className="chapter-image"
            loading="lazy"
            layoutId={`image-${chapter.id}`}
          />
          <div className="chapter-image-overlay" />
        </div>
        
        <div className="chapter-info">
          <div className="chapter-meta">
            <span className="chapter-number">Chapter {chapter.number}</span>
            <span className="chapter-mood">{chapter.mood}</span>
          </div>
          
          <h3 className="chapter-title">{chapter.title}</h3>
          
          <div className="chapter-details">
            <span className="chapter-location">{chapter.location}</span>
            <span className="chapter-date">{chapter.date}</span>
          </div>
          
          <p className="chapter-summary">{chapter.summary}</p>
          
          <span className="chapter-toggle">
            {isExpanded ? 'Close' : 'View details'}
            <svg 
              className="chapter-toggle-icon" 
              viewBox="0 0 24 24"
              style={{ transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)' }}
            >
              <path d="M6 9l6 6 6-6" stroke="currentColor" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </span>
        </div>
      </button>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            className="chapter-body"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ 
              height: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
              opacity: { duration: 0.3 }
            }}
          >
            <div className="chapter-body-inner">
              <ChapterContent chapter={chapter} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.article>
  )
}

export default Chapter

import { useRef } from 'react'
import Hero from '../components/Hero'
import JourneyMap from '../components/JourneyMap'
import Chapter from '../components/Chapter'
import { chapters } from '../data/chapters'
import './Landing.css'

function Landing() {
  const chaptersRef = useRef(null)

  const scrollToChapter = (id) => {
    const element = document.getElementById(id)
    if (element) {
      const offset = 100
      const top = element.getBoundingClientRect().top + window.pageYOffset - offset
      window.scrollTo({ top, behavior: 'smooth' })
    }
  }

  const handleDestinationClick = (destId) => {
    // Map destination to chapter
    const destToChapter = {
      lucerne: 'city-of-lights',
      rigi: 'above-clouds',
      grindelwald: 'into-alps',
      zurich: 'until-next-time'
    }
    const chapterId = destToChapter[destId]
    if (chapterId) {
      scrollToChapter(chapterId)
    }
  }

  return (
    <main className="landing">
      <Hero />
      
      <JourneyMap onDestinationClick={handleDestinationClick} />
      
      <section className="chapters-section section" ref={chaptersRef}>
        <div className="container">
          <div className="chapters-header">
            <p className="chapters-label">The Story</p>
            <h2 className="chapters-title">Seven chapters, one adventure</h2>
          </div>
          
          <div className="chapters-list">
            {chapters.map((chapter, index) => (
              <Chapter 
                key={chapter.id} 
                chapter={chapter} 
                index={index}
              />
            ))}
          </div>
        </div>
      </section>
      
      <footer className="footer dark">
        <div className="container">
          <p className="footer-text">Ray & Katie</p>
          <p className="footer-date">January 2026</p>
        </div>
      </footer>
    </main>
  )
}

export default Landing

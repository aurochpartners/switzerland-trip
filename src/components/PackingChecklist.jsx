import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import './PackingChecklist.css'

const STORAGE_KEY = 'switzerland-packing-list'

const packingCategories = [
  {
    id: 'documents',
    name: 'Documents & Essentials',
    icon: '📄',
    items: [
      { id: 'passport', name: 'Passport (valid 6+ months)', critical: true },
      { id: 'license', name: "Driver's license (backup ID)" },
      { id: 'insurance', name: 'Travel insurance documents' },
      { id: 'cards', name: 'Credit/debit cards (Visa/Mastercard work best)', critical: true },
      { id: 'cash', name: 'Some CHF cash (ATMs widely available)' },
      { id: 'reservations', name: 'Hotel confirmations (printed/digital)', critical: true },
      { id: 'flight', name: 'Flight confirmation & boarding passes', critical: true },
      { id: 'quickref', name: 'Quick Reference printout' }
    ]
  },
  {
    id: 'clothing',
    name: 'Winter Clothing',
    icon: '🧥',
    items: [
      { id: 'jacket', name: 'Warm waterproof jacket', critical: true },
      { id: 'layers', name: 'Layering pieces (fleece, sweaters)' },
      { id: 'thermals', name: 'Thermal base layers (for mountains)' },
      { id: 'pants', name: 'Warm pants (2-3 pairs)' },
      { id: 'waterproof-pants', name: 'Waterproof pants (for sledding)' },
      { id: 'boots', name: 'Waterproof winter boots with grip', critical: true },
      { id: 'walking-shoes', name: 'Comfortable walking shoes' },
      { id: 'hat', name: 'Warm hat/beanie' },
      { id: 'gloves', name: 'Warm gloves (waterproof if possible)', critical: true },
      { id: 'scarf', name: 'Scarf or neck gaiter' },
      { id: 'socks', name: 'Warm wool socks (5+ pairs)' }
    ]
  },
  {
    id: 'spa',
    name: 'Spa & Swimming',
    icon: '🏊',
    items: [
      { id: 'swimsuit', name: 'Swimsuit (for thermal baths)', critical: true },
      { id: 'slippers', name: 'Spa slippers (or buy at Rigi for CHF 6.50)' },
      { id: 'flip-flops', name: 'Flip flops for spa' }
    ]
  },
  {
    id: 'tech',
    name: 'Tech & Electronics',
    icon: '🔌',
    items: [
      { id: 'phone', name: 'Phone & charger', critical: true },
      { id: 'adapter', name: 'Swiss plug adapter (Type J - 3 round pins)', critical: true },
      { id: 'camera', name: 'Camera & charger' },
      { id: 'battery', name: 'Portable battery pack' },
      { id: 'headphones', name: 'Headphones (for flights)' }
    ]
  },
  {
    id: 'toiletries',
    name: 'Toiletries',
    icon: '🧴',
    items: [
      { id: 'basics', name: 'Toothbrush, toothpaste, deodorant' },
      { id: 'skincare', name: 'Skincare (moisturizer essential for dry mountain air)' },
      { id: 'sunscreen', name: 'Sunscreen SPF 30+ (snow reflects UV)', critical: true },
      { id: 'lip', name: 'Lip balm with SPF' },
      { id: 'meds', name: 'Any personal medications' },
      { id: 'painkillers', name: 'Pain relievers (altitude can cause headaches)' },
      { id: 'motion', name: 'Motion sickness meds (for mountain roads/trains)' }
    ]
  },
  {
    id: 'extras',
    name: 'Nice to Have',
    icon: '✨',
    items: [
      { id: 'sunglasses', name: 'Sunglasses (snow glare)' },
      { id: 'daypack', name: 'Small daypack/backpack' },
      { id: 'book', name: 'Book or e-reader' },
      { id: 'snacks', name: 'Snacks for flights' },
      { id: 'neck-pillow', name: 'Neck pillow for flight' },
      { id: 'reusable-bottle', name: 'Reusable water bottle (tap water is excellent)' }
    ]
  }
]

function PackingChecklist() {
  const [checked, setChecked] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      return saved ? JSON.parse(saved) : {}
    } catch {
      return {}
    }
  })

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(checked))
  }, [checked])

  const toggleItem = (itemId) => {
    setChecked(prev => ({
      ...prev,
      [itemId]: !prev[itemId]
    }))
  }

  const getProgress = () => {
    const allItems = packingCategories.flatMap(cat => cat.items)
    const checkedCount = allItems.filter(item => checked[item.id]).length
    return {
      checked: checkedCount,
      total: allItems.length,
      percentage: Math.round((checkedCount / allItems.length) * 100)
    }
  }

  const getCriticalProgress = () => {
    const criticalItems = packingCategories.flatMap(cat => 
      cat.items.filter(item => item.critical)
    )
    const checkedCount = criticalItems.filter(item => checked[item.id]).length
    return {
      checked: checkedCount,
      total: criticalItems.length,
      allDone: checkedCount === criticalItems.length
    }
  }

  const resetAll = () => {
    if (confirm('Reset all checkboxes?')) {
      setChecked({})
    }
  }

  const progress = getProgress()
  const criticalProgress = getCriticalProgress()

  return (
    <div className="packing">
      <header className="packing-header">
        <Link to="/" className="packing-back">Home</Link>
        <h1>Packing List</h1>
        <p>Winter Switzerland | January 2026</p>
      </header>

      {/* Progress bar */}
      <div className="packing-progress">
        <div className="progress-bar">
          <div 
            className="progress-fill"
            style={{ width: `${progress.percentage}%` }}
          />
        </div>
        <div className="progress-stats">
          <span className="progress-count">
            {progress.checked} / {progress.total} packed ({progress.percentage}%)
          </span>
          <span className={`progress-critical ${criticalProgress.allDone ? 'progress-critical--done' : ''}`}>
            {criticalProgress.allDone 
              ? '✓ All essentials packed!' 
              : `${criticalProgress.checked}/${criticalProgress.total} essentials`}
          </span>
        </div>
      </div>

      {/* Categories */}
      <main className="packing-main">
        {packingCategories.map(category => {
          const catItems = category.items
          const catChecked = catItems.filter(item => checked[item.id]).length
          const catDone = catChecked === catItems.length
          
          return (
            <section key={category.id} className={`packing-category ${catDone ? 'packing-category--done' : ''}`}>
              <h2>
                <span className="category-icon">{category.icon}</span>
                {category.name}
                <span className="category-count">({catChecked}/{catItems.length})</span>
              </h2>
              
              <ul className="packing-items">
                {category.items.map(item => (
                  <li 
                    key={item.id}
                    className={`packing-item ${checked[item.id] ? 'packing-item--checked' : ''} ${item.critical ? 'packing-item--critical' : ''}`}
                  >
                    <label>
                      <input
                        type="checkbox"
                        checked={!!checked[item.id]}
                        onChange={() => toggleItem(item.id)}
                      />
                      <span className="item-checkbox" />
                      <span className="item-name">
                        {item.name}
                        {item.critical && <span className="item-critical">Essential</span>}
                      </span>
                    </label>
                  </li>
                ))}
              </ul>
            </section>
          )
        })}
      </main>

      {/* Actions */}
      <footer className="packing-footer">
        <button className="packing-reset" onClick={resetAll}>
          Reset All
        </button>
        <div className="packing-footer-links">
          <Link to="/">Home</Link>
          <Link to="/quick">Quick Reference</Link>
          <Link to="/planner">Planner</Link>
        </div>
      </footer>
    </div>
  )
}

export default PackingChecklist

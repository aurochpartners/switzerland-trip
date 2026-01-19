import './HotelCard.css'

function HotelCard({ hotel }) {
  return (
    <div className="hotel-card">
      <div className="hotel-header">
        <h4 className="hotel-name">{hotel.name}</h4>
        <p className="hotel-address">{hotel.address}</p>
      </div>
      
      <div className="hotel-grid">
        <div className="hotel-field">
          <span className="hotel-label">Confirmation</span>
          <span className="hotel-value hotel-confirmation">{hotel.confirmation}</span>
        </div>
        
        <div className="hotel-field">
          <span className="hotel-label">Phone</span>
          <a href={`tel:${hotel.phone}`} className="hotel-value hotel-phone">
            {hotel.phone}
          </a>
        </div>
        
        <div className="hotel-field">
          <span className="hotel-label">Check-in</span>
          <span className="hotel-value">{hotel.checkIn}</span>
        </div>
        
        <div className="hotel-field">
          <span className="hotel-label">Check-out</span>
          <span className="hotel-value">{hotel.checkOut}</span>
        </div>
        
        {hotel.room && (
          <div className="hotel-field hotel-field--full">
            <span className="hotel-label">Room</span>
            <span className="hotel-value">{hotel.room}</span>
          </div>
        )}
      </div>
      
      {hotel.includes && hotel.includes.length > 0 && (
        <div className="hotel-includes">
          <span className="hotel-label">Includes</span>
          <div className="hotel-tags">
            {hotel.includes.map((item, i) => (
              <span key={i} className="hotel-tag">{item}</span>
            ))}
          </div>
        </div>
      )}
      
      {hotel.optional && (
        <p className="hotel-optional">{hotel.optional}</p>
      )}
      
      {hotel.note && (
        <p className="hotel-note">{hotel.note}</p>
      )}
    </div>
  )
}

export default HotelCard

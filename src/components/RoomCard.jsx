import { Link } from 'react-router-dom';
import '../styles/RoomCard.css';

function RoomCard({ room }) {
  return (
    <div className="room-card">
      <div className="room-card-image">
        <img src={room.image} alt={room.name} />
      </div>
      <div className="room-card-content">
        <h3 className="room-card-title">{room.name}</h3>
        <p className="room-card-description">{room.description}</p>
        <div className="room-card-details">
          <div className="room-card-amenities">
            <span className="room-detail">
              <i className="icon">🛏️</i> {room.bedType}
            </span>
            <span className="room-detail">
              <i className="icon">👥</i> Max {room.maxGuests} guests
            </span>
          </div>
          <div className="room-card-price">
            <span className="price-amount">₹{room.pricePerNight.toLocaleString()}</span>
            <span className="price-period">per night</span>
          </div>
        </div>
        <div className="room-card-footer">
          <Link to={`/rooms/${room.id}`} className="view-details-btn">
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}

export default RoomCard;
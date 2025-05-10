import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { rooms } from '../assets/data/rooms';
import { useAuth } from '../context/AuthContext';
import { useBooking } from '../context/BookingContext';
import '../styles/RoomDetailPage.css';

function RoomDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const { bookRoom } = useBooking();
  
  const room = rooms.find(r => r.id === parseInt(id));
  
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState(1);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  
  if (!room) {
    return (
      <div className="room-not-found">
        <h2>Room Not Found</h2>
        <p>Sorry, the room you're looking for doesn't exist.</p>
        <button onClick={() => navigate('/rooms')} className="back-btn">
          Back to Rooms
        </button>
      </div>
    );
  }
  
  const handleBooking = (e) => {
    e.preventDefault();
    
    if (!currentUser) {
      navigate('/login');
      return;
    }
    
    if (!checkIn || !checkOut) {
      alert('Please select check-in and check-out dates');
      return;
    }
    
    // Calculate number of nights
    const startDate = new Date(checkIn);
    const endDate = new Date(checkOut);
    const nights = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24));
    
    if (nights <= 0) {
      alert('Check-out date must be after check-in date');
      return;
    }
    
    const totalPrice = room.pricePerNight * nights;
    
    const booking = {
      id: Date.now().toString(),
      roomId: room.id,
      roomName: room.name,
      checkIn,
      checkOut,
      nights,
      guests,
      pricePerNight: room.pricePerNight,
      totalPrice,
      userId: currentUser.id,
      userName: currentUser.name,
      bookingDate: new Date().toISOString(),
      status: 'Confirmed'
    };
    
    bookRoom(booking);
    setBookingSuccess(true);
    
    // Reset form
    setCheckIn('');
    setCheckOut('');
    setGuests(1);
    
    // After 3 seconds, redirect to bookings page
    setTimeout(() => {
      navigate('/my-bookings');
    }, 3000);
  };
  
  const today = new Date().toISOString().split('T')[0];
  
  return (
    <div className="room-detail-page">
      {bookingSuccess && (
        <div className="booking-success">
          <div className="success-content">
            <h2>Booking Successful!</h2>
            <p>Your room has been successfully booked.</p>
            <p>Redirecting to your bookings page...</p>
          </div>
        </div>
      )}
      
      <div className="room-detail-container">
        <div className="room-image-container">
          <img src={room.image} alt={room.name} className="room-detail-image" />
        </div>
        
        <div className="room-info-container">
          <h1 className="room-detail-title">{room.name}</h1>
          <p className="room-detail-description">{room.description}</p>
          
          <div className="room-specifications">
            <div className="spec-item">
              <span className="spec-icon">🛏️</span>
              <span className="spec-text">{room.bedType}</span>
            </div>
            <div className="spec-item">
              <span className="spec-icon">👥</span>
              <span className="spec-text">Up to {room.maxGuests} guests</span>
            </div>
            <div className="spec-item">
              <span className="spec-icon">💰</span>
              <span className="spec-text">₹{room.pricePerNight.toLocaleString()} per night</span>
            </div>
          </div>
          
          <div className="room-amenities">
            <h3>Amenities</h3>
            <ul className="amenities-list">
              {room.amenities.map((amenity, index) => (
                <li key={index} className="amenity-item">
                  <span className="amenity-icon">✓</span>
                  <span className="amenity-text">{amenity}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="booking-form-container">
            <h3>Book This Room</h3>
            <form onSubmit={handleBooking} className="booking-form">
              <div className="form-group">
                <label htmlFor="check-in">Check-in Date:</label>
                <input
                  type="date"
                  id="check-in"
                  min={today}
                  value={checkIn}
                  onChange={(e) => setCheckIn(e.target.value)}
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="check-out">Check-out Date:</label>
                <input
                  type="date"
                  id="check-out"
                  min={checkIn || today}
                  value={checkOut}
                  onChange={(e) => setCheckOut(e.target.value)}
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="guests">Number of Guests:</label>
                <select
                  id="guests"
                  value={guests}
                  onChange={(e) => setGuests(parseInt(e.target.value))}
                  required
                >
                  {[...Array(room.maxGuests)].map((_, i) => (
                    <option key={i} value={i + 1}>{i + 1}</option>
                  ))}
                </select>
              </div>
              
              <button type="submit" className="booking-btn">
                {currentUser ? 'Book Now' : 'Login to Book'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RoomDetailPage;
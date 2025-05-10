import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useBooking } from '../context/BookingContext';
import '../styles/MyBookingsPage.css';

function MyBookingsPage() {
  const { currentUser } = useAuth();
  const { getUserBookings, getUserFoodOrders } = useBooking();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('roomBookings');
  
  if (!currentUser) {
    navigate('/login');
    return null;
  }
  
  const roomBookings = getUserBookings(currentUser.id);
  const foodOrders = getUserFoodOrders(currentUser.id);
  
  // Format date for display
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="my-bookings-page">
      <div className="bookings-header">
        <h1>My Bookings</h1>
      </div>
      
      <div className="bookings-tabs">
        <button 
          className={`tab-btn ${activeTab === 'roomBookings' ? 'active' : ''}`}
          onClick={() => setActiveTab('roomBookings')}
        >
          Room Bookings
        </button>
        <button 
          className={`tab-btn ${activeTab === 'foodOrders' ? 'active' : ''}`}
          onClick={() => setActiveTab('foodOrders')}
        >
          Food Orders
        </button>
      </div>
      
      <div className="bookings-content">
        {activeTab === 'roomBookings' && (
          <div className="room-bookings">
            <h2>Your Room Bookings</h2>
            
            {roomBookings.length > 0 ? (
              <div className="bookings-list">
                {roomBookings.map(booking => (
                  <div key={booking.id} className="booking-card">
                    <div className="booking-header">
                      <h3>{booking.roomName}</h3>
                      <span className={`status ${booking.status.toLowerCase()}`}>
                        {booking.status}
                      </span>
                    </div>
                    
                    <div className="booking-details">
                      <div className="booking-detail">
                        <span className="detail-label">Check-in:</span>
                        <span className="detail-value">{formatDate(booking.checkIn)}</span>
                      </div>
                      
                      <div className="booking-detail">
                        <span className="detail-label">Check-out:</span>
                        <span className="detail-value">{formatDate(booking.checkOut)}</span>
                      </div>
                      
                      <div className="booking-detail">
                        <span className="detail-label">Nights:</span>
                        <span className="detail-value">{booking.nights}</span>
                      </div>
                      
                      <div className="booking-detail">
                        <span className="detail-label">Guests:</span>
                        <span className="detail-value">{booking.guests}</span>
                      </div>
                      
                      <div className="booking-detail">
                        <span className="detail-label">Price per Night:</span>
                        <span className="detail-value">₹{booking.pricePerNight.toLocaleString()}</span>
                      </div>
                      
                      <div className="booking-detail total">
                        <span className="detail-label">Total Price:</span>
                        <span className="detail-value">₹{booking.totalPrice.toLocaleString()}</span>
                      </div>
                    </div>
                    
                    <div className="booking-footer">
                      <span className="booking-date">
                        Booked on {formatDate(booking.bookingDate)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="no-bookings">
                <p>You have no room bookings yet.</p>
                <button 
                  onClick={() => navigate('/rooms')} 
                  className="action-btn"
                >
                  Explore Rooms
                </button>
              </div>
            )}
          </div>
        )}
        
        {activeTab === 'foodOrders' && (
          <div className="food-orders">
            <h2>Your Food Orders</h2>
            
            {foodOrders.length > 0 ? (
              <div className="orders-list">
                {foodOrders.map(order => (
                  <div key={order.id} className="order-card">
                    <div className="order-header">
                      <h3>{order.foodName}</h3>
                      <span className={`status ${order.status.toLowerCase()}`}>
                        {order.status}
                      </span>
                    </div>
                    
                    <div className="order-details">
                      <div className="order-detail">
                        <span className="detail-label">Quantity:</span>
                        <span className="detail-value">{order.quantity}</span>
                      </div>
                      
                      <div className="order-detail">
                        <span className="detail-label">Price per Item:</span>
                        <span className="detail-value">₹{order.price.toLocaleString()}</span>
                      </div>
                      
                      <div className="order-detail total">
                        <span className="detail-label">Total Price:</span>
                        <span className="detail-value">₹{order.totalPrice.toLocaleString()}</span>
                      </div>
                    </div>
                    
                    <div className="order-footer">
                      <span className="order-date">
                        Ordered on {formatDate(order.orderDate)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="no-orders">
                <p>You have no food orders yet.</p>
                <button 
                  onClick={() => navigate('/food')} 
                  className="action-btn"
                >
                  Explore Menu
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default MyBookingsPage;
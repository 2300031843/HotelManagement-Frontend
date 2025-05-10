import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useBooking } from '../context/BookingContext';
import { rooms } from '../assets/data/rooms';
import { foodItems } from '../assets/data/food';
import '../styles/AdminPage.css';

function AdminPage() {
  const { currentUser, isAdmin } = useAuth();
  const { roomBookings, foodOrders } = useBooking();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('bookings');
  const [stats, setStats] = useState({
    totalRooms: 0,
    totalBookings: 0,
    totalFoodItems: 0,
    totalFoodOrders: 0,
    revenue: 0
  });
  
  useEffect(() => {
    // Calculate stats
    const revenue = calculateTotalRevenue();
    
    setStats({
      totalRooms: rooms.length,
      totalBookings: roomBookings.length,
      totalFoodItems: foodItems.length,
      totalFoodOrders: foodOrders.length,
      revenue
    });
  }, [roomBookings, foodOrders]);
  
  if (!currentUser || !isAdmin()) {
    navigate('/login');
    return null;
  }
  
  const calculateTotalRevenue = () => {
    const roomRevenue = roomBookings.reduce((total, booking) => total + booking.totalPrice, 0);
    const foodRevenue = foodOrders.reduce((total, order) => total + order.totalPrice, 0);
    return roomRevenue + foodRevenue;
  };
  
  // Format date for display
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="admin-page">
      <div className="admin-header">
        <h1>Admin Dashboard</h1>
      </div>
      
      <div className="stats-container">
        <div className="stat-card">
          <div className="stat-value">{stats.totalRooms}</div>
          <div className="stat-label">Total Rooms</div>
        </div>
        
        <div className="stat-card">
          <div className="stat-value">{stats.totalBookings}</div>
          <div className="stat-label">Room Bookings</div>
        </div>
        
        <div className="stat-card">
          <div className="stat-value">{stats.totalFoodItems}</div>
          <div className="stat-label">Food Items</div>
        </div>
        
        <div className="stat-card">
          <div className="stat-value">{stats.totalFoodOrders}</div>
          <div className="stat-label">Food Orders</div>
        </div>
        
        <div className="stat-card revenue">
          <div className="stat-value">₹{stats.revenue.toLocaleString()}</div>
          <div className="stat-label">Total Revenue</div>
        </div>
      </div>
      
      <div className="admin-tabs">
        <button 
          className={`tab-btn ${activeTab === 'bookings' ? 'active' : ''}`}
          onClick={() => setActiveTab('bookings')}
        >
          Room Bookings
        </button>
        <button 
          className={`tab-btn ${activeTab === 'orders' ? 'active' : ''}`}
          onClick={() => setActiveTab('orders')}
        >
          Food Orders
        </button>
        <button 
          className={`tab-btn ${activeTab === 'rooms' ? 'active' : ''}`}
          onClick={() => setActiveTab('rooms')}
        >
          Rooms
        </button>
        <button 
          className={`tab-btn ${activeTab === 'food' ? 'active' : ''}`}
          onClick={() => setActiveTab('food')}
        >
          Food Items
        </button>
      </div>
      
      <div className="admin-content">
        {activeTab === 'bookings' && (
          <div className="admin-bookings">
            <h2>All Room Bookings</h2>
            
            {roomBookings.length > 0 ? (
              <div className="table-container">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Booking ID</th>
                      <th>Room</th>
                      <th>Guest</th>
                      <th>Check-in</th>
                      <th>Check-out</th>
                      <th>Nights</th>
                      <th>Amount</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {roomBookings.map(booking => (
                      <tr key={booking.id}>
                        <td>{booking.id.slice(0, 8)}</td>
                        <td>{booking.roomName}</td>
                        <td>{booking.userName}</td>
                        <td>{formatDate(booking.checkIn)}</td>
                        <td>{formatDate(booking.checkOut)}</td>
                        <td>{booking.nights}</td>
                        <td>₹{booking.totalPrice.toLocaleString()}</td>
                        <td>
                          <span className={`status ${booking.status.toLowerCase()}`}>
                            {booking.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="no-data">
                <p>No room bookings yet.</p>
              </div>
            )}
          </div>
        )}
        
        {activeTab === 'orders' && (
          <div className="admin-orders">
            <h2>All Food Orders</h2>
            
            {foodOrders.length > 0 ? (
              <div className="table-container">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Order ID</th>
                      <th>Food Item</th>
                      <th>Customer</th>
                      <th>Quantity</th>
                      <th>Amount</th>
                      <th>Date</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {foodOrders.map(order => (
                      <tr key={order.id}>
                        <td>{order.id.slice(0, 8)}</td>
                        <td>{order.foodName}</td>
                        <td>{order.userName}</td>
                        <td>{order.quantity}</td>
                        <td>₹{order.totalPrice.toLocaleString()}</td>
                        <td>{formatDate(order.orderDate)}</td>
                        <td>
                          <span className={`status ${order.status.toLowerCase()}`}>
                            {order.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="no-data">
                <p>No food orders yet.</p>
              </div>
            )}
          </div>
        )}
        
        {activeTab === 'rooms' && (
          <div className="admin-rooms">
            <h2>All Rooms</h2>
            
            <div className="table-container">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Room Name</th>
                    <th>Type</th>
                    <th>Max Guests</th>
                    <th>Price/Night</th>
                  </tr>
                </thead>
                <tbody>
                  {rooms.map(room => (
                    <tr key={room.id}>
                      <td>{room.id}</td>
                      <td>{room.name}</td>
                      <td>{room.bedType}</td>
                      <td>{room.maxGuests}</td>
                      <td>₹{room.pricePerNight.toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
        
        {activeTab === 'food' && (
          <div className="admin-food">
            <h2>All Food Items</h2>
            
            <div className="table-container">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Item Name</th>
                    <th>Category</th>
                    <th>Price</th>
                  </tr>
                </thead>
                <tbody>
                  {foodItems.map(item => (
                    <tr key={item.id}>
                      <td>{item.id}</td>
                      <td>{item.name}</td>
                      <td>{item.category}</td>
                      <td>₹{item.price.toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminPage;
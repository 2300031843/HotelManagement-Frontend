import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useBooking } from '../context/BookingContext';
import '../styles/ManagerPage.css';

function ManagerPage() {
  const { currentUser, isManager } = useAuth();
  const { roomBookings, foodOrders, updateBookingStatus, updateOrderStatus } = useBooking();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('pending');
  
  if (!currentUser || !isManager()) {
    navigate('/login');
    return null;
  }
  
  const pendingBookings = roomBookings.filter(booking => booking.status === 'Pending');
  const approvedBookings = roomBookings.filter(booking => booking.status === 'Approved');
  const pendingOrders = foodOrders.filter(order => order.status === 'Pending');
  const approvedOrders = foodOrders.filter(order => order.status === 'Approved');
  
  const handleBookingAction = (bookingId, status) => {
    updateBookingStatus(bookingId, status);
  };
  
  const handleOrderAction = (orderId, status) => {
    updateOrderStatus(orderId, status);
  };
  
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="manager-page">
      <div className="manager-header">
        <h1>Manager Dashboard</h1>
      </div>
      
      <div className="manager-tabs">
        <button 
          className={`tab-btn ${activeTab === 'pending' ? 'active' : ''}`}
          onClick={() => setActiveTab('pending')}
        >
          Pending Approvals
        </button>
        <button 
          className={`tab-btn ${activeTab === 'approved' ? 'active' : ''}`}
          onClick={() => setActiveTab('approved')}
        >
          Approved Items
        </button>
      </div>
      
      <div className="manager-content">
        {activeTab === 'pending' && (
          <>
            <section className="pending-bookings">
              <h2>Pending Room Bookings</h2>
              {pendingBookings.length > 0 ? (
                <div className="table-container">
                  <table className="manager-table">
                    <thead>
                      <tr>
                        <th>Booking ID</th>
                        <th>Guest</th>
                        <th>Room</th>
                        <th>Check-in</th>
                        <th>Check-out</th>
                        <th>Amount</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {pendingBookings.map(booking => (
                        <tr key={booking.id}>
                          <td>{booking.id.slice(0, 8)}</td>
                          <td>{booking.userName}</td>
                          <td>{booking.roomName}</td>
                          <td>{formatDate(booking.checkIn)}</td>
                          <td>{formatDate(booking.checkOut)}</td>
                          <td>₹{booking.totalPrice.toLocaleString()}</td>
                          <td>
                            <button 
                              className="action-btn approve"
                              onClick={() => handleBookingAction(booking.id, 'Approved')}
                            >
                              Approve
                            </button>
                            <button 
                              className="action-btn reject"
                              onClick={() => handleBookingAction(booking.id, 'Rejected')}
                            >
                              Reject
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className="no-data">No pending room bookings</p>
              )}
            </section>
            
            <section className="pending-orders">
              <h2>Pending Food Orders</h2>
              {pendingOrders.length > 0 ? (
                <div className="table-container">
                  <table className="manager-table">
                    <thead>
                      <tr>
                        <th>Order ID</th>
                        <th>Customer</th>
                        <th>Item</th>
                        <th>Quantity</th>
                        <th>Amount</th>
                        <th>Date</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {pendingOrders.map(order => (
                        <tr key={order.id}>
                          <td>{order.id.slice(0, 8)}</td>
                          <td>{order.userName}</td>
                          <td>{order.foodName}</td>
                          <td>{order.quantity}</td>
                          <td>₹{order.totalPrice.toLocaleString()}</td>
                          <td>{formatDate(order.orderDate)}</td>
                          <td>
                            <button 
                              className="action-btn approve"
                              onClick={() => handleOrderAction(order.id, 'Approved')}
                            >
                              Approve
                            </button>
                            <button 
                              className="action-btn reject"
                              onClick={() => handleOrderAction(order.id, 'Rejected')}
                            >
                              Reject
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className="no-data">No pending food orders</p>
              )}
            </section>
          </>
        )}
        
        {activeTab === 'approved' && (
          <>
            <section className="approved-bookings">
              <h2>Approved Room Bookings</h2>
              {approvedBookings.length > 0 ? (
                <div className="table-container">
                  <table className="manager-table">
                    <thead>
                      <tr>
                        <th>Booking ID</th>
                        <th>Guest</th>
                        <th>Room</th>
                        <th>Check-in</th>
                        <th>Check-out</th>
                        <th>Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      {approvedBookings.map(booking => (
                        <tr key={booking.id}>
                          <td>{booking.id.slice(0, 8)}</td>
                          <td>{booking.userName}</td>
                          <td>{booking.roomName}</td>
                          <td>{formatDate(booking.checkIn)}</td>
                          <td>{formatDate(booking.checkOut)}</td>
                          <td>₹{booking.totalPrice.toLocaleString()}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className="no-data">No approved room bookings</p>
              )}
            </section>
            
            <section className="approved-orders">
              <h2>Approved Food Orders</h2>
              {approvedOrders.length > 0 ? (
                <div className="table-container">
                  <table className="manager-table">
                    <thead>
                      <tr>
                        <th>Order ID</th>
                        <th>Customer</th>
                        <th>Item</th>
                        <th>Quantity</th>
                        <th>Amount</th>
                        <th>Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {approvedOrders.map(order => (
                        <tr key={order.id}>
                          <td>{order.id.slice(0, 8)}</td>
                          <td>{order.userName}</td>
                          <td>{order.foodName}</td>
                          <td>{order.quantity}</td>
                          <td>₹{order.totalPrice.toLocaleString()}</td>
                          <td>{formatDate(order.orderDate)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className="no-data">No approved food orders</p>
              )}
            </section>
          </>
        )}
      </div>
    </div>
  );
}

export default ManagerPage;
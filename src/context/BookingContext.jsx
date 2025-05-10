import { createContext, useContext, useState, useEffect } from 'react';

const BookingContext = createContext();

export function useBooking() {
  return useContext(BookingContext);
}

export function BookingProvider({ children }) {
  const [roomBookings, setRoomBookings] = useState([]);
  const [foodOrders, setFoodOrders] = useState([]);

  useEffect(() => {
    // Load bookings from localStorage on initialization
    const storedRoomBookings = localStorage.getItem('roomBookings');
    const storedFoodOrders = localStorage.getItem('foodOrders');
    
    if (storedRoomBookings) {
      setRoomBookings(JSON.parse(storedRoomBookings));
    }
    
    if (storedFoodOrders) {
      setFoodOrders(JSON.parse(storedFoodOrders));
    }
  }, []);

  const bookRoom = (booking) => {
    const newBooking = { ...booking, status: 'Pending' };
    const newBookings = [...roomBookings, newBooking];
    setRoomBookings(newBookings);
    localStorage.setItem('roomBookings', JSON.stringify(newBookings));
    return newBooking;
  };

  const orderFood = (order) => {
    const newOrder = { ...order, status: 'Pending' };
    const newOrders = [...foodOrders, newOrder];
    setFoodOrders(newOrders);
    localStorage.setItem('foodOrders', JSON.stringify(newOrders));
    return newOrder;
  };

  const updateBookingStatus = (bookingId, status) => {
    const newBookings = roomBookings.map(booking =>
      booking.id === bookingId ? { ...booking, status } : booking
    );
    setRoomBookings(newBookings);
    localStorage.setItem('roomBookings', JSON.stringify(newBookings));
  };

  const updateOrderStatus = (orderId, status) => {
    const newOrders = foodOrders.map(order =>
      order.id === orderId ? { ...order, status } : order
    );
    setFoodOrders(newOrders);
    localStorage.setItem('foodOrders', JSON.stringify(newOrders));
  };

  const getUserBookings = (userId) => {
    return roomBookings.filter(booking => booking.userId === userId);
  };

  const getUserFoodOrders = (userId) => {
    return foodOrders.filter(order => order.userId === userId);
  };

  const value = {
    roomBookings,
    foodOrders,
    bookRoom,
    orderFood,
    updateBookingStatus,
    updateOrderStatus,
    getUserBookings,
    getUserFoodOrders
  };

  return (
    <BookingContext.Provider value={value}>
      {children}
    </BookingContext.Provider>
  );
}
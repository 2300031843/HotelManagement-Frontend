import { useState } from 'react';
import { rooms } from '../assets/data/rooms';
import RoomCard from '../components/RoomCard';
import '../styles/RoomsPage.css';

function RoomsPage() {
  const [filteredRooms, setFilteredRooms] = useState(rooms);
  const [priceFilter, setPriceFilter] = useState('all');
  const [guestFilter, setGuestFilter] = useState('all');

  const applyFilters = () => {
    let result = [...rooms];
    
    // Apply price filter
    if (priceFilter !== 'all') {
      const [min, max] = priceFilter.split('-').map(Number);
      result = result.filter(room => {
        if (max) {
          return room.pricePerNight >= min && room.pricePerNight <= max;
        } else {
          return room.pricePerNight >= min;
        }
      });
    }
    
    // Apply guest filter
    if (guestFilter !== 'all') {
      const guests = Number(guestFilter);
      result = result.filter(room => room.maxGuests >= guests);
    }
    
    setFilteredRooms(result);
  };

  const handlePriceChange = (e) => {
    setPriceFilter(e.target.value);
  };

  const handleGuestChange = (e) => {
    setGuestFilter(e.target.value);
  };

  const resetFilters = () => {
    setPriceFilter('all');
    setGuestFilter('all');
    setFilteredRooms(rooms);
  };

  return (
    <div className="rooms-page">
      <div className="rooms-header">
        <h1>Our Rooms</h1>
        <p>Discover comfort and luxury in our carefully designed accommodations</p>
      </div>
      
      <div className="rooms-container">
        <div className="filters-section">
          <h3>Filter Rooms</h3>
          
          <div className="filter-group">
            <label htmlFor="price-filter">Price Range (₹):</label>
            <select 
              id="price-filter" 
              value={priceFilter} 
              onChange={handlePriceChange}
              className="filter-select"
            >
              <option value="all">All Prices</option>
              <option value="0-5000">Less than ₹5,000</option>
              <option value="5000-8000">₹5,000 - ₹8,000</option>
              <option value="8000-10000">₹8,000 - ₹10,000</option>
              <option value="10000">Above ₹10,000</option>
            </select>
          </div>
          
          <div className="filter-group">
            <label htmlFor="guest-filter">Guests:</label>
            <select 
              id="guest-filter" 
              value={guestFilter} 
              onChange={handleGuestChange}
              className="filter-select"
            >
              <option value="all">Any</option>
              <option value="1">1+</option>
              <option value="2">2+</option>
              <option value="3">3+</option>
              <option value="4">4+</option>
            </select>
          </div>
          
          <div className="filter-buttons">
            <button className="filter-btn apply-btn" onClick={applyFilters}>
              Apply Filters
            </button>
            <button className="filter-btn reset-btn" onClick={resetFilters}>
              Reset
            </button>
          </div>
        </div>
        
        <div className="rooms-list">
          {filteredRooms.length > 0 ? (
            filteredRooms.map(room => (
              <RoomCard key={room.id} room={room} />
            ))
          ) : (
            <div className="no-rooms">
              <p>No rooms match your current filters.</p>
              <button className="filter-btn reset-btn" onClick={resetFilters}>
                Reset Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default RoomsPage;
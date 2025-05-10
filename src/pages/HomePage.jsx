import { Link } from 'react-router-dom';
import { rooms } from '../assets/data/rooms';
import { foodItems } from '../assets/data/food';
import RoomCard from '../components/RoomCard';
import FoodItem from '../components/FoodItem';
import '../styles/HomePage.css';

function HomePage() {
  // Get featured rooms (first 3)
  const featuredRooms = rooms.slice(0, 3);
  // Get featured food items (first 3)
  const featuredFood = foodItems.slice(0, 3);

  return (
    <div className="home-page">
      <section className="hero-section">
        <div className="hero-content">
          <h1>Welcome to Hotel Grand</h1>
          <p>Experience luxury and comfort in the heart of the city</p>
          <Link to="/rooms" className="btn-primary">Explore Rooms</Link>
        </div>
      </section>

      <section className="featured-section">
        <div className="section-header">
          <h2>Featured Rooms</h2>
          <Link to="/rooms" className="view-all-link">View All Rooms</Link>
        </div>
        <div className="featured-rooms">
          {featuredRooms.map(room => (
            <RoomCard key={room.id} room={room} />
          ))}
        </div>
      </section>

      <section className="about-section">
        <div className="about-content">
          <h2>About Hotel Grand</h2>
          <p>
            Located in the heart of the city, Hotel Grand offers the perfect blend of luxury, comfort, and convenience. Our elegantly designed rooms, world-class amenities, and exceptional service ensure a memorable stay for all our guests.
          </p>
          <p>
            Whether you're traveling for business or pleasure, our dedicated team is committed to making your stay as comfortable and enjoyable as possible.
          </p>
        </div>
      </section>

      <section className="featured-section">
        <div className="section-header">
          <h2>Featured Cuisines</h2>
          <Link to="/food" className="view-all-link">View Full Menu</Link>
        </div>
        <div className="featured-food">
          {featuredFood.map(item => (
            <FoodItem key={item.id} item={item} showOrderForm={false} />
          ))}
        </div>
      </section>

      <section className="cta-section">
        <div className="cta-content">
          <h2>Ready to book your stay?</h2>
          <p>Enjoy exclusive benefits by booking directly with us.</p>
          <Link to="/rooms" className="btn-primary">Book Now</Link>
        </div>
      </section>
    </div>
  );
}

export default HomePage;
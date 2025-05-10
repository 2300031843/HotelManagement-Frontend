import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/Navbar.css';

function Navbar() {
  const { currentUser, logout, isAdmin, isManager } = useAuth();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          HOTEL GRAND
        </Link>
        
        <div className="menu-icon" onClick={toggleMenu}>
          <i className={menuOpen ? 'fas fa-times' : 'fas fa-bars'}>
            {menuOpen ? '✕' : '☰'}
          </i>
        </div>
        
        <ul className={menuOpen ? 'nav-menu active' : 'nav-menu'}>
          <li className="nav-item">
            <Link 
              to="/" 
              className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
              onClick={() => setMenuOpen(false)}
            >
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link 
              to="/rooms" 
              className={`nav-link ${location.pathname === '/rooms' ? 'active' : ''}`}
              onClick={() => setMenuOpen(false)}
            >
              Rooms
            </Link>
          </li>
          <li className="nav-item">
            <Link 
              to="/food" 
              className={`nav-link ${location.pathname === '/food' ? 'active' : ''}`}
              onClick={() => setMenuOpen(false)}
            >
              Food
            </Link>
          </li>
          <li className="nav-item">
            <Link 
              to="/services" 
              className={`nav-link ${location.pathname === '/services' ? 'active' : ''}`}
              onClick={() => setMenuOpen(false)}
            >
              Services
            </Link>
          </li>
          {isAdmin() && (
            <li className="nav-item">
              <Link 
                to="/admin" 
                className={`nav-link ${location.pathname === '/admin' ? 'active' : ''}`}
                onClick={() => setMenuOpen(false)}
              >
                Admin
              </Link>
            </li>
          )}
          {isManager() && (
            <li className="nav-item">
              <Link 
                to="/manager" 
                className={`nav-link ${location.pathname === '/manager' ? 'active' : ''}`}
                onClick={() => setMenuOpen(false)}
              >
                Manager
              </Link>
            </li>
          )}
          {currentUser ? (
            <>
              <li className="nav-item">
                <Link 
                  to="/my-bookings" 
                  className={`nav-link ${location.pathname === '/my-bookings' ? 'active' : ''}`}
                  onClick={() => setMenuOpen(false)}
                >
                  My Bookings
                </Link>
              </li>
              <li className="nav-item">
                <button 
                  className="nav-link btn-logout"
                  onClick={() => {
                    logout();
                    setMenuOpen(false);
                  }}
                >
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li className="nav-item">
                <Link 
                  to="/login" 
                  className={`nav-link ${location.pathname === '/login' ? 'active' : ''}`}
                  onClick={() => setMenuOpen(false)}
                >
                  Login
                </Link>
              </li>
              <li className="nav-item">
                <Link 
                  to="/register" 
                  className={`nav-link ${location.pathname === '/register' ? 'active' : ''}`}
                  onClick={() => setMenuOpen(false)}
                >
                  Register
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
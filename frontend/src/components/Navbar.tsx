import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import './Navbar.css';

function Navbar() {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  return (
    <header className="rh-navbar">
      <div className="rh-navbar-inner">
        <Link to="/" className="rh-brand">
          <span className="rh-brand-icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" width="22" height="22" fill="none">
              <path
                d="M3 11.5 12 4l9 7.5V20a1 1 0 0 1-1 1h-5v-6h-6v6H4a1 1 0 0 1-1-1v-8.5Z"
                fill="currentColor"
              />
            </svg>
          </span>
          <span className="rh-brand-text">Ethiopian Rentals</span>
        </Link>

        <nav className="rh-links" aria-label="Main">
          <a href="/#rentals">Properties</a>
          <a href="/#about">About</a>
        </nav>

        <div className="rh-actions">
          {isAuthenticated ? (
            <button className="rh-btn rh-btn-ghost" onClick={handleLogout}>
              Log out
            </button>
          ) : (
            <>
              <Link to="/login" className="rh-btn rh-btn-text">
                Log in
              </Link>
              <Link to="/register" className="rh-btn rh-btn-primary">
                Sign up
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

export default Navbar;
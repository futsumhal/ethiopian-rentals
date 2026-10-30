import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import "./Footer.css";

function Footer() {
  const { isAuthenticated } = useAuth();

  return (
    <footer className="rh-footer">
      <div className="rh-footer-inner">
        <div className="rh-footer-brand">
          <Link to="/" className="rh-footer-logo">
            Ethiopian Rentals
          </Link>
          <p>
            Houses, apartments and rooms for rent in Addis Ababa. Find a place
            and call the owner directly.
          </p>
        </div>

        <div className="rh-footer-col">
          <h4>Explore</h4>
          <a href="/#rentals">Properties</a>
          <a href="/#about">About</a>
        </div>

        <div className="rh-footer-col">
          <h4>Account</h4>
          {isAuthenticated ? (
            <span className="rh-footer-muted">You are logged in</span>
          ) : (
            <>
              <Link to="/login">Log in</Link>
              <Link to="/register">Sign up</Link>
            </>
          )}
        </div>
      </div>

      <div className="rh-footer-bottom">
        © {new Date().getFullYear()} Ethiopian Rentals. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
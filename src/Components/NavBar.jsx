import { NavLink } from "react-router-dom";
import "./Navbar.css"; // custom css

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo */}
        <div className="navbar-logo">
          <div className="logo-icon">
            <span>⚖️</span>
          </div>
          <span className="logo-text">LegalAI Assistant</span>
        </div>

        {/* Navigation Links */}
        <div className="navbar-links">
          <NavLink to="/" className="nav-link">
            Home
          </NavLink>
          <NavLink to="/search" className="nav-link">
            Legal Search
          </NavLink>
          <NavLink to="/chat" className="nav-link">
            AI Chat
          </NavLink>
          <NavLink to="/research" className="nav-link">
            Research Agent
          </NavLink>
          <NavLink to="/resources" className="nav-link">
            Resources
          </NavLink>
        </div>
      </div>
    </nav>
  );
}

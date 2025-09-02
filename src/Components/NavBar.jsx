import React from 'react';
import '../Styles/NavBar.css'; 
import { Link } from 'react-router-dom';

function NavBar() {
  return (
    <div className="Nav-Bar">
      <Link><div className="Logo">LAW AI AGENT</div></Link>
      <ul className="Nav-Links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/legalsearch">Legal Search</Link></li>
        <li><Link to="/aichat">AI Chat</Link></li>
        <li><Link to="/researchagent">Research Agent</Link></li>
        <li><Link to="/resources">Resources</Link></li>
      </ul>
      <div className="User-Options">
        <button className="Login-Button">Login</button>
        <button className="Signup-Button">Sign Up</button>
      </div>

    </div>
  );
}

export default NavBar;

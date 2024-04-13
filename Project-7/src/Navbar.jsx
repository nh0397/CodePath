import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; // Assuming you will create a Navbar.css for styles

function Navbar() {
  return (
    <nav className="navbar">
      <ul className="nav-links">
        <li>
          <Link to="/" className="nav-item">Home</Link>
        </li>
        <li>
          <Link to="/create" className="nav-item">Create a Crewmate</Link>
        </li>
        <li>
          <Link to="/crewmates" className="nav-item">View Crewmates</Link>
        </li>
        {/* Add more navigation items as needed */}
      </ul>
    </nav>
  );
}

export default Navbar;

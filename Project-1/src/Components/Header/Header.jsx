// Header.jsx

import React from 'react';
import './Header.css'; // Import the CSS file
import logo from '../../assets/logo.svg'
const Header = () => {
  return (
    <header className="header">
      <div className="logo">
        <div className='text'>
            CricketRealm 
        </div>
        <div>
      <img src={logo} className='svg'/>
      </div>
      </div>
      <nav className="nav">
        <ul>
          <li><a href="/">Home</a></li>
          <li><a href="/scores">Scores</a></li>
          <li><a href="/news">News</a></li>
          <li><a href="/stats">Statistics</a></li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;

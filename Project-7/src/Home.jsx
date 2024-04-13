import React from 'react';
import { Link } from 'react-router-dom';
import './App.css'; // App.css is used for general styling across your app

function Home() {
  return (
    <div className="home-container">
      <h1>Welcome to the Crewmate Management System</h1>
      <nav className="navigation">
        <Link to="/create" className="nav-link">Create a Crewmate</Link>
        {/* Include other links as needed */}
      </nav>
    </div>
  );
}

export default Home;

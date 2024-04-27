import React, { useState, useEffect } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import './Navbar.css';
import logo from '../../assets/logo.webp';

function Navbar() {
    const [searchTerm, setSearchTerm] = useState('');
    const [activeTab, setActiveTab] = useState(null);
    const [isModalOpen, setModalOpen] = useState(false);
    const userFirstName = sessionStorage.getItem('firstName') || 'First';  // Default value as placeholder
    const userLastName = sessionStorage.getItem('lastName') || 'Last';  // Default value as placeholder
    const userRole = sessionStorage.getItem('role');
    const navigate = useNavigate();
    function getInitials(firstName, lastName) {
    return `${firstName[0]}${lastName[0]}`;
}

    useEffect(() => {
        // Fetch user data if needed or handle post-login actions
    }, []);

     const handleLogout = () => {
        sessionStorage.clear();  // Clear the session storage
        navigate('/');  // Use navigate to redirect to the homepage
    };


    const initials = getInitials(userFirstName, userLastName);

    return (
        <div className="navbar-container">
            <div className="navbar-left">
                <Link to="/home" className="home-link">
                    <div>
                        <img src={logo} alt="App Logo" className="app-logo" />
                    </div>
                    <div className='app-name'>
                        Discussion Forum  {/* Title next to logo */}    
                    </div>
                </Link>
            </div>
            <div className="navbar-right">
                <div className="user-info">
                    <div className="initials-icon">
                        {initials}
                    </div>
                    <span className="username">{userFirstName}</span>
                    <span className="role">{userRole}</span>
                </div>
                <button onClick={handleLogout} className="logout-button">Logout</button>
            </div>
        </div>
    );
}

export default Navbar;

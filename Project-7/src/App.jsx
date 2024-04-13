import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Home';
import CreateCrewmate from './CreateCrewmate';
import CrewmateDetails from './CrewmateDetails';
import Navbar from './Navbar'; 
import CrewmateList from './CrewmateList';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Navbar /> {/* Include the Navbar */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<CreateCrewmate />} />
        <Route path="/crewmate/:id" element={<CrewmateDetails />} />
        <Route path="/crewmates" element={<CrewmateList />} />  
      </Routes>
    </BrowserRouter>
  );
}

export default App;

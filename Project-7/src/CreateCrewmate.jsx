import React, { useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import './App.css'; // Assuming this is where you want to import your styles from
import './CreateCrewmate.css'; // Import your CSS styles here

// Initialize Supabase client
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

function CreateCrewmate() {
  const [name, setName] = useState('');
  const [speed, setSpeed] = useState('');
  const [color, setColor] = useState('');
  const [showPopup, setShowPopup] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    // Assuming your table has columns 'name', 'speed', and 'color'
    const { data, error } = await supabase
      .from('crewmates')
      .insert([{ name, speed: parseFloat(speed), color }]);
    
    if (error) {
      console.error('Error:', error);
    } else {
      // Reset form fields
      setName('');
      setSpeed('');
      setColor('');
      
      // Show popup message
      setShowPopup(true);
      setTimeout(() => {
        setShowPopup(false);
      }, 3000);
      
    }
  };

 return (
    <form onSubmit={handleSubmit} className="create-crewmate-form">
      <div className="form-group">
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} required />
      </div>
      <div className="form-group">
        <label htmlFor="speed">Speed (mph):</label>
        <input type="number" id="speed" value={speed} onChange={(e) => setSpeed(e.target.value)} required />
      </div>
      <div className="form-group">
        <label htmlFor="color">Color:</label>
        <select id="color" value={color} onChange={(e) => setColor(e.target.value)} required>
          <option value="">Select Color</option>
          <option value="red">Red</option>
          <option value="green">Green</option>
          <option value="blue">Blue</option>
          <option value="purple">Purple</option>
          <option value="yellow">Yellow</option>
          <option value="orange">Orange</option>
          <option value="pink">Pink</option>
          <option value="rainbow">Rainbow</option>
        </select>
      </div>
      <div className="form-group">
        <button type="submit">Create Crewmate</button>
      </div>
    </form>
  );
}

export default CreateCrewmate;

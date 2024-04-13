import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { createClient } from '@supabase/supabase-js';
import './CrewmateDetails.css'; // Ensure this CSS file exists and is styled as you like

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL, 
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

function CrewmateDetails() {
  const { id } = useParams();
  const [crewmate, setCrewmate] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  // Assuming your crewmate object has these properties
  const [editedName, setEditedName] = useState('');
  const [editedSpeed, setEditedSpeed] = useState('');
  const [editedColor, setEditedColor] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchCrewmateDetails();
  }, [id]);

  const fetchCrewmateDetails = async () => {
    const { data, error } = await supabase
      .from('crewmates')
      .select('*')
      .eq('id', id)
      .single();
    if (error) {
      console.error('Error fetching crewmate details', error);
    } else {
      setCrewmate(data);
      // Set the form fields with existing values
      setEditedName(data.name);
      setEditedSpeed(data.speed);
      setEditedColor(data.color);
    }
  };

  // Other handlers remain unchanged...
 const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
  };
   const handleDelete = async () => {
    const { error } = await supabase
      .from('crewmates')
      .delete()
      .match({ id });
    if (error) {
      console.error('Error deleting crewmate:', error);
    } else {
      navigate('/crewmates'); 
    }
  };

  const saveEdit = async (e) => {
    e.preventDefault();
    const { error } = await supabase
      .from('crewmates')
      .update({
        name: editedName,
        speed: parseFloat(editedSpeed),
        color: editedColor
      })
      .eq('id', id);

    if (error) {
      console.error('Error updating crewmate:', error);
    } else {
      setIsEditing(false);
      fetchCrewmateDetails();
    }
  };

  // The edit form including the dropdown for the color attribute
  const renderEditForm = () => (
    <form onSubmit={saveEdit} className="edit-form">
      <input
        type="text"
        value={editedName}
        onChange={(e) => setEditedName(e.target.value)}
      />
      <input
        type="number"
        value={editedSpeed}
        onChange={(e) => setEditedSpeed(e.target.value)}
      />
      <select
        value={editedColor}
        onChange={(e) => setEditedColor(e.target.value)}
      >
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
      <button type="submit">Save Changes</button>
      <button type="button" onClick={() => setIsEditing(false)}>Cancel</button>
    </form>
  );

  // The render function for viewing details
  const renderCrewmateDetails = () => (
    <>
      <h1>{crewmate.name}</h1>
      <p>Speed: {crewmate.speed}</p>
      <p>Color: {crewmate.color}</p>
      <button onClick={handleEdit}>Edit</button>
      <button onClick={handleDelete}>Delete</button>
      <button onClick={() => navigate(-1)}>Go Back</button>
    </>
  );

  if (!crewmate) return <p>Loading crewmate details...</p>;

  return (
    <div className="crewmate-details-container">
      {isEditing ? renderEditForm() : renderCrewmateDetails()}
    </div>
  );
}

export default CrewmateDetails;

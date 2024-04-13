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
    }
  };

  const handleDelete = async () => {
    const { error } = await supabase
      .from('crewmates')
      .delete()
      .match({ id });
    if (error) {
      console.error('Error deleting crewmate:', error);
    } else {
      navigate('/crewmates'); // Navigate to the list of crewmates
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const saveEdit = async (e) => {
    e.preventDefault();
    // Assuming you have state hooks for each editable field similar to useState
    const { error } = await supabase
      .from('crewmates')
      .update({
        name: crewmate.name,
        speed: crewmate.speed,
        color: crewmate.color,
        role: crewmate.role,
        strength: crewmate.strength
      })
      .match({ id });
    
    if (error) {
      console.error('Error updating crewmate:', error);
    } else {
      setIsEditing(false);
      fetchCrewmateDetails(); // Re-fetch the crewmate details to show updated info
    }
  };

  if (!crewmate) {
    return <p>Loading crewmate details...</p>;
  }

  return (
    <div className="crewmate-details-container">
      {isEditing ? (
        <form onSubmit={saveEdit} className="edit-form">
          {/* Create form inputs for each field you want to be editable */}
          <button type="submit">Save Changes</button>
          <button type="button" onClick={() => setIsEditing(false)}>Cancel</button>
        </form>
      ) : (
        <>
          <h1>{crewmate.name}</h1>
          <p>Speed: {crewmate.speed} mph</p>
          <p>Color: {crewmate.color}</p>
          <p>Role: {crewmate.role}</p>
          <p>Strength: {crewmate.strength}</p>
          <button onClick={handleEdit}>Edit</button>
          <button onClick={handleDelete}>Delete</button>
          <button onClick={() => navigate(-1)}>Go Back</button>
        </>
      )}
    </div>
  );
}

export default CrewmateDetails;
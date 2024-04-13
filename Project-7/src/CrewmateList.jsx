import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createClient } from '@supabase/supabase-js';
import './CrewmateList.css'; // Assuming you have this file for styles

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL, 
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

function CrewmateList() {
  const [crewmates, setCrewmates] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCrewmates();
  }, []);

  const fetchCrewmates = async () => {
    const { data, error } = await supabase
      .from('crewmates')
      .select('*');
    if (error) {
      console.error('Error fetching crewmates:', error);
    } else {
      setCrewmates(data);
    }
  };

  return (
    <div className="crewmate-list-container">
      <h2 className="crewmate-list-title">Crewmate List</h2>
      <ul className="crewmate-list">
        {crewmates.map(crewmate => (
          <li key={crewmate.id} 
              className="crewmate-item"
              onClick={() => navigate(`/crewmate/${crewmate.id}`)}>
            {crewmate.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CrewmateList;

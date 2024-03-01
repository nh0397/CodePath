import React from 'react';
import './Cards.css';

const Cards = (props) => {
  const { data } = props; // Destructure the data prop

  // Function to handle card click
  const handleCardClick = () => {
    // Define the URL to navigate to
    const url = 'https://www.espncricinfo.com/series/women-s-premier-league-2023-24-1411373/gujarat-giants-women-vs-up-warriorz-women-8th-match-1417723/live-cricket-score'; // Dummy URL

    // Navigate to the URL
    window.location.href = url;
  };

  return (
    <div className='container'>
      {/* Wrap the card inside a button with onClick event handler */}
      <button className='card' onClick={handleCardClick}>
        <div className='match-details'>
          <div className='series-name'>{data.series_name}</div>
          <div className='teams'>
            <div className='team'>
              {data.team1} ({data.team1_score}/{data.team1_wickets} - {data.team1_overs} overs)
            </div>
            <div className='versus'>vs</div>
            <div className='team'>
              {data.team2} ({data.team2_score}/{data.team2_wickets} - {data.team2_overs} overs)
            </div>
          </div>
          <div className='result'>{data.result}</div>
        </div>
      </button>
    </div>
  );
}

export default Cards;

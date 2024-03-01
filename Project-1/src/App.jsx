import React from 'react';
import './App.css';
import Header from './Components/Header/Header';
import Cards from './Components/cards/Cards';
import data from '../data';

function App() {
  return (
    <div className='app'>
      <Header />
      <div className='body'>
        {data.map((card, index) => (
          <Cards key={index} data={card} />
        ))}
      </div>
    </div>
  );
}

export default App;

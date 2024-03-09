import React, { useState } from 'react';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // Requires a loader
import './App.css'; // Make sure the path is correct
import FlipCard from './components/FlipCard/FlipCard';
import data from '../data';

function App() {
    const cards = Array.from({ length: 10 }, (_, i) => i + 1); // Create an array from 1 to 10

    return (
        <div className='app'>
            <div className='body'>
                <div className='header'>
                    Guess Who?
                </div>
                <Carousel>
                    {data.map(card => (
                        <FlipCard  name={card.name} img_url={card.photo} hint={card.hint} />
                    ))}
                </Carousel>
                <div className='header'>
                    Flip to see the answer!
                </div>
            </div>
        </div>  
    );
}

export default App;

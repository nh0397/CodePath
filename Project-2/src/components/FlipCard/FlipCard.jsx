
import React, { useState } from 'react';
import './FlipCard.css'; 

const FlipCard = (props) => {
    const [flipped, setFlipped] = useState(false);
    console.log('props', props)
    return (
        <div className={`flip-card ${flipped ? 'flipped' : ''}`} onClick={() => setFlipped(!flipped)}>
            <div className="flip-card-inner">
                <div className="flip-card-front">
                    <img src={props.img_url} alt={props.name} />
                </div>
                <div className="flip-card-back">
                    <div>
                        <h3>Player's Name is:</h3>
                    </div>
                    <div>
                        <h1>{props.name}</h1>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FlipCard;

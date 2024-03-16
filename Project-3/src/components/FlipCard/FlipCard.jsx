import React, { useState } from 'react';
import './FlipCard.css'; // Make sure the path to your CSS file is correct

const FlipCard = ({ name, img_url, hint, onGuess, shuffleCards, currentIndex, dataLength}) => {
    const [guess, setGuess] = useState('');
    const [flipped, setFlipped] = useState(false);
    const [feedback, setFeedback] = useState('');

    const handleInputChange = (e) => {
        setGuess(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent form submission from reloading the page
        const isCorrect = guess.toLowerCase() === name.toLowerCase();
        onGuess(isCorrect); // Inform the parent component about the guess result

        if (isCorrect) {
            setFlipped(true); // Flip the card if the guess is correct
            // Reset the input field. The feedback is not shown if the guess is correct.
            setGuess('');
        } else {
            setFeedback('Incorrect, try again!'); // Provide feedback for incorrect guesses
            // Reset the input field even if the guess is incorrect.
            setGuess('');
        }

    };

    return (
        <div className={`flip-card ${flipped ? 'flipped' : ''}`}>
            <div className="flip-card-inner">
                <div className="flip-card-front">
                    <div className='innerDiv'>
                        <img src={img_url} alt={name} />
                    </div>
                    <h2 className='hint-text'>Hint: {hint}</h2>
                    <input 
                        type="text" 
                        onChange={handleInputChange} 
                        value={guess} 
                        placeholder="Enter your guess"
                    />
                    <button className='submitButton' onClick={handleSubmit}>Submit</button>
                     {currentIndex < 9 && (
                        <button className='submitButton' onClick={shuffleCards}>Shuffle</button>
                    )}
                    {/* Only display feedback if the guess was incorrect */}
                    {feedback && <div className="feedback">{feedback}</div>}
                </div>
                <div className="flip-card-back" onClick={() => setFlipped(false)}>
                    <h3>You are right! It is:</h3>
                    <h1>{name}</h1>
                </div>
            </div>
        </div>
    );
};

export default FlipCard;

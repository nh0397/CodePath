import React, { useState } from 'react';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import './App.css';
import FlipCard from './components/FlipCard/FlipCard';
import originalData from '../data'; // Adjust according to your project structure

function App() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [streak, setStreak] = useState(0);
    const [data, setData] = useState([...originalData]); // Use a state for data to shuffle

    const handleGuessResult = (isCorrect) => {
        if (isCorrect) {
            setStreak(prevStreak => prevStreak + 1);
            setTimeout(() => {
                const nextIndex = currentIndex + 1 < data.length ? currentIndex + 1 : currentIndex;
                setCurrentIndex(nextIndex);
            }, 2000);
        } else {
            setStreak(0);
        }
    };

    const shuffleRemainingCards = () => {
        const remainingCards = data.slice(currentIndex + 1);
        remainingCards.sort(() => Math.random() - 0.5);
        const newData = [...data.slice(0, currentIndex + 1), ...remainingCards];
        setData(newData);
    };

    return (
        <div className='app'>
            <div className='body'>
                <div className='header'>Guess Who?</div>
                <Carousel 
                    selectedItem={currentIndex}
                    onChange={(index) => setCurrentIndex(index)}
                    showArrows={true} 
                    showThumbs={false}
                    showStatus={false}
                    showIndicators={false}
                    useKeyboardArrows
                >
                    {data.map((card, index) => (
                        <FlipCard
                            currentIndex={currentIndex}
                            dataLength={data.length}
                            key={card.name} // Consider using a more unique identifier
                            name={card.name}
                            img_url={card.photo}
                            hint={card.hint}
                            onGuess={handleGuessResult}
                            shuffleCards={shuffleRemainingCards} // Pass the shuffle function as a prop
                        />
                    ))}
                </Carousel>
                <div className='status-bar'>
                    <div className='card-count'>Card {currentIndex + 1} of {data.length}</div>
                    <div className='current-streak'>Current Streak: {streak}</div>
                </div>
            </div>
        </div>
    );
}

export default App;

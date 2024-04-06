import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Posts.css'; // Make sure to create this CSS file in the same directory
import { Bar, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';

// Register the chart components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);



const Posts = () => {
    const [pokemon, setPokemon] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filter, setFilter] = useState('all');
    const [currentPage, setCurrentPage] = useState(1);
    const [pokemonPerPage] = useState(10);

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=150');
            const data = await response.json();
            const pokemonList = data.results.map((pokemon, index) => ({
                id: index + 1,
                name: pokemon.name,
                imageUrl: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index + 1}.png`,
                weight: Math.floor(Math.random() * 200) + 1, // Random weight between 1 and 200
                age: Math.floor(Math.random() * 30) + 1 // Random age between 1 and 30
            }));
            setPokemon(pokemonList);
        };
        fetchData();
    }, []);

const topWeightPokemon = [...pokemon].sort((a, b) => b.weight - a.weight).slice(0, 10);
const topAgePokemon = [...pokemon].sort((a, b) => b.age - a.age).slice(0, 10);

const weightData = {
    labels: topWeightPokemon.map(p => p.name),
    datasets: [
        {
            label: 'Top 10 Pokémon by Weight',
            data: topWeightPokemon.map(p => p.weight),
            backgroundColor: 'rgba(0, 123, 255, 0.5)',
        },
    ],
};

const ageDataHorizontal = {
    labels: topAgePokemon.map(p => p.name),
    datasets: [
        {
            label: 'Top 10 Pokémon by Age',
            data: topAgePokemon.map(p => p.age),
            backgroundColor: 'rgba(75, 192, 192, 0.5)',
        },
    ],
};

const optionsHorizontal = {
    indexAxis: 'y', // This will make the chart horizontal
    responsive: true,
    plugins: {
        legend: {
            position: 'top',
        },
        title: {
            display: true,
            text: 'Top 10 Pokémon by Age',
        },
    },
};

const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top',
        },
        title: {
            display: true,
            text: 'Chart',
        },
    },
};

    const filteredPokemon = pokemon.filter(pokemon =>
        pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
    ).filter(pokemon => {
        if (filter === 'short') return pokemon.name.length < 6;
        if (filter === 'long') return pokemon.name.length >= 6;
        return true;
    });

    const indexOfLastPokemon = currentPage * pokemonPerPage;
    const indexOfFirstPokemon = indexOfLastPokemon - pokemonPerPage;
    const currentPokemon = filteredPokemon.slice(indexOfFirstPokemon, indexOfLastPokemon);

    const paginate = pageNumber => setCurrentPage(pageNumber);

    return (
        <div className="pokeBoard">
            <h1>Poke Board</h1>
            <div className="filters">
                <input
                    type="text"
                    placeholder="Search Pokémon..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="searchInput"
                />
                <div className="filterButtons">
                    <button onClick={() => setFilter('all')}>All</button>
                    <button onClick={() => setFilter('short')}>Short Names</button>
                    <button onClick={() => setFilter('long')}>Long Names</button>
                </div>
            </div>
            <div className="posts">
                {currentPokemon.map(pokemon => (
                    <Link key={pokemon.id} to={`/detail/${pokemon.id}`} className="post">
                        <div>
                            <img src={pokemon.imageUrl} alt={pokemon.name} className="pokemonImage" />
                            <h3>{pokemon.name}</h3>
                            <p className="details">Weight: {pokemon.weight} kg</p>
                            <p className="details">Age: {pokemon.age} years</p>
                        </div>
                    </Link>
                ))}
            </div>
            <div className="pagination">
                {Array.from({ length: Math.ceil(filteredPokemon.length / pokemonPerPage) }, (_, index) => (
                    <button key={index + 1} onClick={() => paginate(index + 1)}>{index + 1}</button>
                ))}
            </div>
            <div className="charts">
                <div className="bar-chart" style={{ width: '500px', height: '220px' }}>
                    <Bar data={weightData} options={options} />
                </div>
                <div className="horizontal-bar-chart"style={{ width: '500px', height: '220px' }}>
                    <Bar data={ageDataHorizontal} options={optionsHorizontal} />
                </div>
            </div>
        </div>
    );
};

export default Posts;

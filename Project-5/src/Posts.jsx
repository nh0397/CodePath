import React, { useState, useEffect } from 'react';
import './Posts.css'; // Make sure to create this CSS file in the same directory

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

    const weights = currentPokemon.map(pokemon => pokemon.weight);
    const ages = currentPokemon.map(pokemon => pokemon.age);

    const totalPokemon = filteredPokemon.length;
    const totalWeight = weights.reduce((acc, weight) => acc + weight, 0);
    const totalAge = ages.reduce((acc, age) => acc + age, 0);
    const meanWeight = totalWeight / totalPokemon || 0;
    const meanAge = totalAge / totalPokemon || 0;
    const sortedWeights = [...weights].sort((a, b) => a - b);
    const medianWeight = sortedWeights.length % 2 === 0 ? (sortedWeights[sortedWeights.length / 2 - 1] + sortedWeights[sortedWeights.length / 2]) / 2 : sortedWeights[Math.floor(sortedWeights.length / 2)];
    const minWeight = Math.min(...weights);
    const maxWeight = Math.max(...weights);
    const sortedAges = [...ages].sort((a, b) => a - b);
    const medianAge = sortedAges.length % 2 === 0 ? (sortedAges[sortedAges.length / 2 - 1] + sortedAges[sortedAges.length / 2]) / 2 : sortedAges[Math.floor(sortedAges.length / 2)];
    const minAge = Math.min(...ages);
    const maxAge = Math.max(...ages);

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
            <div className="stats">
                <div className="statCard">
                    <p>Total Pokémon: {totalPokemon}</p>
                    <p>Mean Weight: {meanWeight.toFixed(2)} kg</p>
                    <p>Median Weight: {medianWeight.toFixed(2)} kg</p>
                    <p>Weight Range: {minWeight} kg - {maxWeight} kg</p>
                </div>
                <div className="statCard">
                    <p>Mean Age: {meanAge.toFixed(2)} years</p>
                    <p>Median Age: {medianAge.toFixed(2)} years</p>
                    <p>Age Range: {minAge} years - {maxAge} years</p>
                </div>
            </div>
            <div className="posts">
                {currentPokemon.map(pokemon => (
                    <div key={pokemon.id} className="post">
                        <img src={pokemon.imageUrl} alt={pokemon.name} className="pokemonImage" />
                        <h3>{pokemon.name}</h3>
                        <p className="details">Weight: {pokemon.weight} kg</p>
                        <p className="details">Age: {pokemon.age} years</p>
                    </div>
                ))}
            </div>
            <div className="pagination">
                {Array.from({ length: Math.ceil(filteredPokemon.length / pokemonPerPage) }, (_, index) => (
                    <button key={index + 1} onClick={() => paginate(index + 1)}>{index + 1}</button>
                ))}
            </div>
        </div>
    );
};

export default Posts;

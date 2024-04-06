import React from 'react';
import { useParams, Link } from 'react-router-dom';

const Detail = ({ pokemonList, descriptions }) => {
  const { id } = useParams();
  const pokemon = pokemonList.find(pokemon => pokemon.id === parseInt(id));
  const { name, weight } = pokemon;
  const description = descriptions[name.toLowerCase()];
  const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;

  return (
    <div className="detail">
      <Link to="/" className="back-button">Back</Link>
      <h2>{name}</h2>
      <img src={imageUrl} alt={name} className="pokemon-image" />
      <p>Weight: {weight} kg</p>
      <p>Description: {description}</p>
      {/* Add other details here */}
    </div>
  );
};

export default Detail;

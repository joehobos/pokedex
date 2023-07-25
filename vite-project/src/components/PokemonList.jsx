import React from "react";
import App from "../App";


function PokemonList({ pokemon, search, }) {
  const filteredPokemon = pokemon.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
    <div className="cards">
      {filteredPokemon.map((pokemon) => (
        <div className="card" key={pokemon.name}>
          <p>{pokemon.name}</p>
          <img src={pokemon.sprite} alt='' />
          <p> {pokemon.weight} kg</p>
          
        </div>
      ))}
    </div>
    </>
  );
}

export default PokemonList;
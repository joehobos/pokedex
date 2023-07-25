import { useState } from 'react'
import { useEffect } from 'react'
import React from 'react'
import PokemonList from './components/PokemonList'
import axios from 'axios'
import Page from './components/Page'
import './index.css'


function App() {
  const [pokemon, setPokemon] = useState([])
  const [allPokemon, setAllPokemon] = useState([])
  const [currentPageUrl, setcurrentPageUrl] = useState("https://pokeapi.co/api/v2/pokemon")
  const [previousPageUrl, setpreviousPageUrl] = useState()
  const [nextPageUrl, setnextPageUrl] = useState()
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')

  useEffect(() => {
    setLoading(true);
    axios.get(currentPageUrl).then((response) => {
      setLoading(false);
      const pokemonData = response.data.results.map((pokemon) => ({
        name: pokemon.name,
        url: pokemon.url,
        weight: 0,
        sprite: '', 
      }));
      setPokemon(pokemonData)
      setAllPokemon(pokemonData)
      setpreviousPageUrl(response.data.previous)
      setnextPageUrl(response.data.next)

      
      Promise.all(
        pokemonData.map(async (poke) => {
          const response = await axios.get(poke.url);
          const weight = response.data.weight;
          const sprite = response.data.sprites.front_default; 
          return { ...poke, weight, sprite };
        })
      ).then((updatedPokemon) => {
        setPokemon(updatedPokemon);
      });
    });
  }, [currentPageUrl]);

  function gotoPreviousPage() {
    setcurrentPageUrl(previousPageUrl);
  }

  function gotoNextPage() {
    setcurrentPageUrl(nextPageUrl);
  }

  
document.addEventListener('DOMContentLoaded', () => {
  const cards = document.querySelectorAll('.card');
  cards.forEach((card) => {
    card.addEventListener('click', () => {
      card.classList.toggle('enlarged');
    });
  });
});


  if (loading === true) {
    return "Loading...";
  }


  return (
    <>
    <header className='header'>Pokedex</header>
    <div className='search-container'>
    <input
      className='search'
      type="text"
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      placeholder="Search Pokemon"
    />
    </div>
    <PokemonList pokemon={pokemon} search={search} />
    <Page
      gotoPreviousPage={previousPageUrl ? gotoPreviousPage : null}
      gotoNextPage={nextPageUrl ? gotoNextPage : null}
    />
  </>
  );
}

export default App;

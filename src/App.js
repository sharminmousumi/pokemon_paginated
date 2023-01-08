import React, { useEffect, useState } from "react";
import PokemonInfo from "./Components/PokemonInfo";
import ReactPaginate from 'react-paginate';


function App() {
const [allPokemons, setAllPokemons] = useState([]);
const [searchInput, setSearchInput] = useState("");
const [loadPoke] = useState(
	"https://pokeapi.co/api/v2/pokemon?_page=&{currentPage}limit=50"
);



const getAllPokemons = async (currentPage) => {
	const res = await fetch(loadPoke);
	const data = await res.json();
	//setLoadPoke(data.next);
	let pokemonData=[]; 
	async function createPokemonObject(result) {
	for (const pokemon of result) {
		const res = await fetch(
			`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`
			);
			const data = await res.json();
			pokemonData=[...pokemonData,data];
	}	
	
	}
	await createPokemonObject(data.results);
	console.log(pokemonData);
	setAllPokemons(pokemonData);
	
};
useEffect(() => {
	getAllPokemons();
},);

const handleChange = (e) => {
  e.preventDefault();
  setSearchInput(e.target.value);
};
if (searchInput.length > 0) {
    allPokemons.filter((pokemon) => {
    return pokemon.name.match(searchInput);
});
}
const handlePageClick = (data) =>{
        console.log(data.selected);
		
		
      }
      
  

return (
	<div className="app-container">
	<h1>Pokemon Kingdom .</h1>
  <input
   type="search"
   placeholder="Search here"
   onChange={handleChange}
   value={searchInput} />
     <ReactPaginate
     previousLabel={'previous'}
     nextLabel={'Next'}
     breakLabel={'....'}
     pageCount={8}
     marginPagesDisplayed={5}
     pageRangeDisplayed={3}
     onPageChange={handlePageClick}
     containerClassName={'pagination justify-content-center'}
     pageClassName={'page-item'}
     pageLinkClassName={'page-link'}
     previousClassName={'page-item'}
     previousLinkClassName={'page-link'}
     nextClassName={'page-item'}
     nextLinkClassName={'page-link'}
     breakClassName={'page-item'}
     breakLinkClassName={'page-link'}
     activeClassName={'active'}/>
    
    
    
  
	<div className="pokemon-container">
		<div className="all-container">
    
		{allPokemons.map((pokemon, index) => (
			<PokemonInfo
			id={pokemon.id}
			name={pokemon.name}
			image=
	{pokemon.sprites.other.dream_world.front_default}
			type={pokemon.types[0].type.name}
			key={index}
			ability={pokemon.ability}
			height={pokemon.height}
			weight={pokemon.weight}
			stat1={pokemon.stats[0].stat.name}
			stat2={pokemon.stats[1].stat.name}
			stat3={pokemon.stats[2].stat.name}
			stat4={pokemon.stats[3].stat.name}
			stat5={pokemon.stats[4].stat.name}
			stat6={pokemon.stats[5].stat.name}
			bs1={pokemon.stats[0].base_stat}
			bs2={pokemon.stats[1].base_stat}
			bs3={pokemon.stats[2].base_stat}
			bs4={pokemon.stats[3].base_stat}
			bs5={pokemon.stats[4].base_stat}
			bs6={pokemon.stats[5].base_stat}
			/>
			
		))}
		</div>
		
	</div>
	
	</div>
);
}

export default App;

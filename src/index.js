document.addEventListener('DOMContentLoaded', () => {
  //console.log(POKEMON)
  //YOUR CODE HERE

  const pokemonSearchBox = document.querySelector("#pokemon-search-input")
  const pokeInput = document.querySelector("#pokemon-search-input").value
  const pokemonList = document.querySelector('#pokemon-container')
  //const pokemonName = document.querySelector('#pokemon-container').querySelector("h2")

  function getMyPokemons() {
     fetch('http://localhost:3000/pokemon')
    .then(response => response.json())
    .then(data => {
      data = filteredData(data) // need to fix filter

    pokemonList.innerHTML = "" //get rid of text saying there are no pokemon or other pokemon
    //debugger
    data.forEach(renderSinglePokemon)
    console.log(data)})
  }

  function filteredData(data) {
    if (pokeInput !== ""){
      return data.filter((pokemon) => pokemon.name.includes(pokeInput))
    }
  }

  const renderSinglePokemon = function(pokemon) {
    const newElement = document.createElement('li')
    newElement.className = 'card'
    newElement.innerHTML = `
    <img src="${pokemon["sprites"]["front"]}"/>
    <h2>${pokemon["name"]}</h2>
    `
    pokemonList.appendChild(newElement)
  }

  getMyPokemons()

  pokemonSearchBox.addEventListener("input", getMyPokemons)

})

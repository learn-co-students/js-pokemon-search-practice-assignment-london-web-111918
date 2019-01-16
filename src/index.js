// document.addEventListener('DOMContentLoaded', () => {
  //console.log(POKEMON) //Not using pokemon.js because I am using db.json and running the json server with: json-server --watch db.json

  const pokemonSearchBox = document.querySelector("#pokemon-search-input")
  const pokeInput = document.querySelector("#pokemon-search-input")
  const pokemonList = document.querySelector('#pokemon-container')

  function getMyPokemons() {
     fetch('http://localhost:3000/pokemon')
    .then(response => response.json())
    .then(data => {
      data = filteredData(data)
    pokemonList.innerHTML = "" //get rid of text saying there are no pokemon or other pokemon
    data.forEach(renderSinglePokemon)
    console.log(data)})
  }

  function filteredData(data) {
    if (pokeInput.value !== ""){
      return data.filter((pokemon) => pokemon.name.includes(pokeInput.value))
    }
    else {
      return data
    }
  }

  // Non-fancy display code that I wrote which works:
  //-------------
  // const renderSinglePokemon = function(pokemon) {
  //   const newElement = document.createElement('li')
  //   newElement.className = 'card'
  //   newElement.innerHTML = `
  //   <img src="${pokemon["sprites"]["front"]}"/>
  //   <h2>${pokemon["name"]}</h2>
  //   `
  //   pokemonList.appendChild(newElement)
  // }
  //-------------

  function renderSinglePokemon(pokemon) {
    pokemonList.innerHTML += `
    <div class="pokemon-card">
      <div class="pokemon-frame">
        <h1 class="center-text">${pokemon.name}</h1>
        <div onClick="changeImage(${pokemon.id})" class="pokemon-image">
          <img data-action="flip" class="toggle-sprite" id=${pokemon.id} src=${pokemon.sprites.front}>
        </div>
        <div style="display: flex; justify-content: space-between; padding: 7px;">
          <div>${pokemon.weight}kg</div>
          <div>${pokemon.types[0]}</div>
        </div>
      </div>
    </div>`;
  }

  function changeImage(id) {
  const El = document.getElementById(`${id}`);
  return fetch("http://localhost:3000/pokemon")
    .then(res => res.json())
    .then(res => {
      // find correct pokemon object from database
      pokemon = res.find(pokemon => pokemon.id === parseInt(id))
      // flip
      if (El.src.includes("back")){
        El.src = pokemon.sprites.front
      } else {
        El.src = pokemon.sprites.back
      }
    })
  }

  function flipcard() {
  let imageNode = event.target
  // Get the id from the data-id attribute
  let id = event.target.dataset.id
  // just a little error check
  if (id !== undefined){
    changeImage(id)
    }
  }

  document.addEventListener("click", flipcard)

  //----------------------------------------------------------------------------

  getMyPokemons()
  pokemonSearchBox.addEventListener("input", getMyPokemons)
// })

// fetch data from PokeAPI
// parse the json
// save it as a global var
//implement filter functionality
//flip images

const pokeContainerEl = document.getElementById('pokemon-container')
const pokeInputEl = document.getElementById('pokemon-search-input')
const dataEl = fetch('http://localhost:3000/pokemon').then(res => res.json())

function getData(){
    dataEl.then(data => {
      //filter pokemons
      if (pokeInputEl.value !== ""){
        data = filterPokemon(data)
      }
      // empty list to avoid duplicates (adding matching pokemons to end of array)
      pokeContainerEl.innerHTML = ""
      //render all pokemons (forEach)
      data.forEach((pokemon_hash) => insertPokemon(pokemon_hash))
    })
}

function insertPokemon(pokemon){
  pokeContainerEl.innerHTML += renderPokemon(pokemon)
}

function renderPokemon(pokemon){
  return `
    <div class="pokemon-card">
      <div class="pokemon-frame">
        <h1 class="center-text">${pokemon.name}</h1>
        <div class="pokemon-image">
          <img data-id="${pokemon.id}" id="${pokemon.id}" data-action="flip" class="toggle-sprite" src="${pokemon.sprites.front}">
        </div>
      </div>
    </div>
  `
}

function filterPokemon(array){
  return array.filter((pokemon_hash) => {
    // keep pokemon if their names have the string in the input
    return pokemon_hash.name.includes(pokeInputEl.value.toLowerCase())
  })
}

function change_image(id){
    let El = document.querySelector(`[data-id ="${id}"]`);
    dataEl.then(data => {
      // find the specific pokemon from the database
      pokemon = data.find(pokemon => pokemon.id == id)
        if (El.src.includes("back")){
          El.src = pokemon.sprites.front
        }
        else {
          El.src = pokemon.sprites.back
        }
    })
}

function flipcard() {
    // Get the id from the data-id attribute
    id = event.target.dataset.id
    // just a little error check
    if (id !== undefined){
      change_image(id)
    }
}

getData()

pokeInputEl.addEventListener('input', getData)
document.addEventListener('click', flipcard)

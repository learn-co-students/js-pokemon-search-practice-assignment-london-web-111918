const pokeContainer = document.getElementById('pokemon-container')
const pokeFilter = document.getElementById('pokemon-search-input')

function get_pokemons(){
  fetch("http://localhost:3000/pokemon")
    .then(res => res.json())
    .then(res => {
      // Filter the list if input is present
      if (pokeFilter.value !== ""){
        res = filterPokemons(res)
      }
      // Clear previous list of pokemons
      pokeContainer.innerHTML = "";
      insertPokemons(res)
    })
}

function changeImage(id) {
  // find correct pokemon card in HTML via id passed in. Really this should be via data-id (look at part 3)
  const El = document.getElementById(`${id}`);
  fetch("http://localhost:3000/pokemon")
    .then(res => res.json())
    .then(res => {
      // find correct pokemon object from database
      pokemon = res.find(pokemon => pokemon.id === id)
      // flip
      if (El.src.includes("back")){
        El.src = pokemon.sprites.front
      } else {
        El.src = pokemon.sprites.back
      }
    })
}

function filterPokemons(res) {
  return filteredArray = res.filter((pokemon) => pokemon.name.includes(pokeFilter.value))
}

function insertPokemons(res) {
  res.forEach(poke => pokeContainer.insertAdjacentHTML("beforeend", renderPokemon(poke)))
}

function renderPokemon(pokemon) {
  return `
    <div class="pokemon-card">
      <div class="pokemon-frame">
        <h1 class="center-text">${pokemon.name}</h1>
        <div onClick="changeImage(${pokemon.id})" class="pokemon-image">
          <img data-id="7" data-action="flip" class="toggle-sprite" id=${pokemon.id} src=${pokemon.sprites.front}>
        </div>
        <div style="display: flex; justify-content: space-between; padding: 7px;">
          <div>${pokemon.weight}kg</div>
          <div>${pokemon.types[0]}</div>
        </div>
      </div>
    </div>`;
}
// render the pokemon at the start
get_pokemons()

document.addEventListener("input", get_pokemons)

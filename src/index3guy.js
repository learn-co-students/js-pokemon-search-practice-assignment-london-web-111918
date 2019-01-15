const pokeContainer = document.getElementById('pokemon-container')
const pokeFilter = document.getElementById('pokemon-search-input')

function api(){
  return fetch("http://localhost:3000/pokemon").then(res => res.json())
}

function get_pokemons() {
    api().then(res => {
      if (pokeFilter.value !== "") {
        res = filterPokemons(res)
      }
      pokeContainer.innerHTML = "";
      insertPokemons(res)
    })
}

function changeImage(id) {
  const El = document.querySelector(`[data-id="${id}"]`);
  api().then(res => {
  pokemon = res.find(pokemon => pokemon.id === id)
    if (El.src.includes("back")) {
      El.src = pokemon.sprites.front
    } else {
      El.src = pokemon.sprites.back
    }
  })
}

function filterPokemons(res) {
  return res.filter((pokemon) => pokemon.name.includes(pokeFilter.value.toLowerCase()))
}

function insertPokemons(res) {
  res.forEach(poke => pokeContainer.innerHTML += renderPokemon(poke))
}

function renderPokemon(pokemon) {
  HTMLDiv = document.createElement('div')
  return (HTMLDiv = `
    <div class="pokemon-card">
      <div class="pokemon-frame">
        <h1 class="center-text">${pokemon.name}</h1>
        <div onClick="changeImage(${pokemon.id})" class="pokemon-image">
          <img data-id=${pokemon.id} data-action="flip" class="toggle-sprite" src=${pokemon.sprites.front}>
        </div>
        <div style="display: flex; justify-content: space-between; padding: 7px;">
          <div>${pokemon.weight}kg</div>
          <div>${pokemon.types[0]}</div>
        </div>
      </div>
    </div>`);
}

// Call to get pokemons on first rendering
get_pokemons()

document.addEventListener("input", get_pokemons)

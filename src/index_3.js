const pokeContainer = document.getElementById('pokemon-container')
const pokeInput = document.getElementById('pokemon-search-input')

function getData() {
  fetch('http://localhost:3000/pokemon')
    .then(res => res.json())
    .then(json => {
      if (pokeInput.value !== "") {
        json = filterPokemon(json)
      }
      json.forEach((pokemon_hash) => {
        insertPokemon(pokemon_hash)
      })
    })
}

function flip() {
  const pokeImg = event.target
  console.log(event)
  if (pokeImg.src.includes('back')) {
    pokeImg.src = event.sprites.front
  } else {
    pokeImg.src = event.sprites.back
  }
}

function filterPokemon(array) {
  pokeContainer.innerHTML = ""
  return array.filter((pokemon_hash) => {
    return pokemon_hash.name.includes(pokeInput.value.toLowerCase())
  })
}

function insertPokemon(pokemon) {
  pokeContainer.innerHTML += renderPokemon(pokemon)
}

function renderPokemon(pokemon) {
  return (`
  <div class="pokemon-card">
    <div class="pokemon-frame">
      <h1 class="center-text">${pokemon.name}</h1>
      <div class="pokemon-image">
        <img data-id="${pokemon.id}" data-action="flip" class="toggle-sprite" src="${pokemon.sprites.front}">
      </div>
    </div>
  </div>`)
}

getData()
pokeInput.addEventListener('input', getData)
document.addEventListener('click', flip)

// fetch data (fetch from API URL)
// parse data (parse promise to JSON)
// store in global variable (.then save to global var)
// render all items
  // for each => render

getDataFromApi = () => {
  return fetch('http://localhost:3000/pokemon')
  .then(res => res.json())
}

const renderPokemon = (data) => {

  let container = ''
  container = document.querySelector('#pokemon-container')
  container.innerHTML = ''

  data.forEach((poke) => {
    let divContainer =
    `
        <div class="pokemon-card">
        <div class="pokemon-frame">
          <h1 class="center-text">${poke.name}</h1>
          <div class="pokemon-image">
            <img data-id="${poke.id}" data-action="flip" class="toggle-sprite" src="${poke.sprites.front}">
          </div>
        </div>
      </div>
    `
    container.innerHTML += divContainer
  })
}

filterPoke = (data) => {
  // debugger
  if (document.querySelector('#pokemon-search-input').value !== "") {
    return data.filter(poke => poke.name.includes(document.querySelector('#pokemon-search-input').value))
  } else {
    return data
  }
}


flipPoke = (e) => {
  let pokeEl = document.querySelector(`[data-id= '${e.target.dataset.id}']`)
  let pokeID = pokeEl.getAttribute('data-id')
  let pokeImg = pokeEl.getAttribute('src')

  getDataFromApi().then(res => {
  pokemon = res.find(pokemon =>  pokemon.id === parseInt(pokeID))
    if (pokeEl.src.includes("back")) {
      pokeEl.src = pokemon.sprites.front
    } else {
      pokeEl.src = pokemon.sprites.back
    }
  })
}

getPokemons = () => {
  getDataFromApi().then(data => renderPokemon(filterPoke(data))) // always split a promise into a two functions. 1. deals with the json parsing. 2. storing usable data.
}

document.querySelector("div.user-panel.main input[name='login']");


document.addEventListener("DOMContentLoaded", () => {
  document.addEventListener('input', getPokemons)
  document.addEventListener('click', (e) => flipPoke(e)) // MouseEvent
});

getPokemons()

//target.event provides info on the clicked target node
// target.dataset.id exposes id of clicked target

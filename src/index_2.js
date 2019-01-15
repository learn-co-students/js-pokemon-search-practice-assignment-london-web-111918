document.addEventListener('DOMContentLoaded', () => {
/*************** DOM Selectors ***************/
  const pokemonContainer = document.querySelector('#pokemon-container')
  const pokemonSearchForm = document.querySelector('#pokemon-search-form')
  let allPokemon

  fetch('http://localhost:3000/pokemon')
    .then(res => res.json())
    .then(json => {
      allPokemon = json
    })

  console.log(allPokemon)

/*************** Initial Render ***************/
  pokemonContainer.innerHTML = renderAllPokemon(POKEMON)

/*************** Event Listeners ***************/
  pokemonContainer.addEventListener('click', (event) => {
    if (event.target.dataset.action === 'flip') {
      // dataset always returns string data we can use == to leverage type coerscion to compare:
      // '1' === 1 //false
      // '1' == 1 //true
      //arrow fn no curlies {} will IMPLICITLY RETURN
      const targetPoke = POKEMON.find(pokeObj => pokeObj.id == event.target.dataset.id)
      // alternatively, parseInt('1') // 1
      // const targetPoke = POKEMON.find(pokeObj => pokeObj.id === parseInt(event.target.dataset.id))
      if (event.target.src === targetPoke.sprites.front) {
        event.target.src = targetPoke.sprites.back
      } else {
        event.target.src = targetPoke.sprites.front
      }
    }
  })

  pokemonSearchForm.addEventListener('input', (event) => {
    const filteredPokes = POKEMON.filter(pokeObj => pokeObj.name.includes(event.target.value.toLowerCase()))
    const filteredPokeHTML = renderAllPokemon(filteredPokes)

    pokemonContainer.innerHTML = filteredPokeHTML ? filteredPokeHTML : `<p><center>There are no Pokémon here</center></p>`
  })
})

/*************** Helper Fns for Producing HTML ***************/
function renderAllPokemon(pokemonArray) {
  return pokemonArray.map(renderSinglePokemon).join('')
}

function renderSinglePokemon(pokemon) {
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

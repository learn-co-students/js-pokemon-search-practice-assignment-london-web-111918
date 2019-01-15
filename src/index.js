document.addEventListener('DOMContentLoaded', () => {
  // console.log(POKEMON)
  //YOUR CODE HERE
  const pokeContainer = document.querySelector('#pokemon-container')
  const search = document.querySelector('#pokemon-search-input')

  fetch('http://localhost:3000/pokemon')
    .then(res => res.json())
    .then(json => {
      showAll(json)
      search.addEventListener('input', () => filterP(json))
    })

  function createPokeEl(pokemon) {
    const pokeCard = document.createElement('div')
    pokeCard.classList = 'pokemon-card'
    pokeCard.innerHTML = `
      <div class="pokemon-frame">
        <h1 class="center-text">${pokemon.name}</h1>
        <div class="pokemon-image">
          <img id="${pokemon.id}" class="toggle-sprite" src="${pokemon.sprites.front}">
        </div>
      </div>
    `
    return pokeCard
  }

  function filterP(pokeList){
    pokeContainer.innerHTML = ""
    filteredArray = pokeList.filter((pokemon) => pokemon.name.includes(search.value.toLowerCase()))
    filteredArray.forEach((pokemon) => {
      pokeContainer.appendChild(createPokeEl(pokemon))
      flip(pokemon)
    })
  }

  function showAll(pokeList) {
    for (const poke of pokeList) {
      pokeContainer.appendChild(createPokeEl(poke))
      flip(poke)
    }
  }

  function flip(pokemon) {
    const pokeImage = document.getElementById(`${pokemon.id}`)
    pokeImage.addEventListener('click', () => {
      if (pokeImage.src === pokemon.sprites.front) {
        pokeImage.src = pokemon.sprites.back
      } else {
        pokeImage.src = pokemon.sprites.front
      }
    })
  }


})

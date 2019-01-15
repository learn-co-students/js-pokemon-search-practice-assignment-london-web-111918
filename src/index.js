  const pokeInput = document.getElementById('pokemon-search-input')
  const pokeContainer = document.getElementById('pokemon-container')

  function render() {
    fetch('http://localhost:3000/pokemon')
      .then(res => res.json())
      .then(json => {
        if (pokeInput.value !== ''){
          json = filterPokemon(json)
        }
        pokeContainer.innerHTML = ''
        json.forEach((pokemon_hash) => insertPokemon(pokemon_hash))
      });
    }


  function filterPokemon(array) {
    return array.filter((pokemon) => {
      return pokemon.name.includes(pokeInput.value.toLowerCase())
    })
  }

  function insertPokemon(pokemon) {
    pokeContainer.innerHTML += pokeHTML(pokemon)
  }

  function pokeHTML(pokemon) {
    return `<div class='pokemon-card'>
      <div class="pokemon-frame">
        <h1 class="center-text">${pokemon.name}</h1>
        <div onClick="changeImage(${pokemon.id})" class="pokemon-image">
          <img data-id="${pokemon.id}" data-action="flip" class="toggle-sprite" src="${pokemon.sprites.front}">
        </div>
      </div>
    </div>`

  }

  function changeImage(id) {
    let El = document.querySelector(`[data-id="${id}"]`)
    fetch("http://localhost:3000/pokemon")
    .then(res => res.json())
    .then(data => {
      pokemon = data.find(pokemon => pokemon.id == id)
      if (El.src.includes("back")){
        El.src = pokemon.sprites.front
      } else {
        El.src = pokemon.sprites.back
      }
    })
  }

  render()
  pokeInput.addEventListener('input', render)

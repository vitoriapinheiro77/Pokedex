const pokemonName = document.querySelector('.pokemon__name');
const pokemonNumber = document.querySelector('.pokemon__number');
const pokemonImage = document.querySelector('.pokemon__image');
const form = document.querySelector('.form');
const input = document.querySelector('.input__search');
const buttonPrev = document.querySelector('.btn-prev');
const buttonNext = document.querySelector('.btn-next');
const backgroundPokedex = document.querySelector('.background_pokedex');

let searchPokemon = 1;

const typeColors = {
  fire: '#FF4500',
  water: '#1E90FF',
  grass: '#32CD32',
  electric: '#FFD700',
};

const fetchPokemon = async (pokemon) => {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
  return response.ok ? response.json() : null;
}

const renderPokemon = async (pokemon) => {
  const data = await fetchPokemon(pokemon);

  if (data) {
    pokemonName.textContent = data.name;
    pokemonNumber.textContent = data.id;
    pokemonImage.src = data.sprites.versions['generation-v']['black-white'].animated.front_default;

    const primaryType = data.types[0].type.name;
    backgroundPokedex.style.backgroundColor = typeColors[primaryType] || '#FFFFFF'; 
  } else {
    pokemonName.textContent = 'Not found';
    pokemonNumber.textContent = '???';
    pokemonImage.src = '';
    backgroundPokedex.style.backgroundColor = '#FFFFFF'; 
  }
}

form.addEventListener('submit', (event) => {
  event.preventDefault();
  renderPokemon(input.value.toLowerCase());
});

buttonPrev.addEventListener('click', () => {
  if (searchPokemon > 1) {
    searchPokemon--;
    renderPokemon(searchPokemon);
  }
});

buttonNext.addEventListener('click', () => {
  if (searchPokemon < 898) {
    searchPokemon++;
    renderPokemon(searchPokemon);
  }
});

renderPokemon(searchPokemon);

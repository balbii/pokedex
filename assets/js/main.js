const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')

const maxRecords = 151;
const limit = 20;
let offset = 0;

function loadPokemonItems(offset, limit) {

    function convertPokemonToLi(pokemon) {
        return `
            <li class="pokemon ${pokemon.type}">
                    <span class="number">#${pokemon.number}</span>
                    <span class="name">${pokemon.name}</span>
                    <div class="detail">
                        <ol class="types">
                            ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                        </ol>
                        <img src="${pokemon.photo}"
                            alt="${pokemon.name}" />
                    </div>
                </li>
        `
    }

    pokeApi.getPokemons(offset, limit).then((pokemons) => {

        pokemonList.innerHTML += pokemons.map(convertPokemonToLi).join('')
    
    })
}

loadPokemonItems(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit

    const qtdRecordNextPage = offset + limit
    
    if (qtdRecordNextPage >= maxRecords) {
        const newLimit = maxRecords - offset;
        loadPokemonItems(offset, newLimit)
        loadMoreButton.parentElement.removeChild(loadMoreButton)

    } else{
        loadPokemonItems(offset, limit)
    }  
})



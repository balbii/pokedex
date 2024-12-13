const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')
const pokemonDetails = document.getElementById('pokemonDetails')

const maxRecords = 151;
const limit = 20;
let offset = 0;

const params = new URLSearchParams(window.location.search);
const id = params.get("id");

if (id) {
    loadPokemonDetails(id);
}

function loadPokemonDetails(id) {
    pokeApi.getPokemonDetailToPage(id).then((pokemon) => {
        const newHtml = `
        <section class="pokemon ${pokemon.type}">
            <h1 class="name">${pokemon.name}</h1>
            <ol class="types">
                ${pokemon.types.map((type) => `<li class="type ${type}"> ${type}</li>`).join("")}
            </ol>
            <div class="img">
                <img src="${pokemon.photo}" alt="${pokemon.name}">
            </div>
        </section>
        <section class="details">
            <div class="menu">
                <div class="menu_option" onclick="showItems('about')">About</div>
                <div class="menu_option" onclick="showItems('base_stats')">Base Stats</div>
            </div>
            <div class="menu_items" id="about">
                <ol>
                    <li id="species">Species: ${pokemon.species}</li>
                    <li id="height">Height: ${pokemon.height}</li>
                    <li id="weight">Weight: ${pokemon.weight}</li>
                    <li id="abilities">Abilities: ${pokemon.abilities}</li>
                </ol>
            </div>
            <div class="menu_items" id="base_stats">
                <ol>
                    <li id="hp">HP: ${pokemon.hp}</li>
                    <li id="attack">Attack: ${pokemon.attack}</li>
                    <li id="defense">Defense: ${pokemon.defense}</li>
                </ol>
            </div>
        </section>
        `;
        if (pokemonDetails) {
            pokemonDetails.innerHTML = newHtml;
        }
    })
    .catch((error) => console.log(error));
}

function showItems(category) {
    let menuItems = document.querySelectorAll(".menu_items");
    menuItems.forEach((item) => {
      item.classList.remove("active");
    });
    document.getElementById(category).classList.add("active");
}

function redirectToDetails(id) {
    const detailsUrl = `pokemon-details.html?id=${id}`;
    window.location.href = detailsUrl;
}

function loadPokemonItems(offset, limit) {

    function convertPokemonToLi(pokemon) {
        return `
            <li onclick="redirectToDetails(${pokemon.number})" class="pokemon ${pokemon.type}">
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

function loadPokemon(pokemon) {

    function convertPokemonToLi(pokemon) {
        return `
            <li id="${pokemon.number}" class="pokemon ${pokemon.type}">
                    <span class="number">#${pokemon.number}</span>
                    <span class="name">${pokemon.name}</span>
                    <div class="detail">
                        <ol class="types">
                            ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                        </ol>
                        <img src="${pokemon.photo}"
                            alt="${pokemon.name}" />
                    </div>
                    <a href="./pokemon.html">Details</a>
                </li>
        `
    }

    pokeApi.getPokemonDetail(pokemon).then((pokemons) => {

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



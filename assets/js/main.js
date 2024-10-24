const pokemonList = document.getElementById('pokemonList')
const pagination = document.getElementById('pagination')
const loadMoreButton = document.getElementById('loadMoreButton')
const pokemonDetalhes = document.getElementById('pokemonDetalhes')

const maxRecords = 151
const limit = 10
let offset = 0;

function convertPokemonToLi(pokemon) {
    return `
        <li id="${pokemon.name}" style="cursor: pointer;" class="pokemon ${pokemon.type}" onclick="loadDetails('${pokemon.name}','${pokemon.types}','${pokemon.number}','${pokemon.photo}','${pokemon.hp}','${pokemon.attack}','${pokemon.defense}','${pokemon.specialAttack}','${pokemon.specialDefense}','${pokemon.speed}','${pokemon.total}')">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>

            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>

                <img src="${pokemon.photo}"
                     alt="${pokemon.name}">
            </div>
        </li>
    `
}

function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map(convertPokemonToLi).join('')
        pokemonList.innerHTML += newHtml
    })
}

loadPokemonItens(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit
    const qtdRecordsWithNexPage = offset + limit

    if (qtdRecordsWithNexPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItens(offset, limit)
    }
})

function loadDetails(name, types, number, photo, hp, attack, defense, spAttack, spDef, speed, total) {    
    
    if (pokemonList.classList.contains('show')) {
        pokemonList.classList.remove('show')
        pokemonList.classList.add('hidden')
        pagination.classList.remove('show')
        pagination.classList.add('hidden')
        pokemonDetalhes.classList.remove('hidden')
        pokemonDetalhes.classList.add('show') 
    }
    
    console.log('aqui', types.split(','));
    

    const container = convertPokemonToStats(name, types, number, photo, hp, attack, defense, spAttack, spDef, speed, total)
    pokemonDetalhes.innerHTML = container
}

function show_hidden(value) {
    if (value === true){
        pokemonList.classList.remove('hidden')
        pokemonList.classList.add('show')
        pagination.classList.remove('hidden')
        pagination.classList.add('show')
        pokemonDetalhes.classList.remove('show')
        pokemonDetalhes.classList.add('hidden')
    }
}

function convertPokemonToStats(name, types, number, photo, hp, attack, defense, spAttack, spDef, speed, total) {
    return `
        <div class="container show">          
          <div class="header ${types.split(',')[0]}">
            <span class="close" style="cursor: pointer;" onclick="show_hidden(true)">X</span>
            <div class="arrow_heart" onclick="show_hidden(true)">
            <-
            <!--  <i class="fas fa-arrow-left" style="color: #ffffff"></i>
              <i class="far fa-heart" style="color: #ffffff"></i> -->
            </div>
            <div class="name_number">
              <div class="name_type">
                <div class="name">${name}</div>
                <div class="types">
                  <ul>                    
                    ${types.split(',').map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                  </ul>
                </div>
              </div>
              <div class="number">#${number}</div>
            </div>
            <div class="image">
              <img
                src="${photo}"
                alt=""
              />
            </div>
          </div>
          <div class="body">
            <div class="menu">
              <div class="about">
                <h5>Base Stats</h5>
                <div><span class="col1">HP</span><span class="col2">${hp}</span><span class="col3a"><span style="height: 2px; width: ${hp}%; ${ hp > 50 ? 'background-color: #0f0':'background-color: #f00"'};" class="col3b"></span></span></div>
                <div><span class="col1">Attack</span> <span class="col2">${attack}</span><span class="col3a"><span style="height: 2px; width: ${attack}%; ${ attack > 50 ? 'background-color: #0f0':'background-color: #f00"'};" class="col3b"></span></span></div>
                <div><span class="col1">Defense</span> <span class="col2">${defense}</span><span class="col3a"><span style="height: 2px; width: ${defense}%; ${ defense > 50 ? 'background-color: #0f0':'background-color: #f00"'};" class="col3b"></span></span></div>
                <div><span class="col1">Sp. Atk</span> <span class="col2">${spAttack}</span><span class="col3a"><span style="height: 2px; width: ${spAttack}%; ${ spAttack > 50 ? 'background-color: #0f0':'background-color: #f00"'};" class="col3b"></span></span></div>
                <div><span class="col1">Sp. Def</span> <span class="col2">${spDef}</span><span class="col3a"><span style="height: 2px; width: ${spDef}%; ${ spDef > 50 ? 'background-color: #0f0':'background-color: #f00"'};" class="col3b"></span></span></div>
                <div><span class="col1">Speed</span> <span class="col2">${speed}</span><span class="col3a"><span style="height: 2px; width: ${speed}%; ${ speed > 50 ? 'background-color: #0f0':'background-color: #f00"'};" class="col3b"></span></span></div>
                <div><span class="col1">Total</span> <span class="col2">${total}</span><span class="col3a"><span style="height: 2px; width: ${total/6}%; ${ total > 300 ? 'background-color: #0f0':'background-color: #f00"'};" class="col3b"></span></span></div>

                <h4>Type defenses</h4>             
              </div>
            </div>
          </div>
        </div>
    `
}

function convertPokemonToDetails(pokemon) {
    return `
        <div class="container">
          <div class="header">
            <div class="arrow_heart">
              <i class="fas fa-arrow-left" style="color: #ffffff"></i>
              <i class="far fa-heart" style="color: #ffffff"></i>
            </div>
            <div class="name_number">
              <div class="name_type">
                <div class="name">${pokemon.name}</div>
                <div class="types">
                  <ul>
                    <li class="type">Grass</li>
                    <li class="type">Poison</li>
                  </ul>
                </div>
              </div>
              <div class="number">#001</div>
            </div>
            <div class="image">
              <img
                src="${pokemon.photo}"
                alt=""
              />
            </div>
          </div>
          <div class="body">
            <div class="menu">
              <div class="about">
                <h5>About</h5>
                <div><span class="col1">Species</span><span class="col2">Seed</span></div>
                <div><span class="col1">Height</span> <span class="col2">2.36</span></div>
                <div><span class="col1">Weight</span> <span class="col2">6.9kg</span></div>
                <div><span class="col1">Abilities</span> <span class="col2">Overgrow</span></div>

                <h4>Breeding</h4>
                <div>                  
                  <span class="col1">Gender</span>
                   <span class="col2"><i class="fas fa-mars" style="color: #666"></i>&nbsp;
                    87.5%<i class="fas fa-venus" style="color: #ff0000"></i
                  >&nbsp;12.5%</span>
                </div>
                <div><span class="col1">Egg Groups</span><span class="col2">Monster</span></div>
                <div><span class="col1">Egg Cycle</span><span class="col2">Grass</span></div>
              </div>
            </div>
          </div>
        </div>
    `
}
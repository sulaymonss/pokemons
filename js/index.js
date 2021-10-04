const elList = selectElem('.pokemons__list');
const elForm = selectElem('.form');
const elType = selectElem('.pokemons__type', elForm);   
const elSearch = selectElem('.pokemons__search', elForm);   
const elFilter = selectElem('.pokemons__filter', elForm);
const elCart = selectElem('.cart');
const elCartWrapper = selectElem('.cart_wrapper', elCart);
const elCloseBtn = selectElem('.fa-chevron-right');
const elTemplate = selectElem('#template').content;
const cartBtn = selectElem('.header__btn');
const modalCard = selectElem('.modal__card');
const elCounter = selectElem('.count');

// modal-cart 

cartBtn.addEventListener('click', () =>{
    elCart.classList.add('cart_active');
    elCartWrapper.classList.add('cart_wrapper-active')
});

elCloseBtn.addEventListener('click', () =>{
    elCart.classList.remove('cart_active')
});

// rendering pokemons
let result = [];

function renderPokemons(pokemonsArr, element){
    element.innerHTML = null;
    pokemonsArr.forEach((pokemon) =>{
        const cloneTemplate = elTemplate.cloneNode(true);
        
        selectElem('.pokemons__img', cloneTemplate).src = pokemon.img;
        selectElem('.pokemons__title', cloneTemplate).textContent = pokemon.name;
        selectElem('.pokemons__type2', cloneTemplate).textContent = pokemon.type;
        selectElem('.pokemons__weight', cloneTemplate).textContent = pokemon.weight;
        selectElem('.pokemons__height', cloneTemplate).textContent = pokemon.height;
        
        const elPokemonBtn = selectElem('.heart2', cloneTemplate);
        elPokemonBtn.dataset.id = pokemon.id;
        
        elPokemonBtn.addEventListener('click', (e) =>{
            let itemId = e.target.dataset.id;
            
            let foundPokemon = pokemons.find((pokemon) => pokemon.id == itemId);
            let findIndex = result.findIndex((pokemon) => pokemon.id == itemId);
            
            if(e.target){
                if(!result.includes(foundPokemon)){
                    result.push(foundPokemon)
                }
            }else{
                result.splice(findIndex, 1)
            }
            
            function renderModalPokemons(arr, element){
                element.innerHTML = null;
                
                elCounter.textContent = result.length;
                
                arr.forEach((pokemon) =>{
                    const cloneTemplate = elTemplate.cloneNode(true);
                    
                    selectElem('.pokemons__img', cloneTemplate).src = pokemon.img;
                    selectElem('.pokemons__title', cloneTemplate).textContent = pokemon.name;
                    selectElem('.pokemons__type2', cloneTemplate).textContent = pokemon.type;
                    selectElem('.pokemons__weight', cloneTemplate).textContent = pokemon.weight;
                    selectElem('.pokemons__height', cloneTemplate).textContent = pokemon.height;
                    const elPokemonBtn = selectElem('.heart2', cloneTemplate);
                    elPokemonBtn.dataset.id = pokemon.id;
                    
                    elPokemonBtn.addEventListener('click', (e) =>{
                        const dataId = e.target.dataset.id
                        
                        const findIndex = result.findIndex(pokemon => pokemon.id == dataId)
                        
                        result.splice(findIndex, 1)
                        
                        renderModalPokemons(result, modalCard)
                        
                    })
                    
                    element.appendChild(cloneTemplate)
                })
            }
            renderModalPokemons(result, modalCard)
        })
        
        element.appendChild(cloneTemplate);
    })
}

renderPokemons(pokemons, elList);

// rendering types of pokemons

function renderTypes(pokemonsArr, element){
    let result = [];
    
    pokemonsArr.forEach((pokemon) =>{
        pokemon.type.forEach((uniqueType) =>{
            if(!result.includes(uniqueType)){
                result.push(uniqueType);
                result.sort();
            }
        })
    })
    result.forEach((onlyType) =>{
        let newOption = createDOM('option');
        newOption.textContent = onlyType;
        newOption.value = onlyType;
        
        element.appendChild(newOption);
    })
}

renderTypes(pokemons, elType);

// addEventListener part

elForm.addEventListener('submit', (e) =>{
    e.preventDefault();
    
    const typeValue = elType.value.trim();
    const searchValue = elSearch.value.trim();
    const filterValue = elFilter.value.trim();
    
    // search from names
    
    const regex = new RegExp(searchValue, 'gi');
    
    const filteredPokemons = pokemons.filter((pokemon) => pokemon.name.match(regex));
    
    // search from types
    
    let typedPokemons = [];
    
    if(typeValue === 'all'){
        typedPokemons = filteredPokemons;
    }else{
        typedPokemons = filteredPokemons.filter((pokemon) => pokemon.type.includes(typeValue));
    }
    
    // search from filter 'Az-Zz'
    
    if(filterValue === 'a-z'){
        typedPokemons.sort((a, b) =>{
            if(a.name > b.name){
                return 1
            }else if(a.name < b.name){
                return -1
            }else{
                return 0
            }
        });
    }else if(filterValue === 'z-a'){
        typedPokemons.sort((a, b) =>{
            if(a.name > b.name){
                return -1
            }else if(a.name < b.name){
                return 1
            }else{
                return 0
            }
        });
    }
    
    elSearch.value = null;
    
    renderPokemons(typedPokemons, elList);
});
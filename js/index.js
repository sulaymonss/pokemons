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

// modal-cart 

cartBtn.addEventListener('click', () =>{
    elCart.classList.add('cart_active');
    elCartWrapper.classList.add('cart_wrapper-active')
});

elCloseBtn.addEventListener('click', () =>{
    elCart.classList.remove('cart_active')
});

// elCart.addEventListener('click', evt =>{
//     const cartId = evt.target.dataset.cart
//     if(cartId == 1){
//         elCart.classList.remove('modal-active')    
//     }
// });
// rendering pokemons

function renderPokemons(pokemonsArr, element){
    element.innerHTML = null;
    
    pokemonsArr.forEach((pokemon) =>{
        const cloneTemplate = elTemplate.cloneNode(true);
        
        selectElem('.pokemons__img', cloneTemplate).src = pokemon.img;
        selectElem('.pokemons__title', cloneTemplate).textContent = pokemon.name;
        selectElem('.pokemons__type2', cloneTemplate).textContent = pokemon.type;
        selectElem('.pokemons__weight', cloneTemplate).textContent = pokemon.weight;
        selectElem('.pokemons__height', cloneTemplate).textContent = pokemon.height;
        
        const elPokemonBtn = selectElem('.pokemons__item-btn', cloneTemplate);
        elPokemonBtn.dataset.id = pokemon.id;
        let cartItem = elPokemonBtn.parentElement.parentElement.parentElement
        
        elPokemonBtn.addEventListener('click', () =>{
            elCartWrapper.appendChild(cartItem)
        });
        
        element.appendChild(cloneTemplate);
    })
}

renderPokemons(pokemons, elList);

// Add to cart button:

// function addToCart(event){
//     let button = event.target;
//     let cardItem = button.parentElement.parentElement.parentElement;
//     let title = cardItem.getElementsByClassName('pokemons__title')[0].innerText;
//     let type = cardItem.getElementsByClassName('pokemons__type2')[0].innerText;
//     let weight = cardItem.getElementsByClassName('pokemons__weight')[0].innerText;
//     let height = cardItem.getElementsByClassName('pokemons__height')[0].innerText;
//     addItemToCard(title, type, weight, height)
// }

// function addItemToCard(title, type, weight, height){
//     let cartItem = document.createElement('div');
//     cartItemContents = `
//     <li class="pokemons__card">
//         <img class="pokemons__img" src="https://picsum.photos/157" alt="pokemon img">
//         <hr class="pokemons__line">
//         <div class="pokemons__content">
//             <div class="pokemons__header">
//                 <h3 class="pokemons__title">${title}</h3>
//                 <button class="pokemons__item-btn"><i class="far fa-heart"></i></button>
//             </div>
//             <p class="pokemons__type2">${type}</p>
//             <div class="pokemons__wh">
//                 <p class="pokemons__weight">${weight}</p>
//                 <p class="pokemons__height">${height}</p>
//             </div>
//         </div>
//     </li>`
//     cartItem.innerHTML = cartItemContents;
//     elCartWrapper.append(cartItem)
// }

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

cartBtn.addEventListener('click', (e) =>{
    
})
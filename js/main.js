const main = document.querySelector('.contenedor');
const spinner = document.querySelector('#spinner');
const previous = document.querySelector('#previous');
const next = document.querySelector('#next');

/*Rando de personajes mostrados*/
let offset = 1;
let limit = 14;

previous.addEventListener("click", () => {
    /*offset 1 es la primer pantalla*/
    if (offset != 1) {
        offset -= 15;
        removeChildNodes(main);
        fetchCharacters(offset, limit);
    }
});

next.addEventListener("click", () => {
    offset += 15;
    removeChildNodes(main);
    fetchCharacters(offset, limit);
});

async function fetchCharacter(id) {
    const res = await fetch(`https://rickandmortyapi.com/api/character/${id}`);
    const data = await res.json();
    createCharacter(data);
    /*Spinner oculto*/
    spinner.style.display = "none";
}

function fetchCharacters(offset, limit) {
    /*Spinner se muestra*/
    spinner.style.display = "block";
    for (let i = offset; i <= offset + limit; i++) {
        fetchCharacter(i);
    }
}

function createCharacter(personaje) {
    const character__card = document.createRange().createContextualFragment(
        /*HTML*/
        `
        <div class="character__card">
            <div class="img__container">
                <img src="${personaje.image}" alt="Personaje">
            </div>
            <div class="info__container">
                <p class="character__name">${personaje.name}</p>
                <p class="character__type">${personaje.species}</p>
                <p class="character__status">${personaje.status}</p>
            </div>
        </div>
        `
    );

    main.append(character__card);

    /*Spinner oculto*/
    spinner.style.display = "none";
}

function removeChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

fetchCharacters(offset, limit);
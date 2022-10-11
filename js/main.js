const spinner = document.querySelector('#spinner');

function getCharacters(done) {
    const results = fetch('https://rickandmortyapi.com/api/character/?page=24');
    results
        .then(response => response.json())
        .then(data => {
            done(data);
        });
    /*Spinner se muestra*/
    spinner.style.display = "block";
}

getCharacters(data => {

    data.results.forEach(personaje => {
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

        const main = document.querySelector('.contenedor');
        main.append(character__card);

        /*Spinner oculto*/
        spinner.style.display = "none";

    });
});
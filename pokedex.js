const ul$$ = document.querySelector('ul');
const div$$ = document.querySelector('div');
const main$$ = document.querySelector('main');
let charRes = [];
const getPokemon = async () => {
    for (i = 1; i < 152; i++) {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}`);
        const res = await response.json();
        charRes.push(res);
        console.log(res);
    }

    return charRes;
};

const mapCharacters = (characters) => {
    // console.log(characters);
    return characters.map((character) => ({
        name: character.name,
        image: character.sprites['front_shiny'],
        type: character.types.map((type) => type.type.name).join(', '),
        id: character.id,
        abilities: character.abilities[0].ability.name,
        experience: character.base_experience,
    }));
};

const draw = (characters) => {
    // console.log(characters);
    ul$$.innerHTML = '';
    for (const character of characters) {
        const li$$ = document.createElement('li');
        ul$$.appendChild(li$$);
        li$$.innerHTML += `
        <div class="card">
        <div class="face front">
        <h2>${character.name} </h2>
        <img src='${character.image}' alt='${character.name}'>
        </div>
        <div class="face back">
            <p>Orden: ${character.id}</p>
            <h2>Nombre: ${character.name} </h2>
            <p>Tipo: ${character.type}</p>
            <p>Hability:${character.abilities}</p>
            <p>Experience:${character.experience}</p>
            </div>
</div>
`;
    }
};

const takeInput = (characters) => {
    // console.log(characters);
    const input$$ = document.querySelector('input');
    input$$.addEventListener('input', () =>
        searchCharacter(characters, input$$.value)
    );
    // console.log(input$$.value);
};

const searchCharacter = (arrayCharacters, filtro) => {
    let filteredCharacters = arrayCharacters.filter((character) =>
        character.name.toLowerCase().includes(filtro.toLowerCase())
    );
    draw(filteredCharacters);
};

const init = async () => {
    const characters = await getPokemon();
    // console.log(characters);
    const mapedCharacters = mapCharacters(characters);
    // console.log(mapedCharacters);
    draw(mapedCharacters);
    takeInput(mapedCharacters);
};
init();

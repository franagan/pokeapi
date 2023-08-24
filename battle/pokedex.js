const ul$$ = document.querySelector('ul');
const div$$ = document.querySelector('div');
const main$$ = document.querySelector('main');

let charRes = [];
let pokedex = [];
let battle = [];
let res = 0;
const getPokemon = async () => {
    for (i = 1; i < 152; i++) {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}`);
        res = await response.json();
        //  console.log(res);
        charRes.push(res);
    }
    return charRes;
};

// const getPokedex = async () => {
//     for (i = 1; i < 29; i++) {
//         const response = await fetch(`https://pokeapi.co/api/v2/pokedex/${i}`);
//         resPokedex = await response.json();
//         console.log(resPokedex);
//         charRes.push(resPokedex);
//     }
//     return pokedex;
// };

const mapCharacters = (characters) => {
    // console.log(characters);
    return characters.map((character) => ({
        name: character.name,
        image: character.sprites['front_default'],
        type: character.types.map((type) => type.type.name).join(', '),
        id: character.id,
    }));
};

const draw = (characters) => {
    // console.log(characters);
    ul$$.innerHTML = '';
    for (const character of characters) {
        const li$$ = document.createElement('li');
        ul$$.appendChild(li$$);
        li$$.innerHTML += `
<p>Orden: ${character.id}</p>
<P>Tipo: ${character.type}</P>
<h2>Nombre: ${character.name} </h2>
<img src='${character.image}' alt='${character.name}'>
`;
        li$$.addEventListener('click', () => {
            alert(`has seleccionado a ${character.name}`);
            battle.push(character.name);
            console.log(battle);
            battlePokemon(mapedCharacters, battle);
            li$$.innerHTML = ``;
        });
    }
};

const battlePokemon = (characters, battle) => {
    ul$$.innerHTML = '';
    for (const battlePokemonName of battle) {
        const battlePokemon = characters.find(
            (character) => character.name === battlePokemonName
        );
        const li$$ = document.createElement('li');
        ul$$.appendChild(li$$);
        li$$.innerHTML += `
<p>Orden: ${battlePokemon.id}</p>
<P>Tipo: ${battlePokemon.type}</P>
<h2>Nombre: ${battlePokemon.name} </h2>
<img src='${battlePokemon.image}' alt='${battlePokemon.name}'>
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

    // const charactersPokedex = await getPokedex();
    // console.log(charactersPokedex);

    const mapedCharacters = mapCharacters(characters);
    // console.log(mapedCharacters);

    draw(mapedCharacters);

    takeInput(mapedCharacters);
};
init();

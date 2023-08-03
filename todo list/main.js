const ul$$ = document.querySelector('ul');
const button$$ = document.querySelector('button');
const input$$ = document.querySelector('input');
const form$$ = document.querySelector('form');

// class Task {
//     constructor(nuevaTarea) {
//         this.nuevaTarea = nuevaTarea;
//     }
// }
let tasks = [];
const takeInput = (info) => {
    form$$.addEventListener('submit', (event) => {
        event.preventDefault();
        const task = form$$.name.value;
        console.log(task);
        tasks.push(task);
        console.log(tasks);
    });
};
const draw = () => {
    button$$.addEventListener('click', () => {
        // input$$.value = '';
        const li$$ = document.createElement('li');
        ul$$.appendChild(li$$);
        li$$.innerHTML = `<strong>Nueva tarea  </strong>:  ${form$$.name.value} <button onclick="" id='btn-delete'> X </button>`;
        const deleteButton = document.getElementById('btn-delete');
        deleteButton.addEventListener('click', (event) => {
            console.log(event);
            li$$.innerHTML = '';
        });
    });
};

for (const task of tasks) {
    console.log(task);
}

const init = () => {
    takeInput();

    draw();
};

init();

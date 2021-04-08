import AddTodo from './components/add-todo.js';

export default class View {
    constructor() {
        this.model = null;
        this.table = document.querySelector('#table');
        this.addTodoForm = new AddTodo();
        this.addTodoForm.onClick((titulo, desc) => this.addTodo(titulo, desc));


    }

    setModel(model) {
        this.model = model;
    }

    addTodo(titulo, desc) {
        const todo = this.model.addTodo(titulo, desc);
        this.createRow(todo);
    }

    removeTodo(id) {
        this.model.removeTodo(id);
        document.getElementById(id).remove();
    }

    toggleCompleted(id) {
        this.model.toggleCompletedTodo(id);
    }

    createRow(todo) {
        const row = table.insertRow();
        row.setAttribute('id', todo.id);
        row.innerHTML = `
            <td>
                ${todo.titulo}
            </td>
            <td>
                ${todo.desc}
            </td>
            <td class="text-center">
            </td>
            <td class="text-right">
                <button class="btn btn-primary mb-1">
                    <i class="fa fa-pencil"></i>
                </button>
            </td>
        `;

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = todo.completed;
        checkbox.addEventListener('click', () => this.toggleCompleted(todo.id));
        row.children[2].append(checkbox);

        const removeBtn = document.createElement('button');
        removeBtn.classList.add('btn', 'btn-danger', 'mb-1', 'ml-1');
        removeBtn.innerHTML = `<i class="fa fa-trash"></i>`;
        removeBtn.addEventListener('click', () => {
            this.removeTodo(todo.id);
        });
        row.children[3].append(removeBtn);
    }

    render() {
        this.model.getTodos()
            .forEach((todo) => {
                this.createRow(todo);
            });
    }
}
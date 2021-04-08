import AddTodo from './components/add-todo.js';
import Modal from './components/modal.js';
import Filters from './components/filters.js';

export default class View {
    constructor() {
        this.model = null;
        this.table = document.querySelector('#table');
        this.addTodoForm = new AddTodo();
        this.modal = new Modal();
        this.filters = new Filters();

        this.addTodoForm.onClick((titulo, desc) => this.addTodo(titulo, desc));
        this.modal.onClick((id, values) => this.editTodo(id, values));
        this.filters.onClick((filters) => this.filters(filters));

    }

    setModel(model) {
        this.model = model;
    }

    addTodo(titulo, desc) {
        const todo = this.model.addTodo(titulo, desc);
        this.createRow(todo);
    }

    editTodo(id, values) {
        // console.log(id);
        // console.log(values);
        this.model.editTodo(id, values);
        const row = document.getElementById(id);
        row.children[0].innerText = values.titulo;
        row.children[1].innerText = values.desc;
        row.children[2].children[0].checked = values.completed;
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
            </td>
        `;

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = todo.completed;
        checkbox.addEventListener('click', () => this.toggleCompleted(todo.id));
        row.children[2].append(checkbox);

        const editBtn = document.createElement('button');
        editBtn.classList.add('btn', 'btn-primary', 'mb-1');
        editBtn.innerHTML = `<i class="fa fa-pencil"></i>`;
        editBtn.setAttribute('data-toggle', 'modal');
        editBtn.setAttribute('data-target', '#modal');
        editBtn.addEventListener('click', () => {
            this.modal.setValues({
                id: todo.id,
                titulo: row.children[0].innerText,
                desc: row.children[1].innerText,
                completed: row.children[2].children[0].checked
            });
            console.log('editar btn');
        });
        row.children[3].append(editBtn);

        const removeBtn = document.createElement('button');
        removeBtn.classList.add('btn', 'btn-danger', 'mb-1', 'ml-1');
        removeBtn.innerHTML = `<i class="fa fa-trash"></i>`;
        removeBtn.addEventListener('click', () => this.removeTodo(todo.id));
        row.children[3].append(removeBtn);
    }

    render() {
        this.model.getTodos()
            .forEach((todo) => {
                this.createRow(todo);
            });
    }
}
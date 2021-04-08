export default class Model {

    constructor() {
        this.view = null;
        this.todos = JSON.parse(localStorage.getItem('todos'));
        if (!this.todos || this.todos.length < 1) {
            this.todos = [{
                id: 0,
                titulo: 'learn JS',
                desc: 'aprendiendo js',
                completed: false,
            }];
            this.currentId = 1;
        } else {
            this.currentId = this.todos[this.todos.length - 1].id + 1;
        }

    }

    setView(view) {
        this.view = view;
    }

    getTodos() {
        return this.todos.map((todo) => ({...todo }));
    }

    save() {
        localStorage.setItem('todos', JSON.stringify(this.todos));
    }

    toggleCompletedTodo(id) {
        const index = this.todos.findIndex((todo) => todo.id === id);
        const todo = this.todos[index];
        todo.completed = !todo.completed;
        this.save();
        console.log(this.todos);
    }

    removeTodo(id) {
        const index = this.todos.findIndex((todo) => todo.id === id);
        this.todos.splice(index, 1);
        this.save();
        // console.log(this.todos[index]);

    }

    addTodo(titulo, desc) {
        const todo = {
            id: this.currentId++,
            titulo,
            desc,
            completed: false
        };

        this.todos.push(todo);
        console.log(this.todos);
        this.save();
        return {...todo };
    }

    editTodo(id, values) {
        // console.log(id);
        // console.log(values);

        const index = this.todos.findIndex((todo) => todo.id === id);
        Object.assign(this.todos[index], values);
        this.save();
    }
}
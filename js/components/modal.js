import Alert from './alert.js';

export default class Modal {

    constructor() {
        this.title = document.getElementById('modal-title');
        this.description = document.getElementById('modal-description');
        this.btn = document.getElementById('modal-btn');
        this.completed = document.getElementById('modal-completed');
        this.id = null;
        this.alert = new Alert('modal-alert');
    }

    setValues(todo) {
        this.title.value = todo.titulo;
        this.description.value = todo.desc;
        this.completed.checked = todo.completed;
        this.id = todo.id;
    }

    onClick(callback) {
        this.btn.onclick = () => {
            if (!this.title.value || !this.description.value) {
                console.log('error');
                this.alert.show('ERROR LOS VALORES NO DEBEN IR VACIOS');
                return;
            }

            $('#modal').modal('toggle');
            this.alert.hide();
            callback(this.id, {
                titulo: this.title.value,
                desc: this.description.value,
                completed: this.completed.checked
            });

        }
    }
}
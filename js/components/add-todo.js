import Alert from './alert.js';

export default class AddTodo {

    constructor() {
        this.add = document.querySelector('#add');
        this.titulo = document.querySelector('#title');
        this.desc = document.querySelector('#description');
        this.alert = new Alert('alert');
    }

    onClick(callback) {
        this.add.onclick = () => {
            if (this.titulo.value === '' || this.desc.value === '') {
                console.log('error');
                this.alert.show('ERROR LOS VALORES NO DEBEN IR VACIOS');
            } else {
                this.alert.hide();
                callback(this.titulo.value, this.desc.value);
            }
        }
    }
}
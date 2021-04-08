export default class Filters {

    constructor() {
        this.form = document.getElementById('filters');
        this.btn = document.getElementById('serach');
    }

    onClick(callback) {
        this.btn.onclick = (e) => {
            callback({

            })
        }
    }
}
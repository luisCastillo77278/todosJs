document.addEventListener('DOMContentLoaded', () => {
    console.log('cargado');
    const titulo = document.querySelector('#title');
    const desc = document.querySelector('#description');
    const alert = document.querySelector('#alert');
    const table = document.querySelector('#table');
    const add = document.querySelector('#add');
    let id = 1;

    const removeTodo = (id) => {
        console.log(id);
        document.getElementById(id).remove();
    }

    const addTodo = () => {
        if (titulo.value === '' || desc.value === '') {
            console.log('error');
            alert.classList.remove('d-none');
            alert.innerText = 'Error los valores no deben ir vacios';
            return;
        }

        alert.classList.add('d-none');

        const row = table.insertRow();
        row.setAttribute('id', id++);
        row.innerHTML = `
            <td>
                ${titulo.value}
            </td>
            <td>
                ${desc.value}
            </td>
            <td class="text-center">
                <input type="checkbox">
            </td>
            <td class="text-right">
                <button class="btn btn-primary mb-1">
                    <i class="fa fa-pencil"></i>
                </button>
            </td>
        `;

        const removeBtn = document.createElement('button');
        removeBtn.classList.add('btn', 'btn-danger', 'mb-1', 'ml-1');
        removeBtn.innerHTML = `<i class="fa fa-trash"></i>`;
        removeBtn.addEventListener('click', (e) => {
            removeTodo(row.getAttribute('id'));
        });
        row.children[3].append(removeBtn);
    };

    add.addEventListener('click', addTodo);
});
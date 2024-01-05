function tableRoutes(data) {
    let table = document.getElementById('routes-table');
    data.forEach(function (item) {
        let row = table.insertRow();
        let cell1 = row.insertCell(0);
        let cell2 = row.insertCell(1);
        let cell3 = row.insertCell(2);
        cell1.textContent = item.name;
        cell2.textContent = item.description;
        cell3.textContent = item.mainObject;
        let selectBtn = document.createElement('button');
        selectBtn.textContent = 'Выбрать';
        let cell4 = row.insertCell(3);
        cell4.appendChild(selectBtn);
    });
}

function getTableDataRoutes() {
    let xhr = new XMLHttpRequest();
    let url = 'http://exam-2023-1-api.std-900.ist.mospolytech.ru/api/routes?api_key=d8a17ec0-cc0e-4936-97d0-47b70d19ffc0';
    xhr.open('GET', url);
    xhr.responseType = 'json';
    xhr.onload = function () {
        if (xhr.status === 200) {
            let data = xhr.response;
            tableRoutes(data);
        } else {
            console.error('Не удалось получить данные: ' + xhr.status);
        }
    };
    xhr.send();
    console.log(url);
}

document.getElementById('button-search').addEventListener('click', function () {
    let input = document.querySelector('.form-control');
    let filter = input.value.toUpperCase();
    let table = document.getElementById('routes-table');
    let tr = table.getElementsByTagName('tr');

    for (i = 0; i < tr.length; i++) {
        let td = tr[i].getElementsByTagName('td')[0];
        if (td) {
            let txtValue = td.textContent || td.innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = '';
            } else {
                tr[i].style.display = 'none';
            }
        }
    }
});

window.onload = function () {
    getTableDataRoutes();
};

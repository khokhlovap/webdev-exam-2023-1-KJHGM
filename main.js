// function tableRoutes(data) {
//     let table = document.getElementById('routes-table');
//     data.forEach(function (item) {
//         let row = table.insertRow();
//         let cell1 = row.insertCell(0);
//         let cell2 = row.insertCell(1);
//         let cell3 = row.insertCell(2);
//         cell1.textContent = item.name;
//         cell2.textContent = item.description;
//         cell3.textContent = item.mainObject;
//         let selectBtn = document.createElement('button');
//         selectBtn.textContent = 'Выбрать';
//         let cell4 = row.insertCell(3);
//         cell4.appendChild(selectBtn);
//     });
// }


const pageSize = 5;
let currentPage = 1; 
const tableHeader = document.getElementById('routes-table').getElementsByTagName('thead')[0].innerHTML;

function tableRoutes(data) {
    let table = document.getElementById('routes-table');
    let tbody = document.getElementById('table-body-routes');
    tbody.innerHTML = ''; 
   
    table.getElementsByTagName('thead')[0].innerHTML = tableHeader;

    const totalPages = Math.ceil(data.length / pageSize);
    let pagination = document.getElementById('pagination');
    pagination.innerHTML = '';
    for (let i = 1; i <= totalPages; i++) {
        let li = document.createElement('li');
        let btn = document.createElement('button');
        btn.textContent = i;
        btn.addEventListener('click', function () {
            currentPage = i;
            updateTable(data);
        });
        li.appendChild(btn);
        pagination.appendChild(li);
    }

    const start = (currentPage - 1) * pageSize;
    const end = currentPage * pageSize;

    data.slice(start, end).forEach(function (item) {
        let row = table.insertRow();
        let cell1 = row.insertCell(0);
        let cell2 = row.insertCell(1);
        let cell3 = row.insertCell(2);
        cell1.textContent = item.name;
        cell2.textContent = item.description;
        cell3.textContent = item.mainObject;
        let selectBtn = document.createElement('button');
        selectBtn.textContent = 'Выбрать';
        selectBtn.onclick = function () {
            getTableDataGid(item.id);
            idRoute = item.id;
            console.log(idRoute);
        };

        let cell4 = row.insertCell(3);
        cell4.appendChild(selectBtn);
    });
}

function updateTable(data) {
    tableRoutes(data);
    
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

function routesDropdown() {
    let dropdown = document.querySelector('.dropdown-menu');
    let xhr = new XMLHttpRequest();
    let url = 'http://exam-2023-1-api.std-900.ist.mospolytech.ru/api/routes?api_key=d8a17ec0-cc0e-4936-97d0-47b70d19ffc0';
    xhr.open('GET', url);
    xhr.onload = function () {
        if (xhr.status === 200) {
            let data = JSON.parse(xhr.responseText);
            let items = [];
            data.forEach(function (item) {
                let parts = item.mainObject.split('-').map(part => part.trim());
                parts.forEach(part => {
                    if (items.indexOf(part) === -1) {
                        items.push(part);
                        let listItem = document.createElement('li');
                        let link = document.createElement('a');
                        link.textContent = part;
                        listItem.appendChild(link);
                        dropdown.appendChild(listItem);
                    }
                });
            });
        } else {
            console.error('Не удалось получить данные: ' + xhr.status);
        }
    };
    xhr.send();
}



function tableGid(data) {
    let table = document.getElementById('gid-table');
    
    data.forEach(function (item) {
        let row = table.insertRow();
        let cell1 = row.insertCell(0);
        let cell2 = row.insertCell(1);
        let cell3 = row.insertCell(2);
        let cell4 = row.insertCell(3);
        let cell5 = row.insertCell(4);
        cell2.textContent = item.name;
        cell3.textContent = item.language;
        cell4.textContent = item.workExperience;
        cell5.textContent = item.pricePerHour;

        let selectBtn2 = document.createElement('button');
        selectBtn2.textContent = 'Выбрать';
        selectBtn2.onclick = function () {
        };
        let cell6 = row.insertCell(5); 
        cell6.appendChild(selectBtn2);
    });
}


document.querySelector('.dropdown-menu').addEventListener('click', function (event) {
    if (event.target.tagName === 'A') {
        let filterValue = event.target.textContent;
        console.log(filterValue);
        table = document.getElementById('routes-table');
        rows = table.getElementsByTagName('tr');

        for (let row of rows) {
            let cells = row.cells;
            let cellValue = cells[cells.length - 2].textContent;
            if (cellValue.includes(filterValue)) {
                row.style.display = '';
            } else {
                row.style.display = 'none';
            }
        }
    }
});

const tableHeader2 = document.getElementById('gid-table').getElementsByTagName('thead')[0].innerHTML;
function getTableDataGid(route_id) {
    let table = document.getElementById('gid-table');
    let tbody = document.getElementById('table-body-gid');
    tbody.innerHTML = ''; 
   
    table.getElementsByTagName('thead')[0].innerHTML = tableHeader2;
    
    let xhr = new XMLHttpRequest();
    let url = `http://exam-2023-1-api.std-900.ist.mospolytech.ru/api/routes/${route_id}/guides?api_key=d8a17ec0-cc0e-4936-97d0-47b70d19ffc0`;
    xhr.open('GET', url);
    xhr.responseType = 'json';
    xhr.onload = function () {
        if (xhr.status === 200) {
            let data = xhr.response;
            tableGid(data);
        } else {
            console.error('Не удалось получить данные:  ' + xhr.status);
        }
    };
    xhr.send();
}

window.onload = function () {
    getTableDataRoutes();
    routesDropdown();


  

};

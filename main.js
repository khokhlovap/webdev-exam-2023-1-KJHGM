const pageSize = 10;
let currentPage = 1; 
const maxPages = 3;
const tableHeader = document.getElementById('routes-table').getElementsByTagName('thead')[0].innerHTML;

function tableRoutes(data) {
    let table = document.getElementById('routes-table');
    let tbody = document.getElementById('table-body-routes');
    tbody.innerHTML = ''; 
   
    table.getElementsByTagName('thead')[0].innerHTML = tableHeader;
    const totalPages = Math.ceil(data.length / pageSize);
    let pagination = document.getElementById('pagination');
    pagination.innerHTML = '';

    let startPage = 1;
    let endPage = totalPages;

    if (totalPages > maxPages) {
        startPage = Math.max(1, currentPage - Math.floor(maxPages / 2));
        endPage = Math.min(totalPages, startPage + maxPages - 1);

        if (endPage - startPage < maxPages - 1) {
        startPage = endPage - maxPages + 1;
        }
    }

    if (currentPage > 1) {
        let previousBtn = document.createElement('button');
        previousBtn.textContent = 'Назад';
        previousBtn.classList.add('page-link');
        previousBtn.addEventListener('click', function () {
        currentPage--;
        updateTable(data);
        });
        pagination.appendChild(previousBtn);
    }

    for (let i = startPage; i <= endPage; i++) {
        let li = document.createElement('li');
        let btn = document.createElement('button');
        btn.classList.add('page-link');
        btn.textContent = i;
        if (i === currentPage) {
          btn.disabled = true;
        }
        btn.addEventListener('click', function () {
          currentPage = i;
          updateTable(data);
        });
        li.appendChild(btn);
        pagination.appendChild(li);
      }
    
      if (currentPage < totalPages) {
        let nextBtn = document.createElement('button');
        nextBtn.textContent = 'Вперед';
        nextBtn.classList.add('page-link');
        nextBtn.addEventListener('click', function () {
          currentPage++;
          updateTable(data);
        });
        pagination.appendChild(nextBtn);
      }

    const start = (currentPage - 1) * pageSize;
    const end = currentPage * pageSize;

    data.slice(start, end).forEach(function (item) {
        let row = tbody.insertRow();
        let cell1 = row.insertCell(0);
        let cell2 = row.insertCell(1);
        let cell3 = row.insertCell(2);
        cell1.textContent = item.name;
        cell2.textContent = item.description;
        cell3.textContent = item.mainObject;
        let selectBtn = document.createElement('button');
        selectBtn.textContent = 'Выбрать';
        selectBtn.onclick = function () {
            document.getElementById('nameRoute').value = item.name;
            document.getElementById('showRoutes').value = item.name;
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
    let dropdown = document.getElementById('selectRoutes');
    let xhr = new XMLHttpRequest();
    let url = 'http://exam-2023-1-api.std-900.ist.mospolytech.ru/api/routes?api_key=d8a17ec0-cc0e-4936-97d0-47b70d19ffc0';
    xhr.open('GET', url);
    xhr.onload = function () {
        if (xhr.status === 200) {
            let data = JSON.parse(xhr.responseText);
            dropdown.innerHTML = '';
            let notSelectedOption = document.createElement('option');
            notSelectedOption.value = "";
            notSelectedOption.textContent = "Не выбрано";
            selectRoutes.appendChild(notSelectedOption);
            data.forEach(function (item) {
                let parts = item.mainObject.split('- ').map(part => part.trim());
                parts.forEach(part => {
                  let option = document.createElement('option');
                  option.value = item.id;
                  option.textContent = part; 
                  selectRoutes.appendChild(option);
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
            document.getElementById('showNameGid').value = item.name;
        };
        let cell6 = row.insertCell(5); 
        cell6.appendChild(selectBtn2);
    });
}

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
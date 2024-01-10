const pageSize = 5;
let currentPage = 1;
const maxPages = 3;

function updateTable(data) {
    tableApplication(data);
}


function tableApplication(data) {

    let tbody = document.getElementById('table-body-application');
    tbody.innerHTML = '';
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
        previousBtn.id = "scrollPrevious";
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
        btn.id = "scrollBtn";
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
        nextBtn.id = "scrollNext";
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
        let cell4 = row.insertCell(3);
        // cell1.textContent = item.name;
        cell3.textContent = item.date;
        cell4.textContent = item.price;
        // let id_name=item.route_id;
        // console.log(id_name);
     

        // let selectBtn = document.createElement('button');
        // selectBtn.textContent = 'Выбрать';
        // selectBtn.onclick = function () {
        //     getTableDataGid(item.id);
        //     languageDropdown(item.id);
        //     idRoute = item.id;
        //     console.log(idRoute);
        // };
        // let cell5 = row.insertCell(3);
        // cell5.appendChild(selectBtn);
    });
}

function getTableApplication() {
    let xhr = new XMLHttpRequest();
    let url = 'http://exam-2023-1-api.std-900.ist.mospolytech.ru/api/orders?api_key=d8a17ec0-cc0e-4936-97d0-47b70d19ffc0';
    xhr.open('GET', url);
    xhr.responseType = 'json';
    xhr.onload = function () {
        if (xhr.status === 200) {
            let data = xhr.response;
            tableApplication(data);
        } else {
            console.error('Не удалось получить данные: ' + xhr.status);
        }
    };
    xhr.send();
    console.log(url);
}

window.onload = function () {
    
    getTableApplication();
   
};
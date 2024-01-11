const pageSize = 10;
let currentPage = 1;
const maxPages = 3;
const tableHeader = document.getElementById('routes-table').getElementsByTagName('thead')[0].innerHTML;
let idRoute;
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
        previousBtn.id = "scrollPrevious";
        previousBtn.addEventListener('click', function () {
            currentPage--;
            updateTable(data);
            let scrollheader = document.getElementById('listRouters');
            scrollheader.scrollIntoView({ behavior: 'smooth', block: 'start' });
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
            let scrollheader = document.getElementById('listRouters');
            scrollheader.scrollIntoView({ behavior: 'smooth', block: 'start' });
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
            let scrollheader = document.getElementById('listRouters');
            scrollheader.scrollIntoView({ behavior: 'smooth', block: 'start' });
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
            languageDropdown(item.id);
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
            alert('Не удалось получить данные таблицы');
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
            dropdown.appendChild(notSelectedOption);
            data.forEach(function (item) {
                let parts = item.mainObject.split('- ').map(part => part.trim());
                parts.forEach(part => {
                    let option = document.createElement('option');
                    option.value = item.id;
                    option.textContent = part;
                    dropdown.appendChild(option);
                });
            });
        } else {
            alert('Не удалось получить данные об маршрутах');
            console.error('Не удалось получить данные: ' + xhr.status);
        }
    };
    xhr.send();
}

let idGid;
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
        let img = document.createElement('img');
        img.src = '1.png';
        img.width = 50;
        img.height = 50;
        cell1.appendChild(img);
        let selectBtn2 = document.createElement('button');
        selectBtn2.textContent = 'Выбрать';
        selectBtn2.onclick = function () {
            document.getElementById('showNameGid').value = item.name;
            idGid = item.id;
            console.log(idGid);
        };
        let cell6 = row.insertCell(5);
        cell6.appendChild(selectBtn2);
    });
}

const tableHeader2 = document.getElementById('gid-table').getElementsByTagName('thead')[0].innerHTML;
function getTableDataGid(route_id) {
    let table = document.getElementById('gid-table');
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
            alert('Не удалось получить данные таблицы');
            console.error('Не удалось получить данные:  ' + xhr.status);
        }
    };
    xhr.send();
}

function languageDropdown(route_id) {
    let dropdown = document.getElementById('selectLanguage');
    let table = document.getElementById('gid-table');
    let xhr = new XMLHttpRequest();
    let url = `http://exam-2023-1-api.std-900.ist.mospolytech.ru/api/routes/${route_id}/guides?api_key=d8a17ec0-cc0e-4936-97d0-47b70d19ffc0`;
    xhr.open('GET', url);
    xhr.onload = function () {
        if (xhr.status === 200) {
            let data = JSON.parse(xhr.responseText);
            dropdown.innerHTML = '';
            let notSelectedOption = document.createElement('option');
            notSelectedOption.value = "";
            notSelectedOption.textContent = "Не выбрано";
            dropdown.appendChild(notSelectedOption);
            let languages = [];
            data.forEach(function (item) {
                if (!languages.includes(item.language)) {
                    let option = document.createElement('option');
                    option.textContent = item.language;
                    dropdown.appendChild(option);
                    languages.push(item.language);
                }
            });

            dropdown.addEventListener('change', function () {
                let selectedLanguage = dropdown.value;
                Array.from(table.rows).forEach(function (row, index) {
                    if (index !== 0 && row.cells.length > 2) {
                        let cellValue = row.cells[2].textContent;
                        if (cellValue.toLowerCase() === selectedLanguage.toLowerCase()) {
                            row.style.display = '';
                        } else {
                            row.style.display = 'none';
                        }
                    }
                });
            });

        } else {
            alert('Не удалось получить данные');
            console.error('Не удалось получить данные: ' + xhr.status);
        }
    };
    xhr.send();
}

function workFilter() {
    let from = document.getElementById('from');
    let to = document.getElementById('to');
    let table = document.getElementById('gid-table');

    function filter() {
        let fromValue = parseInt(from.value);
        let toValue = parseInt(to.value);

        Array.from(table.rows).forEach(function (row, index) {
            if (index !== 0 && row.cells.length > 3) {
                let cellValue = parseInt(row.cells[3].textContent);
                if (!isNaN(fromValue) && !isNaN(toValue) && cellValue >= 
                fromValue && cellValue <= toValue) {
                    row.style.display = '';
                } else {
                    row.style.display = 'none';
                }
            }
        });
    }
    from.addEventListener('input', filter);
    to.addEventListener('input', filter);
}

let btn = document.getElementById('create');
btn.addEventListener('click', function () {
    let xhr = new XMLHttpRequest();
    let url = 'http://exam-2023-1-api.std-900.ist.mospolytech.ru/api/orders?api_key=d8a17ec0-cc0e-4936-97d0-47b70d19ffc0';
    let guide_id = idGid;
    console.log(guide_id);
    let route_id = idRoute;
    console.log(route_id);
    let date = document.getElementById('date').value;
    console.log(date);
    let time = document.getElementById('time').value + ':00';
    console.log(time);
    let duration = document.getElementById('list').value;
    let persons = document.getElementById('person').value;
    let price = document.getElementById('price').value;
    let optionFirst = Number(document.getElementById('salePensioners').checked);
    let optionSecond = Number(document.getElementById('saleSurdo').checked);

    let data = new FormData();
    data.append("guide_id", guide_id);
    data.append("route_id", route_id);
    data.append("date", date);
    data.append("time", time);
    data.append("duration", duration);
    data.append("persons", persons);
    data.append("price", price);
    data.append("optionFirst", optionFirst);
    data.append("optionSecond", optionSecond);


    xhr.withCredentials = true;

    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === 4) {
            alert('Заявка отправлена');
            console.log(this.responseText);
        }
    });

    xhr.open("POST", url);
    xhr.send(data);

});

const map = new mapgl.Map('myMapId', {
    key: '0450e79e-4ef9-4dd5-a04b-269f4e8d15e6',
    center: [37.617874, 55.755713],
    zoom: 13,
});
const marker = new mapgl.Marker(map, {
    coordinates: [37.617874, 55.755713],
    label: {
        text: "Офис",
        offset: [0, -75],
        image: {
            url: 'https://docs.2gis.com/img/mapgl/tooltip.svg',
            size: [100, 40],
            padding: [10, 10, 20, 10],
        },
    }
});

window.onload = function () {
    getTableDataRoutes();
    routesDropdown();
    languageDropdown();
    workFilter();
};
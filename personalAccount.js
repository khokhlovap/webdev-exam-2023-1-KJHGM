let currentPage = 1;
let recordsPerPage = 5;
let nameData = [];
let dateCostData = [];
let table = document.getElementById('application-table');
function fetchData(url, callback) {
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                let data = JSON.parse(xhr.responseText);
                callback(data);
            } else {
                alert('Не удалось получить данные таблицы');
                console.error('Не удалось получить данные: ' + xhr.status);
            }
        }
    };
    xhr.open('GET', url);
    xhr.send();
};
const tableHeader = document.getElementById('application-table').getElementsByTagName('thead')[0].innerHTML;
function displayData(start, end) {
    let table = document.getElementById('application-table');
    let tbody = document.getElementById('table-body-application');
    table.getElementsByTagName('thead')[0].innerHTML = tableHeader;
    tbody.innerHTML = '';
    for (let i = start; i < end; i++) {
        if (i < nameData.length) {
            let row = table.insertRow(table.rows.length);
            let cell1 = row.insertCell(0);
            let cell2 = row.insertCell(1);
            let cell3 = row.insertCell(2);
            let cell4 = row.insertCell(3);

            let matchingData = dateCostData.find(item => item.id === nameData[i].route_id);
            if (matchingData) {
                cell1.innerHTML = i + 1;
                cell2.innerHTML = matchingData.name;
                cell3.innerHTML = nameData[i].date;
                cell4.innerHTML = nameData[i].price;
            } else {
                console.error('Не удалось получить данные: ' + xhr.status);
            }
        }
    }
}

function prevPage() {
    if (currentPage > 1) {
        currentPage--;
        let start = (currentPage - 1) * recordsPerPage;
        let end = currentPage * recordsPerPage;
        displayData(start, end);
    }
}

function nextPage() {
    if (currentPage < Math.ceil(nameData.length / recordsPerPage)) {
        currentPage++;
        let start = (currentPage - 1) * recordsPerPage;
        let end = currentPage * recordsPerPage;
        displayData(start, end);
    }
}

fetchData('http://exam-2023-1-api.std-900.ist.mospolytech.ru/api/orders?api_key=d8a17ec0-cc0e-4936-97d0-47b70d19ffc0', function (data) {
    nameData = data;
    fetchData('http://exam-2023-1-api.std-900.ist.mospolytech.ru/api/routes?api_key=d8a17ec0-cc0e-4936-97d0-47b70d19ffc0', function (data) {
        dateCostData = data;
        displayData(0, recordsPerPage); 
    });
});
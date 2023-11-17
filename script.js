// Функция для проверки полей формы
function validateForm() {
  const xButtons = document.querySelectorAll('button[name="x"]');
  const yInput = document.getElementById('yInput');
  const rCheckboxes = document.querySelectorAll('input[name="r"]:checked');
  const errorMessage = document.getElementById('error-message');

  // Проверка значения X
  let xValue = null;
  for (const button of xButtons) {
    if (button.classList.contains('selected')) {
      xValue = parseFloat(button.value);
      break;
    }
  }
  if (xValue === null) {
    errorMessage.textContent = 'Пожалуйста, выберите значение X.';
    errorMessage.style.display = 'block';
    return false;
  }

  // Проверка значения Y
  const yValue = parseFloat(yInput.value);
  if (isNaN(yValue) || yValue < -3 || yValue > 3) {
    errorMessage.textContent = 'Неверное значение Y. Пожалуйста, введите число от -3 до 3.';
    errorMessage.style.display = 'block';
    return false;
  }

  // Проверка значения R
  if (rCheckboxes.length === 0) {
    errorMessage.textContent = 'Пожалуйста, выберите хотя бы одно значение R.';
    errorMessage.style.display = 'block';
    return false;
  }

  // Если все проверки пройдены, скрываем сообщение об ошибке и возвращаем true
  errorMessage.style.display = 'none';
  return true;
}


// Функция для обработки отправки формы
function handleSubmit(event) {
  event.preventDefault();

  if (!validateForm()) {
    return;
  }

  const xButtons = document.querySelectorAll('button[name="x"]');
  const yInput = document.getElementById('yInput');
  const rCheckboxes = document.querySelectorAll('input[name="r"]:checked');

  let xValue = null;
  for (const button of xButtons) {
    if (button.classList.contains('selected')) {
      xValue = parseFloat(button.value);
      break;
    }
  }
  const yValue = parseFloat(yInput.value);
  const rValues = Array.from(rCheckboxes).map((checkbox) => checkbox.value);

  for (let rValue of rValues){
    const requestData = {
      x: xValue,
      y: yValue,
      r: rValue,
    };
  
    const url = 'script.php?' + new URLSearchParams(requestData);
  
    const startTime = performance.now();
    if (requestData.x, requestData.y, requestData.r){
      fetch(url)
        .then((response) => response.json())
        .then((result) => {
          const endTime = performance.now();
          const requestTime = endTime - startTime;
          console.log(result);
          let savedResults = getSavedResults() || [];

          let resultData = {
            x: result.x,
            y: result.y,
            r: result.r,
            timeNow: new Date().toLocaleString(),
            time: parseFloat(result.extime),
            result: JSON.stringify(result.isInArea)
          };

          savedResults.push(resultData);
          localStorage.setItem('results', JSON.stringify(savedResults));
        })
        .catch((error) => {
          console.error('Ошибка:', error);
        });
    }
  };
}

function getSavedResults() {
  let savedResults = localStorage.getItem('results');
  return savedResults ? JSON.parse(savedResults) : [];
}

function displayPreviousResults(previousResults) {
  const previousResultsTable = document.getElementById('previous-results');

  // Делаем новую строку
  const headerRow = previousResultsTable.insertRow(0);
  const headers = ['X', 'Y', 'R', 'Time', 'Current Time', 'Point in ODZ'];

  headers.forEach((headerText, index) => {
    const headerCell = document.createElement('th');
    headerCell.textContent = headerText;
    headerRow.appendChild(headerCell);
  });

  previousResults.forEach((result, index) => {
    const newRow = previousResultsTable.insertRow(index + 1);
    const xCell = newRow.insertCell(0);
    const yCell = newRow.insertCell(1);
    const rCell = newRow.insertCell(2);
    const timeCell = newRow.insertCell(3);
    const currentTimeCell = newRow.insertCell(4);
    const pointInODZCell = newRow.insertCell(5);

    xCell.textContent = result.x;
    yCell.textContent = result.y;
    rCell.textContent = result.r;
    timeCell.textContent = result.time;
    currentTimeCell.textContent = new Date().toLocaleString();
    pointInODZCell.textContent = result.result;
  });
}



// Функция для обновления блока с результатами
function updateResults() {

  // Перкнаправление на  results.html
  window.location.href = 'results.html';
}

// Добавляем прослушиватели событий на кнопки X
const xButtons = document.querySelectorAll('button[name="x"]');
for (const button of xButtons) {
  button.addEventListener('click', () => {
    for (const otherButton of xButtons) {
      otherButton.classList.remove('selected');
    }
    button.classList.add('selected');
  });
}

// Добавляем прослушиватель событий на кнопку отправки формы
const form = document.getElementById('data-form');
form.addEventListener('submit', handleSubmit);
var resultButton = document.querySelector('button[type="result"]');

resultButton.addEventListener('click', updateResults);

function showError(message) {
  const errorDiv = document.getElementById('error_div');
  errorDiv.textContent = message;
  errorDiv.style.display = 'block';
  setTimeout(function () {
      errorDiv.style.display = 'none';
  }, 3000);
}


function validate (x, y, r){
  if (y>3 || y<-3){
    showError("ээээ");
    return false;
  }
  return true;
  if (x>1 || x<-5){
    showError("ужас");
    return false;
  }
  return true;
  if (r>5 || r<1){
    showError("устала");
    return false;
  }
  return true;
}

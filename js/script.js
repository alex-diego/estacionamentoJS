const form = document.querySelector('.form');
const { board, model } = form;
const table = document.querySelector('.table-body')


form.addEventListener('submit', registerCar);


function registerCar(event) {
  const time = new Date();
  const hours = time.getHours();
  const minutes = time.getMinutes();

  const car = {
    model: model.value,
    board: board.value,
    hours: hours < 10 ? `0${hours}` : hours,
    minutes: minutes < 10 ? `0${minutes}` : minutes
  }

  const garage = localStorage.getItem('garage');

  if (garage === null) {
    const cars = [car];

    localStorage.setItem('garage', JSON.stringify(cars))
  } else {
    const cars = JSON.parse(garage);

    cars.push(car)
    localStorage.setItem('garage', JSON.stringify(cars))
  }

  renderLayout()
  model.value = ''
  board.value = ''
  event.preventDefault()
}

function renderLayout() {

  if (localStorage.getItem('garage') === null) {
    return;
  }
  
  const cars = JSON.parse(localStorage.getItem('garage'));
  table.innerHTML = '';
  
  cars.forEach(car => {

    const layout = `
            <tr>
              <th>${car.model}</th>
              <th>${car.board}</th>
              <th>${car.hours}:${car.minutes}</th>
              <th><a class="btn-remove" onclick="removeCar('${car.board}')">Remover</a></th>
            </tr>
  `
    table.innerHTML += layout;
  });
}

function removeCar(board) {
  const garage = JSON.parse(localStorage.getItem('garage'));

  garage.forEach((car, index) => {
    if (car.board === board) {
      garage.splice(index, 1)
    }
  })

  localStorage.setItem('garage', JSON.stringify(garage))
  renderLayout();
}
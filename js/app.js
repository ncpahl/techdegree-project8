const directory = document.querySelector('.employees');
const modal = document.querySelector('.modal');
const peopleUrl = 'https://randomuser.me/api/?results=12&nat=us';
const overlay = document.querySelector('.overlay');
let employees = [];

//make request

fetch(peopleUrl)
  .then(response => response.json())
  .then(response => response.results)
  .then(generateHTML)
  .catch(error => console.log(error))

  // fetch(peopleUrl)
  //   .then(response => response.json())
  //   .then(response => response.results)
  //   .then(generateModal)
  //   .catch(error => console.log(error))

// Generate the data for each profile
function generateHTML(data) {
  employees = data;

  let cardHTML = '';

  employees.forEach((employee, index) => {

    cardHTML += `
      <div class="card" data-index="${index}">
      <img src="${employee.picture.large}">
      <h2>${employee.name.first} ${employee.name.last}</h2>
      <p>${employee.email}</p>
      <p>${employee.location.city}</p>
      </div>
      `;
  });

  directory.innerHTML = cardHTML;

}

// Generate the data for each profile
function generateModal(index) {

    let {name, dob, phone, email, location, picture} = employees[index];
    let date = new Date(dob.date);

    const modalHTML = `
      <span class="hidden">${index}</span>
      <button class="close">X</button>
      <div class="modal-content">
      <img src="${picture.large}">
      <h2>${name.first} ${name.last}</h2>
      <p>${email}</p>
      <p>${location.city}</p>
      <hr>
      <p>${phone}</p>
      <p>${location.street.number} ${location.street.name} <br>${location.city}, ${location.state} ${location.postcode}</p>
      <p>Birthday: ${date.getMonth()}/${date.getDate()}/${date.getFullYear()}</p>
      </div>
    `;

    overlay.classList.remove('hidden');
    modal.innerHTML = modalHTML;
}

//pop-up

directory.addEventListener('click', e => {
  if (e.target !== directory) {
    const card = e.target.closest('.card');
    const index = card.getAttribute('data-index');
    generateModal(index);
    return index;
  }

});

overlay.addEventListener('click', e => {
  if (e.target !== overlay) {
    overlay.classList.add('hidden');
  }

});

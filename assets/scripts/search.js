const pageForm = document.querySelector('form')
const userContainer = document.querySelector('.users')
const abbrevNames = document.querySelector('.image')
let users
// to display array of users

function displayUser ({ age, name }) {
  return `<div class="people">
  <div class="image">${initials(name)}</div>
  <div class="proper">
      <label for="name">Name:</label>
  <h2>${name}</h2>
  <label for="age">Age:</label>
  <p>${age} year(s)</p>
  </div>
</div> `
}

function initials (name) {
  return name
    .split(' ')
    .map((yo) => yo[0].toUpperCase())
    .join('.')
}

// transform the array f users
function displayUsers (persons) {
  return persons.length
    ? persons.map(displayUser).join('')
    : renderMsg('sorry! No user found')
}

function compareNames (name, searchTerm) {
  return name.toLowerCase().includes(searchTerm.toLowerCase())
}

function shouldRessolve () {
  return Math.random() < 0.75
}

// //search users amongst the array of users
function searchUsers (name, age) {
  //   return users.filter(
  //     (user) =>
  //       (!name || compareNames(user.name, name)) && (!age || user.age === age)
  //   );
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldRessolve()) {
        resolve(
         users.filter(
            (user) =>
              (!name || compareNames(user.name, name)) &&
              (!age || user.age === age)
          )
        )
      } else {
        reject([])
      }
    }, 2000)
  })
}

function renderMsg (message) {
  return `<div class"message">${message}</div>`
}

abbrevNames.style.background = userContainer.innerHTML = displayUsers(users)

pageForm.addEventListener('submit', (e) => {
  e.preventDefault()
  userContainer.innerHTML = renderMsg('searching users....')
  searchUsers(e.target.name.value, +e.target.age.value)
    .then((result) => {
      userContainer.innerHTML = displayUsers(result)
    })
    .catch((e) => {
      userContainer.innerHTML = renderMsg(
        'Error loading users please try again'
      )
    })
})

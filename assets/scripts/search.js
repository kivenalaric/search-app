const pageForm = document.querySelector('form')
const userContainer = document.querySelector('.users')
// to display array of users

const users = [
  { name: 'Pen Malone', age: 23 },
  { name: 'Nsairun', age: 32 },
  { name: 'Emma', age: 40 },
  { name: 'Trevor', age: 25 },
  { name: 'Joshi', age: 23 },
  { name: 'Jerry', age: 23 },
  { name: 'Viany', age: 23 },
  { name: 'Charles', age: 23 },
  { name: 'Kimbi', age: 23 },
  { name: 'Gaston', age: 23 },
  { name: 'Rash', age: 23 }
]

const deleteUser = (name) => {
  const index = users.findIndex((user) => user.name === name)
  if (index !== -1) {
    users.splice(index, 1)
    displayUsers(users)
    window.alert('user will be deleted')
  } else {
    window.alert('User not found')
  }
}

function displayUser ({ age, name }) {
  const people = document.createElement('div')
  const image = document.createElement('div')
  const proper = document.createElement('div')
  const nameLabel = document.createElement('label')
  const h2 = document.createElement('h2')
  const ageLabel = document.createElement('label')
  const p = document.createElement('p')
  const delBtn = document.createElement('button')

  people.className = 'people'
  image.className = 'image'
  proper.className = 'proper'
  nameLabel.className = 'namel'
  h2.className = 'h2'
  ageLabel.className = 'agel'
  p.className = 'p'
  delBtn.className = 'delete'

  image.innerHTML = `${initials(name)}`
  nameLabel.innerHTML = 'Name:'
  h2.innerHTML = `${name}`
  ageLabel.innerHTML = 'Age:'
  p.innerHTML = `${age} years(s)`
  delBtn.innerHTML = '&cross;'

  people.appendChild(image)
  proper.appendChild(nameLabel)
  proper.appendChild(h2)
  proper.appendChild(ageLabel)
  proper.appendChild(p)
  people.appendChild(proper)
  people.appendChild(delBtn)
  delBtn.type = 'button'

  delBtn.addEventListener('click', () => deleteUser(name))

  return people
}

function initials (name) {
  return name
    .split(' ')
    .map((yo) => yo[0].toUpperCase())
    .join('.')
}

function displayUsers (persons) {
  userContainer.innerHTML = ''
  if (persons.length) {
    persons.forEach(({ age, name }) => {
      userContainer.appendChild(displayUser({ age, name }))
    })

    return
  }

  renderMsg('sorry! No user found')
}

function compareNames (name, searchTerm) {
  return name.toLowerCase().includes(searchTerm.toLowerCase())
}

function shouldRessolve () {
  return Math.random() < 0.75
}

function searchUsers (name, age) {
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
        Error([])
      }
    }, 2000)
  })
}

function renderMsg (message) {
  return `<div class"message">${message}</div>`
}

pageForm.addEventListener('submit', (e) => {
  e.preventDefault()
  userContainer.innerHTML = renderMsg('searching users....')
  searchUsers(e.target.name.value, +e.target.age.value)
    .then((result) => displayUsers(result))
    .catch((e) => {
      userContainer.innerHTML = renderMsg(
        'Error loading users please try again'
      )
    })
})

displayUsers(users)

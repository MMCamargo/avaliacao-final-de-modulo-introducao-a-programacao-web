!getItem('loggedUser') ? window.location.href = 'login.html' : null

const users = getItem('users')
const loggedUser = getItem('loggedUser')

const notesModal = document.getElementById('notes-modal')
const notesModalTitle = document.getElementById('notes-modal__title-input')
const notesModalDescription = document.getElementById('notes-modal__description-input')
const notesModalBtn = document.getElementById('notes-modal__submit-input')

const table = document.getElementById('table__body')

loadNotes()

window.addEventListener('click', (event) => event.target === notesModal ? resetNotesModal() : null)

document.addEventListener('keydown', (event) => event.key === 'Escape' ? resetNotesModal() : null)

const logoutBtn = document.getElementById('header__logout-btn')
const addBtn = document.getElementById('add-btn')

logoutBtn.addEventListener('click', () => logoutUser())

addBtn.addEventListener('click', () => notesModal.style.display = 'grid')

function logoutUser() {
    removeItem('loggedUser')

    window.location.href = 'login.html'
}

function updateUserData(updatedData) {
    const userIndex = users.findIndex((value) => value.email === updatedData.email)

    users[userIndex] = updatedData

    setItem('users', users)
}

function resetNotesModal() {
    notesModal.style.display = 'none'

    notesModalTitle.value = ''
    notesModalDescription.value = ''
}

function addNotes() {
    let loggedUserData = users.find((value) => value.email === loggedUser.email)

    const note = {
        title: notesModalTitle.value,
        description: notesModalDescription.value,
        id: `${Math.floor(Math.random() * (1000000000 - 10) + 10)}`
    }

    loggedUserData.notes.push(note)

    notesModalTitle.value = ''
    notesModalDescription.value = ''

    updateUserData(loggedUserData)

    notesModal.style.display = 'none'

    loadNotes()
}

function loadNotes() {
    let loggedUserData = users.find((value) => value.email === loggedUser.email)

    table.innerHTML = ''

    for (const value of loggedUserData.notes) {
        const row = document.createElement('tr')
        row.classList.add('table__body-row')
        row.setAttribute('id', value.id)

        const title = document.createElement('td')
        title.classList.add('table__body-cell')
        title.innerText = value.title

        const description = document.createElement('td')
        description.classList.add('table__body-cell')
        description.innerText = value.description

        const btnCell = document.createElement('td')
        btnCell.classList.add('table__body-cell')

        const editBtn = document.createElement('span')
        editBtn.classList.add('material-symbols-rounded')
        editBtn.innerText = 'edit_note'
        editBtn.addEventListener('click', () => editNotes(value.id))

        const deleteBtn = document.createElement('span')
        deleteBtn.classList.add('material-symbols-rounded')
        deleteBtn.innerText = 'delete'
        deleteBtn.addEventListener('click', () => deleteNotes(value.id))

        btnCell.appendChild(editBtn)
        btnCell.appendChild(deleteBtn)

        row.appendChild(title)
        row.appendChild(description)
        row.appendChild(btnCell)

        table.appendChild(row)
    }
}

function editNotes(id) {
    let loggedUserData = users.find((value) => value.email === loggedUser.email)

    const editedNote = loggedUserData.notes.findIndex((value) => value.id === id)

    notesModal.style.display = 'grid'

    notesModalTitle.value = loggedUserData.notes[editedNote].title
    notesModalDescription.value = loggedUserData.notes[editedNote].description

    notesModalBtn.innerText = 'Atualizar'

    notesModalBtn.onclick = () => updateNotes(editedNote, loggedUserData)
}

function updateNotes(editedNote, loggedUserData) {
    loggedUserData.notes[editedNote].title = notesModalTitle.value
    loggedUserData.notes[editedNote].description = notesModalDescription.value

    updateUserData(loggedUserData)

    loadNotes()

    notesModal.style.display = 'none'

    setTimeout(() => {
        notesModalBtn.innerText = 'Salvar'

        notesModalBtn.onclick = () => addNotes()
    }, 1000)
}

function deleteNotes(id) {
    let loggedUserData = users.find((value) => value.email === loggedUser.email)

    const deletedNoteIndex = loggedUserData.notes.findIndex((value) => value.id === id)

    const deletedRow = document.getElementById(id)

    deletedRow.remove()

    loggedUserData.notes.splice(deletedNoteIndex, 1)

    updateUserData(loggedUserData)
}
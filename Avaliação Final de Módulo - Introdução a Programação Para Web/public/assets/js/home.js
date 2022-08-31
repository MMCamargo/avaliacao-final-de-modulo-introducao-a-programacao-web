!getItem('loggedUser') ? window.location.href = 'login.html' : null

const users = getItem('users')
const loggedUser = getItem('loggedUser')
const loggedUserData = users.find((value) => value.email === loggedUser.email)

document.addEventListener('DOMContentLoaded', () => {
    loggedUserData.notes.forEach((value) => loadNotes(value))
})

const notesModal = document.getElementById('notes-modal')
const notesModalForm = document.getElementById('notes-modal__form')
const notesModalTitle = document.getElementById('notes-modal__title-input')
const notesModalDescription = document.getElementById('notes-modal__description-input')
const notesModalBtn = document.getElementById('notes-modal__submit-input')

const table = document.getElementById('table')

window.addEventListener('click', (event) => event.target === notesModal ? resetNotesModal() : null)

document.addEventListener('keydown', (event) => event.key === 'Escape' ? resetNotesModal() : null)

notesModalBtn.addEventListener('click', (event) => {
    event.preventDefault()

    notesModal.style.display = 'none'

    addNotes()
})

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

    notesModalForm.reset()
}

function addNotes() {
    const note = {
        title: notesModalTitle.value,
        description: notesModalDescription.value,
        id: `${Math.floor(Math.random() * (1000000000 - 10) + 10)}`
    }

    loggedUserData.notes.push(note)

    notesModalForm.reset()

    updateUserData(loggedUserData)

    loadNotes(note)
}

function loadNotes(value) {
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


function editNotes(id) {
    const editedNote = loggedUserData.notes.find((value) => value.id === id)
    const editedRow = document.getElementById(id)

    notesModal.style.display = 'grid'

    notesModalTitle.value = editedNote.title
    notesModalDescription.value = editedNote.description

    notesModalBtn.addEventListener('click', (event) => {
        event.preventDefault()

        editedRow.remove()

        updateNotes(id)
    })
}

function updateNotes(id) {
    const editedNoteIndex = loggedUserData.notes.findIndex((value) => value.id === id)
    const editedTitle = notesModalTitle.value
    const editedDescription = notesModalTitle.value

    const note = {
        title: editedTitle,
        description: editedDescription,
        id: id
    }

    loggedUserData.notes.forEach((value, index) => {
        if (value.id === id) {
            index = note
        }
    })

    updateUserData(loggedUserData)
}

function deleteNotes(id) {
    const deletedNoteIndex = loggedUserData.notes.findIndex((value) => value.id === id)

    const deletedRow = document.getElementById(id)

    deletedRow.remove()

    loggedUserData.notes.splice(deletedNoteIndex, 1)

    updateUserData(loggedUserData)
}
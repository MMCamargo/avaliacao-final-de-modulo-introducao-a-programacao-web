const modal = document.querySelector('.modal')
const modalCloseBtn = document.querySelector('.modal__close-btn')
const modalText = document.querySelector('.modal__text')

function showModal(text, validation) {
    if (validation) {
        modal.style.display = 'grid'
        modalText.innerText = text

        addEventListeners(true)
    } else {
        modal.style.display = 'grid'
        modalText.innerText = text

        addEventListeners(false)
    }
}

function addEventListeners(validation) {
    if (validation) {
        window.addEventListener('click', (event) => {
            if (event.target == modal) {
                modal.style.display = 'none'

                window.location.href = 'login.html'
            }
        })

        document.addEventListener('keydown', (event) => {
            if (event.key == 'Escape') {
                modal.style.display = 'none'

                window.location.href = 'login.html'
            }
        })

        modalCloseBtn.addEventListener('click', () => {
            modal.style.display = 'none'

            window.location.href = 'login.html'
        })
    } else {
        window.addEventListener('click', (event) => event.target == modal ? modal.style.display = 'none' : null)

        document.addEventListener('keydown', (event) => event.key == 'Escape' ? modal.style.display = 'none' : null)

        modalCloseBtn.addEventListener('click', () => modal.style.display = 'none')
    }
}
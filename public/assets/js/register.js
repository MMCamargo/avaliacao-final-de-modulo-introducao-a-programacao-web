!getItem('users') ? setItem('users', []) : null

export const users = getItem('users')

const popOver = document.getElementById('pop-over')
const popOverText = document.getElementById('pop-over__text')

export const formRegister = document.querySelector('.card__form')
export const emailRegister = document.querySelector('#form__email-register')
export const passwordRegister = document.querySelector('#form__password-register')
export const repasswordRegister = document.querySelector('#form__repassword-register')
const submitRegisterBtn = document.querySelector('#form__submit-register')

import { validateRegister } from '/public/assets/js/validate-register.js'

showPopOver()

submitRegisterBtn.addEventListener('click', (event) => {
    event.preventDefault()

    submitRegister()
})

function submitRegister() {

    const validation = validateRegister()

    if (validation) {
        const userAccount = {
            email: emailRegister.value,
            password: passwordRegister.value,
            notes: []
        }

        formRegister.reset()

        users.push(userAccount)

        setItem('users', users)

        showModal('Usuário cadastrado com sucesso!', true)
    }
}

function showPopOver() {
    popOver.style.display = 'grid'
    popOverText.innerText = 'Expressões regulares: @gmail, @outlook, @hotmail, @yahoo, .com & .com.br'

    emailRegister.addEventListener('focus', () => {
        popOver.style.display = 'grid'
        popOverText.innerText = 'Expressões regulares: @gmail, @outlook, @hotmail, @yahoo, .com & .com.br'
    })

    emailRegister.addEventListener('focusout', () => popOver.style.display = 'none')

    passwordRegister.addEventListener('focus', () => {
        popOver.style.display = 'grid'
        popOverText.innerText = 'Mínimo: 8 caracteres entre [a-z], [A-Z], [0-9], acentos ou caracteres especiais.'
    })

    passwordRegister.addEventListener('focusout', () => popOver.style.display = 'none')
}
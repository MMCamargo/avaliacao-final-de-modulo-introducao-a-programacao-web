!getItem('loggedUser') ? null : window.location.href = 'home.html'

!getItem('users') ? setItem('users', []) : null

const users = getItem('users')

const formLogin = document.querySelector('.card__form')
const emailLogin = document.getElementById('form__email-login')
const passwordLogin = document.getElementById('form__password-login')
const submitLoginBtn = document.getElementById('form__submit-login')

submitLoginBtn.addEventListener('click', (event) => {
    event.preventDefault()

    submitLogin()
})

function submitLogin() {
    const validation = validateLogin()

    if (validation) {
        const loggedUser = {
            email: emailLogin.value
        }

        setItem('loggedUser', loggedUser)

        window.location.href = 'home.html'
    }
}

function validateLogin() {
    if (!emailLogin.value || !passwordLogin.value) {
        showModal('Por favor, preencha todos os campos!', false)

        return
    }

    const someUser = users.some((value) => {
        if (value.email === emailLogin.value && value.password === passwordLogin.value) {
            return true
        }
    })

    if (!someUser) {
        showModal('E-mail e/ou senha incorretos!', false)

        formLogin.reset()
    }

    return someUser
}
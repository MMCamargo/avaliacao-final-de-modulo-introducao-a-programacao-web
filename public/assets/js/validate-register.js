import { users, formRegister, emailRegister, passwordRegister, repasswordRegister } from '/public/assets/js/register.js'

const emailRegEx = /^([a-z]|[A-Z]){1}([a-z]|[A-Z]|[0-9]|[_])+([@]){1}(([g][m][a][i][l]){1}|([y][a][h][o][o]){1}|([o][u][t][l][o][o][k]){1}|([h][o][t][m][a][i][l]){1}){1}([.]){1}(([c][o][m]){1}|([c][o][m][.][b][r]){1})$/
const passwordRegEx = /^([a-z]|[A-Z]|[0-9]|[\S]){8,}$/

passwordRegister.addEventListener('keyup', () => validatePasswordLive())

passwordRegister.addEventListener('focusout', () => {
    passwordRegister.value === '' ? passwordRegister.style.borderBottomColor = '#bebcbc' : validatePasswordLive()
})

export function validateRegister() {
    const matchEmail = emailRegister.value.match(emailRegEx)
    const matchPassword = passwordRegister.value.match(passwordRegEx)

    const usedEmail = users.some((value) => value.email === emailRegister.value)

    if (!emailRegister.value || !passwordRegister.value || !repasswordRegister.value) {
        showModal('Por favor, preencha todos os campos!', false)

        return
    } else if (matchEmail === null) {
        showModal('Por favor, insira um e-mail válido.')

        formRegister.reset()

        passwordRegister.style.borderBottomColor = '#bebcbc'

        return
    } else if (usedEmail) {
        showModal('Este e-mail já está sendo utilizado.')

        formRegister.reset()

        passwordRegister.style.borderBottomColor = '#bebcbc'

        return
    } else if (matchPassword === null) {
        showModal('Por favor, insira uma senha válida.')

        formRegister.reset()

        passwordRegister.style.borderBottomColor = '#bebcbc'

        return
    } else if (passwordRegister.value !== repasswordRegister.value) {
        showModal('Senhas não conferem.', false)

        formRegister.reset()

        passwordRegister.style.borderBottomColor = '#bebcbc'

        return
    }

    return true
}

function validatePasswordLive() {
    const matchPasswordLive = passwordRegister.value.match(passwordRegEx)

    if (matchPasswordLive === null) {
        passwordRegister.style.borderBottomColor = '#f60000'
    } else {
        passwordRegister.style.borderBottomColor = '#bebcbc'
    }
}
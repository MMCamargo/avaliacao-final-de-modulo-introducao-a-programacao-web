function setItem(key, item) {
    localStorage.setItem(key, JSON.stringify(item))
}

function getItem(key) {
    return JSON.parse(localStorage.getItem(key))
}

function removeItem(key) {
    localStorage.removeItem(key)
}
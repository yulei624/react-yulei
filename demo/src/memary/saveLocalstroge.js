import store from 'store'
const USER = 'USER'
export function setLocal(data) {
    store.set(USER, data)
    // localStorage.setItem(USER,JSON.stringify(data))
}

export function getLocal() {
    return store.get(USER)
    // console.log(JSON.parse(localStorage.getItem(USER)), "get")
    // return JSON.parse(localStorage.getItem(USER))
}

export function delLocal() {
    store.remove(USER)
}
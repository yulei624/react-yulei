import ajax from './axios'
export const userLogin = (username,password) => {
    return ajax('/login',{username,password},'POST')
}




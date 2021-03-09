import api from "./api";

export async function logIn(username, password) {
    try {
        const response = await api.post("api/login", {
            username,
            password,
        })
        localStorage.auth = JSON.stringify(response.data)
        localStorage.currentUser = response.data.id
        localStorage.currentUserName = response.data.name
    } catch (e){
        throw new Error(e.response.status === 401 ? "Usuário ou Senha incorretos." : e.response.data.statusText)
    }
}

export function logOut() {
    delete localStorage.auth;
}

export function refreshToken() {
    return api.post("oauth/access_token", null, {
        params: {
            refresh_token: JSON.parse(localStorage.auth).refresh_token,
            grant_type: 'refresh_token',
        }
    })
        .then((response) => {
            if (response.status >= 200 && response.status < 300){
                return response;
            } else {
                throw new Error(response.statusText)
            }
        })
        .then(a => localStorage.auth = JSON.stringify(a))
        .then(() => {return true})
        .catch(() => {return false})
}

export function isLogged() {
    return localStorage.auth && api.get("user", null, {
        headers:{
            'Authorization': `Bearer ${localStorage.auth ? JSON.parse(localStorage.auth).access_token : null}`
        }
    })
        .then((response) => {
            if (response.status >= 200 && response.status < 300){
                return response;
            } else {
                throw new Error(response.statusText)
            }
        })
        .then(() => {return true})
        .catch(refreshToken)
        .catch(() => {return false})

}

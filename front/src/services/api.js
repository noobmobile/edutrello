import axios from "axios";

const api = axios.create(
    {
        baseURL: 'http://localhost:8080/',
    }
)

api.interceptors.request.use(async config => {
    const token = localStorage.auth ? JSON.parse(localStorage.auth).access_token : null
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default api
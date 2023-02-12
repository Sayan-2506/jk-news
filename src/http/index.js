import axios from "axios";


export const API_URL = 'https://diploms.pythonanywhere.com/api/v1/'

const $api = axios.create({
    withCredentials: true,
    headers: {"Content-Type": "application/json"},
    baseURL: API_URL
})

if (localStorage.getItem('accessToken')) {
    $api.interceptors.request.use((config) => {
        config.headers.Authorization = `Bearer ${localStorage.getItem('accessToken')}`
        return config;
    })
}


$api.interceptors.response.use((config) => {
    return config
}, async (error) => {
    const originalRequest = error.config;
    if (error.response.status == 401 && error.config && !error.config._isRetry) {
        originalRequest._isRetry = true;
        try {
            const response = await axios.post(`${API_URL}login/refresh/`, {withCredentials: true, refresh: localStorage.getItem('refreshToken')})
            localStorage.setItem('accessToken', response.data.access)
            return $api.request(originalRequest)
        } catch (e) {
            console.log('НЕ АВТОРИЗОВАН')
        }
    }
    throw error;
})

export default $api;
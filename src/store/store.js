import { makeAutoObservable } from "mobx";
import axios from "axios";
import AuthService from "../services/AuthService";
import { API_URL } from "../http";

export default class Store {
    user = {};
    isAuth = false;
    isLoading = false;

    constructor() {
        makeAutoObservable(this);
    }

    setAuth(bool) {
        this.isAuth = bool;
    }

    setUser(user) {
        this.user = user;
    }

    setLoading(bool) {
        this.isLoading = bool;
    }

    getUser() {
        return this.user
    }

    async login({username, password}) {
        try {
            const response = await AuthService.login(username, password);
            localStorage.setItem('refreshToken', response.data.refresh)
            localStorage.setItem('accessToken', response.data.access)
            localStorage.setItem('user', JSON.stringify({...response.data.user, ...response.data.profile}))
            this.setAuth(true)
            this.setUser({...response.data.user, ...response.data.profile})
        } catch (e) {
            return {error: e}
        }
    }

    async registration(data) {
        try {
            const response = await AuthService.registration(data);
            console.log(response)
            const userInfo = {...response.data.user, ...response.data.profile_user};
            localStorage.setItem('refreshToken', response.data.refresh);
            localStorage.setItem('accessToken', response.data.access);
            localStorage.setItem('user', JSON.stringify(userInfo));
            this.setAuth(true);
            this.setUser(userInfo);
        } catch (e) {
            return {error: e}
        }
    }
    
    async checkAuth() {
        this.setLoading(true);
        try {
            const response = await axios.post(`${API_URL}login/refresh/`, {withCredentials: true, refresh: localStorage.getItem('refreshToken')})
            localStorage.setItem('accessToken', response.data.access)
            this.setUser(JSON.parse(localStorage.getItem('user')))
            this.setAuth(true)
        } catch (e) {
            console.log(e.response)
        } finally {
            this.setLoading(false);
        }
    }

    async Like({ post }) {
        this.setLoading(true);
        try {
            const response = await AuthService.like(post)
        } catch (e) {
            console.log(e.response)
        } finally {
            this.setLoading(false);
        }
    }

    async Comment({ news_id, comments }) {
        this.setLoading(true);
        try {
            const response = await AuthService.comment(news_id, comments)
        } catch (e) {
            console.log(e.response)
        } finally {
            this.setLoading(false);
        }
    }
    
    async GetAllNews() {
        this.setLoading(true);
        try {
            const response = await axios.get('https://diploms.pythonanywhere.com/api/v1/news/all')
            return response
        } catch (e) {
            console.log(e.response)
        } finally {
            this.setLoading(false);
        }
    }

    async GetAllCategory() {
        this.setLoading(true);
        try {
            const response = await axios.get('https://diploms.pythonanywhere.com/api/v1/category/all/')
            return response
        } catch (e) {
            console.log(e.response)
        } finally {
            this.setLoading(false);
        }
    }

    async Search(text) {
        this.setLoading(true);
        try {
            const response = await axios.get(`https://diploms.pythonanywhere.com/api/v1/news/search?search=${text}`)
            return response
        } catch (e) {
            console.log(e.response)
        } finally {
            this.setLoading(false);
        }
    }

    async FilterByCategory(category) {
        this.setLoading(true);
        try {
            const response = await axios.get(`https://diploms.pythonanywhere.com/api/v1/news/filter/?category__categoryName=${category}`)
            return response
        } catch (e) {
            console.log(e.response)
        } finally {
            this.setLoading(false);
        }
    }

    async AddNews(data) {
        try {
            const response = await AuthService.addNews(data);
        } catch (e) {
            return {error: e}
        }
    }

    async updateUser(data) {
        try {
            const response = await AuthService.updateUser(data);
            const userInfo = {...JSON.parse(localStorage.getItem('user')), ...response.data.user, ...response.data.profile}
            localStorage.setItem('user', JSON.stringify(userInfo))
            this.setAuth(true)
            this.setUser(userInfo)
            return {success: true}
        } catch (e) {
            return {error: e}
        }
    }
}
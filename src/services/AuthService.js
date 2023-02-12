import $api from "../http";

export default class AuthService {
    static async login(username, password) {
        return $api.post('/login/', {username, password})
    }

    static async registration(data) {
        return $api.post('/register/', data, 
        {
            headers: { 'content-type': 'multipart/form-data' }
        })
    }

    static async like(post) {
        return $api.post('/news/like', {post})
    }

    static async comment(news_id, comments) {
        return $api.post('/news/comment/add', {news_id, comments})
    }

    static async addNews(data) {
        return $api.post('news/add', data, {
            headers: { 'content-type': 'multipart/form-data' }
        })    
    }

    static async updateUser({ username, firstName, lastName, surname, email, nameResidentialComplex, entrance, floor, roomNumber }) {
        return $api.put('profile/update', {username, first_name: firstName, last_name: lastName, surname, email, nameResidentialComplex, entrance, floor, roomNumber})
    }
}
import axios from 'axios';
import authHeader from './auth-header';

class UserService{
    listUsers(event_slug) {
        return axios
        .get(process.env.VUE_APP_API_URL + '/user', { headers: authHeader(), params: { event_slug } })
        .then((response) => response.data)
    }

    getUserCertifications(){
        return axios
        .get(process.env.VUE_APP_API_URL + '/certificates', { headers: authHeader(), params: {
            emit_from: "myself"
        } }).then((response) => response.data)
    }

    isAdmin() {
        return axios
        .get(process.env.VUE_APP_API_URL + '/admin', { headers: authHeader() })
        .then((response) => response.data)
    }

    deleteAccount(user_id){
        return axios
        .delete(process.env.VUE_APP_API_URL + '/user/' + user_id, { headers: authHeader() })
        .then((response) => response.data)
    }

    editAccount(user){
        return axios
        .put(process.env.VUE_APP_API_URL + '/user/' + user.id, user, { headers: authHeader() })
        .then((response) => response.data)
    }
}

export default new UserService();

import axios from 'axios';
import authHeader from './auth-header';

class UserService{
    getUserCertifications(){
        return axios
        .get(process.env.VUE_APP_API_URL + '/certificates', { headers: authHeader(), params: {
            emit_from: "myself"
        } }).then((response) => response.data)
    }
}

export default new UserService();

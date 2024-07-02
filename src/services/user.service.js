import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:3000/';

class UserService{
    getUserCertifications(){
        return axios
        .get(API_URL + 'certificates', { headers: authHeader() })
    }
}

export default new UserService();
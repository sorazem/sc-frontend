import axios from 'axios';

const API_URL = 'http://localhost:3000/';

class AuthService {
  login(user) {
    return axios
      .post(API_URL + 'login', {
        cpf: user.cpf,
        password: user.password
      })
      .then(response => {
        if (response.data.token) {
          localStorage.setItem('user', JSON.stringify(response.data));
        }

        return response.data;
      });
  }

  logout() {
    localStorage.removeItem('user');
  }

  register(user) {
    return axios.post(API_URL + 'register', {
      name: user.name,
      cpf: user.cpf,
      email: user.email,
      password: user.password,
      dre: user.dre,
      ocupation: user.ocupation,
      institution: user.institution
    });
  }
}

export default new AuthService();
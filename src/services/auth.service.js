import axios from 'axios';

class AuthService {
  login(user) {
    return axios
      .post(process.env.VUE_APP_API_URL + '/login', {
        cpf: user.cpf,
        password: user.password
      })
      .then(response => {
        if (response.data.token) {
          localStorage.setItem('token', response.data.token)
          localStorage.setItem('exp', response.data.exp)
        }

        return response.data;
      });
  }

  logout() {
    localStorage.removeItem('user');
  }

  register(user) {
    return axios.post(process.env.VUE_APP_API_URL + '/register', {
      name: user.name,
      cpf: user.cpf,
      email: user.email,
      password: user.password,
      dre: user.dre,
      ocupation: user.ocupation,
      institution: user.institution
    });
  }

  forget(email) {
    return axios
      .post(process.env.VUE_APP_API_URL + '/forget', { email })
      .then((response) => response.data);
  }

  reset(data) {
    return axios
      .post(process.env.VUE_APP_API_URL + '/reset', data)
      .then((response) => response.data);
  }
}

export default new AuthService();

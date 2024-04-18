import axios from 'axios';
import  { setLocalStorage } from './authorizeService';

export default {
  async login({ commit }, { email, password }) {
    try {
      const requestData = {
        email: email,
        password: password
      };
      const response = await axios.post('http://localhost:3000/auth', requestData);

      if (response.status == 200) {
        const data = await response.data;

        await setLocalStorage(data.token, data.pubKey, data.privKey, data.userData);
      } else {
        throw new Error('Invalid credentials');
      }
    } catch (error) {
      commit('handleError', { action: 'login', error });
    }
  },

  async register({ commit }, { name, username, email, password }) {
    try {
      const requestData = {
        name: name,
        username: username,
        email: email,
        password: password
      };
      const response = await axios.post('http://localhost:3000/users', requestData);

      if (response.status == 200) {
        const data = await response.data;

        await setLocalStorage(data.token, data.pubKey, data.privKey, data.userData);
      } else {
        throw new Error('Invalid registration data');
      }
    } catch (error) {
      commit('handleError', { action: 'register', error });
    }
  }
}
import axios from 'axios';
import config from '@/config';
import  { authorize, setLocalStorage } from './authorizeService';

export default {
  async userInfo({ commit }) {
    try {
      await authorize();

      const response = await axios.get(`${config.apiUrl}/user_info`);

      commit('setUserInfo', response.data);
    } catch (error) {
      commit('handleError', { action: 'userInfo', error });
    }
  },
  async fetchUsers({ commit }) {
    try {
      await authorize();

      const response = await axios.get(`${config.apiUrl}/users`);

      commit('setUsers', response.data);
    } catch (error) {
      commit('handleError', { action: 'fetchUsers', error });
    }
  },
  async updateUser({ commit }, { name, username, email, password, oldPassword, image }) {
    try {
      const requestData = {
        name: name,
        username: username,
        email: email,
        password: password,
        oldPassword: oldPassword,
        image: image
      };
      const response = await axios.put('http://localhost:3000/user', requestData);
      if (response.status == 200) {
        const data = await response.data;

        await setLocalStorage(data.token, data.pubKey, data.privKey, data.userData);
      } else {
        throw new Error('Invalid registration data');
      }
    } catch (error) {
      commit('handleError', { action: 'updateUser', error });
    }
  }
}
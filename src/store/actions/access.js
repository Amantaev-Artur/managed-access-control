import axios from 'axios';
import config from '@/config';
import  { authorize } from './authorizeService';

export default {
  async createAccess({ commit }, { type, data, size, groupIds }) {
    try {
      await authorize();

      const requestData = {
        type: type,
        data: data,
        size: size,
        groupIds: groupIds
      };

      const response = await axios.post(`${config.apiUrl}/accesses`, requestData);

      if (response.status != 200) {
        throw new Error('Invalid registration data');
      }
    } catch (error) {
      commit('handleError', { action: 'createAccess', error });
    }
  },

  async deleteAccess({ commit }, { accessId }) {
    try {
      await authorize();

      const response = await axios.delete(`${config.apiUrl}/accesses/${accessId}`);

      if (response.status != 200) {
        throw new Error('Invalid registration data');
      }
    } catch (error) {
      commit('handleError', { action: 'deleteAccess', error });
    }
  },

  async updateAccess({ commit }, { id, type, data, size, groupIds }) {
    try {
      await authorize();

      const requestData = {
        type: type,
        data: data,
        size: size,
        groupIds: groupIds
      };

      const response = await axios.put(`${config.apiUrl}/accesses/${id}`, requestData);

      if (response.status != 200) {
        throw new Error('Invalid registration data');
      }
    } catch (error) {
      commit('handleError', { action: 'updateAccess', error });
    }
  },

  async fetchAccess({ commit }, id) {
    try {
      await authorize();

      const response = await axios.get(`${config.apiUrl}/accesses/${id}`);

      commit('setAccess', response.data);
    } catch (error) {
      commit('handleError', { action: 'fetchAccess', error });
    }
  },
  async fetchAccesses({ commit }) {
    try {
      await authorize();

      const response = await axios.get(`${config.apiUrl}/accesses`);

      commit('setAccesses', response.data);
    } catch (error) {
      commit('handleError', { action: 'fetchAccesses', error });
    }
  },
}
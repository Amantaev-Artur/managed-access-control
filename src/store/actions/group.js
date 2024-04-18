import axios from 'axios';
import  { authorize } from './authorizeService';

export default {
  async addUserToGroup({ commit }, { groupId, userId }) {
    try {
      authorize()

      const response = await axios.post(`http://localhost:3000/groups/${groupId}/users/${userId}`);

      if (response.status != 200) {
        throw new Error('Invalid registration data');
      }
    } catch (error) {
      commit('handleError', { action: 'addUserToGroup', error });
    }
  },

  async createGroup({ commit }, { name, description, parentId }) {
    try {
      authorize()

      const requestData = {
        name: name,
        description: description,
        parentId: parentId
      };
      const response = await axios.post(`http://localhost:3000/groups`, requestData);

      if (response.status != 200) {
        throw new Error('Invalid registration data');
      }
    } catch (error) {
      commit('handleError', { action: 'createGroup', error });
    }
  },

  async deleteGroup({ commit }, { groupId }) {
    try {
      authorize()

      const response = await axios.delete(`http://localhost:3000/groups/${groupId}`);

      if (response.status != 200) {
        throw new Error('Invalid registration data');
      }
    } catch (error) {
      commit('handleError', { action: 'deleteGroup', error });
    }
  },

  async updateGroup({ commit }, { groupId, name, description, parentId }) {
    try {
      authorize()

      const requestData = {
        name: name,
        description: description,
        parentId: parentId
      };
      const response = await axios.put(`http://localhost:3000/groups/${groupId}`, requestData);

      if (response.status != 200) {
        throw new Error('Invalid registration data');
      }
    } catch (error) {
      commit('handleError', { action: 'updateGroup', error });
    }
  },

  async removeUserFromGroup({ commit }, { groupId, userId }) {
    try {
      authorize()

      const response = await axios.delete(`http://localhost:3000/groups/${groupId}/users/${userId}`);

      if (response.status != 200) {
        throw new Error('Invalid registration data');
      }
    } catch (error) {
      commit('handleError', { action: 'removeUserFromGroup', error });
    }
  },

  async fetchGroups({ commit }, excludeGroupId = null) {
    try {
      authorize()

      const response = await axios.get('http://localhost:3000/groups', { params: { excludeGroupId: excludeGroupId } });

      commit('setGroups', response.data);
    } catch (error) {
      commit('handleError', { action: 'fetchGroups', error });
    }
  },
  async fetchGroupById({ commit }, id) {
    try {
      authorize()

      const response = await axios.get(`http://localhost:3000/groups/${id}`);

      commit('setSelectedGroup', response.data);
    } catch (error) {
      commit('handleError', { action: 'fetchGroupById', error });
    }
  }
}
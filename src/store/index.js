// store/index.js
import { createStore } from 'vuex';
import axios from 'axios';

const store = createStore({
  state() {
    return {
      access: [],
      accesses: [],
      errors: {},
      groups: [],
      selectedGroup: null
    };
  },
  mutations: {
    setAccess(state, access) {
      state.access = access;
    },
    setAccesses(state, accesses) {
      state.accesses = accesses;
    },
    setGroups(state, groups) {
      state.groups = groups;
    },
    setSelectedGroup(state, group) {
      state.selectedGroup = group;
    },
    handleError(state, { action, error }) {
      state.errors[action] = error.message;
    },
    clearError(state) {
      state.errors = null;
    }
  },
  actions: {
    async login({ commit }, { email, password }) {
      try {
        const requestData = {
          email: email,
          password: password
        };
        const response = await axios.post('http://localhost:3000/auth', requestData);

        if (response.status == 200) {
          const data = await response.data;

          localStorage.setItem('jwtToken', data.token);
          localStorage.setItem('userData', JSON.stringify(data.userData));
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

          localStorage.setItem('jwtToken', data.token);
          localStorage.setItem('userData', JSON.stringify(data.userData));
        } else {
          throw new Error('Invalid registration data');
        }
      } catch (error) {
        commit('handleError', { action: 'register', error });
      }
    },

    async createAccess({ commit }, { type, data, size, groupIds }) {
      try {
        const requestData = {
          type: type,
          data: data,
          size: size,
          groupIds: groupIds
        };
        const response = await axios.post('http://localhost:3000/accesses', requestData);

        if (response.status != 200) {
          throw new Error('Invalid registration data');
        }
      } catch (error) {
        commit('handleError', { action: 'createAccess', error });
      }
    },

    async updateAccess({ commit }, { id, type, data, size, groupIds }) {
      try {
        const requestData = {
          type: type,
          data: data,
          size: size,
          groupIds: groupIds
        };
        const response = await axios.put(`http://localhost:3000/accesses/${id}`, requestData);

        if (response.status != 200) {
          throw new Error('Invalid registration data');
        }
      } catch (error) {
        commit('handleError', { action: 'createAccess', error });
      }
    },

    async fetchAccess({ commit }, id) {
      try {
        const token = localStorage.getItem('jwtToken');

        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

        const response = await axios.get(`http://localhost:3000/accesses/${id}`);

        commit('setAccess', response.data);
      } catch (error) {
        console.error('Ошибка при получении доступов:', error);
      }
    },
    async fetchAccesses({ commit }) {
      try {
        const token = localStorage.getItem('jwtToken');

        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

        const response = await axios.get('http://localhost:3000/accesses');

        commit('setAccesses', response.data);
      } catch (error) {
        console.error('Ошибка при получении доступов:', error);
      }
    },
    async fetchGroups({ commit }) {
      try {
        const token = localStorage.getItem('jwtToken');

        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

        const response = await axios.get('http://localhost:3000/groups');

        commit('setGroups', response.data);
      } catch (error) {
        console.error('Ошибка при получении групп:', error);
      }
    },
    async fetchGroupById({ commit }, id) {
      try {
        const token = localStorage.getItem('jwtToken');

        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

        const response = await axios.get(`http://localhost:3000/groups/${id}`);

        commit('setSelectedGroup', response.data);
      } catch (error) {
        console.error('Ошибка при получении группы:', error);
      }
    }
  },
  getters: {
    getAccess(state) {
      return state.access;
    },
    getAccesses(state) {
      return state.accesses;
    },
    getGroups(state) {
      return state.groups;
    },
    getSelectedGroup(state) {
      return state.selectedGroup;
    },
    getErrorByAction: (state) => (action) => {
      return state.errors[action] || null;
    }
  }
});

export default store;

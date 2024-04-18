import { createStore } from 'vuex';
import axios from 'axios';
import mutations from './mutations';
import getters from './getters';
import actions from './actions';
const store = createStore({
  state() {
    return {
      access: [],
      accesses: [],
      errors: {},
      groups: [],
      image: null,
      selectedGroup: null,
      userInfo: {},
      users: []
    };
  },
  mutations,
  actions,
  getters
});

export default store;

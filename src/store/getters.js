export default {
  getAccess(state) {
    return state.access;
  },
  getAccesses(state) {
    return state.accesses;
  },
  getGroups(state) {
    return state.groups;
  },
  getImage(state) {
    return state.image;
  },
  getSelectedGroup(state) {
    return state.selectedGroup;
  },
  getErrorByAction: (state) => (action) => {
    return state.errors[action] || null;
  },
  getUserInfo(state) {
    return state.userInfo;
  },
  getUsers(state) {
    return state.users;
  }
}
export default {
  setAccess(state, access) {
    state.access = access;
  },
  setAccesses(state, accesses) {
    state.accesses = accesses;
  },
  setGroups(state, groups) {
    state.groups = groups;
  },
  setImage(state, image) {
    state.image = image
  },
  setSelectedGroup(state, group) {
    state.selectedGroup = group;
  },
  setUserInfo(state, userInfo) {
    state.userInfo = userInfo;
  },
  setUsers(state, users) {
    state.users = users;
  },
  handleError(state, { action, error }) {
    state.errors[action] = error.message;
  },
  clearError(state, action) {
    state.errors[action] = null;
  }
}
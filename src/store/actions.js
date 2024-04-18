import accessActions from './actions/access'
import groupActions from './actions/group'
import userActions from './actions/user'
import authActions from './actions/auth'
import imageActions from './actions/image'

export default {
  ...accessActions,
  ...groupActions,
  ...userActions,
  ...authActions,
  ...imageActions,
  async clearError({ commit }, action) {
    commit('clearError', action )
  },
}
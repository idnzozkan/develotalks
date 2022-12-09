import axios from 'axios'

const mutations = {
  SET_ME: 'SET_ME'
}

const actions = {
  LOGOUT: 'logout',
  FETCH_ME: 'fetchMe',
  FETCH_USER: 'fetchUser',
  FOLLOW_USER: 'followUser',
  UNFOLLOW_USER: 'unfollowUser'
}

const user = {
  namespaced: true,
  state: () => ({
    me: null
  }),
  mutations: {
    [mutations.SET_ME] (state, user) {
      state.me = user
    }
  },
  actions: {
    async [actions.FETCH_ME] ({ commit }) {
      const user = await axios.get('/oauth/me')

      if (!user.data) return

      commit(mutations.SET_ME, user.data)
    },
    async [actions.LOGOUT] ({ commit }) {
      await axios.get('/oauth/logout')
      commit(mutations.SET_ME, null)
    },
    async [actions.FETCH_USER] (ctx, username) {
      const user = await axios.get(`/users/${username}`)
      return user.data
    },
    async [actions.FOLLOW_USER] ({ dispatch }, userId) {
      const { data: user } = await axios.post(`/users/${userId}/follow`)
      await dispatch(actions.FETCH_ME)
      return user
    },
    async [actions.UNFOLLOW_USER] ({ dispatch }, userId) {
      const { data: user } = await axios.post(`/users/${userId}/unfollow`)
      await dispatch(actions.FETCH_ME)
      return user
    }
  }
}

export default user

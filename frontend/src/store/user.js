import axios from 'axios'

const mutations = {
  SET_USER: 'SET_USER'
}

const actions = {
  LOGOUT: 'logout',
  FETCH_USER: 'fetchUser'
}

const room = {
  namespaced: true,
  state: () => ({
    user: null
  }),
  mutations: {
    [mutations.SET_USER] (state, user) {
      state.user = user
    }
  },
  actions: {
    async [actions.FETCH_USER] ({ commit }) {
      const user = await axios.get('/oauth/me')

      if (!user.data) return

      commit(mutations.SET_USER, user.data)
    },
    async [actions.LOGOUT] ({ commit }) {
      await axios.get('/oauth/logout')
      commit(mutations.SET_USER, null)
    }
  }
}

export default room

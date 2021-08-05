import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:3000'

Vue.use(Vuex)

const Mutations = {
  INCREMENT: 'INCREMENT',
  DECREMENT: 'DECREMENT'
}

export default new Vuex.Store({
  state: {
    countHome: 0,
    countAbout: 0
  },
  mutations: {
    [Mutations.INCREMENT] (state, type) {
      type === 'countHome' ? state.countHome++ : state.countAbout++
    },
    [Mutations.DECREMENT] (state, type) {
      type === 'countHome' ? state.countHome-- : state.countAbout--
    }
  },
  actions: {
    increment ({ commit }, type) {
      commit(Mutations.INCREMENT, type)
    },
    decrement ({ commit }, type) {
      commit(Mutations.DECREMENT, type)
    },
    async fetchRooms () {
      const rooms = await axios.get('/r')
      return rooms.data
    }
  },
  modules: {
  }
})

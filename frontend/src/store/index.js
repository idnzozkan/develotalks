import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

import room from './room'
import user from './user'

Vue.use(Vuex)

axios.defaults.baseURL = 'http://localhost:3000'
axios.defaults.withCredentials = true

export default new Vuex.Store({
  modules: {
    room,
    user
  }
})

import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import Cookies from 'js-cookie'
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
  },
  plugins: [
    createPersistedState({
      key: ['user'],
      paths: ['user'],
      storage: {
        getItem: key => Cookies.get(key),
        setItem: (key, value) => Cookies.set(key, value, { expires: 14, secure: true }),
        removeItem: key => Cookies.remove(key)
      }
    })
  ]
})

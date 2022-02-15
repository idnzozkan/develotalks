import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import getRooms from '../@fake-db/rooms'

axios.defaults.baseURL = 'http://localhost:3000'

Vue.use(Vuex)

const Mutations = {
  SET_JOINED_ROOM: 'SET_JOINED_ROOM',
  SET_CREATE_ROOM_MODAL_VISIBILITY: 'SET_CREATE_ROOM_MODAL_VISIBILITY'
}

export default new Vuex.Store({
  state: {
    joinedRoom: null,
    isCreateRoomModalVisible: true
  },
  mutations: {
    [Mutations.SET_JOINED_ROOM] (state, room) {
      state.joinedRoom = room
    }
  },
  actions: {
    setJoinedRoom ({ commit }, room) {
      commit(Mutations.SET_JOINED_ROOM, room)
    },
    async fetchRooms () {
      const rooms = await axios.get('/r')
      return rooms.data
    },
    async fetchFakeRooms () {
      const rooms = await getRooms()
      return rooms
    }
  },
  modules: {
  }
})

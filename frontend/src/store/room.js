import axios from 'axios'
import getRooms from '../@fake-db/rooms'

const mutations = {
  SET_JOINED_ROOM: 'SET_JOINED_ROOM',
  SET_CREATE_ROOM_MODAL_VISIBILITY: 'SET_CREATE_ROOM_MODAL_VISIBILITY'
}

const actions = {
  SET_JOINED_ROOM: 'setJoinedRoom',
  FETCH_ROOMS: 'fetchRooms',
  FETCH_FAKE_ROOMS: 'fetchFakeRooms'
}

const room = {
  namespaced: true,
  state: () => ({
    joinedRoom: null,
    isCreateRoomModalVisible: true
  }),
  mutations: {
    [mutations.SET_JOINED_ROOM] (state, room) {
      state.joinedRoom = room
    }
  },
  actions: {
    [actions.SET_JOINED_ROOM] ({ commit }, room) {
      commit(mutations.SET_JOINED_ROOM, room)
    },
    async [actions.FETCH_ROOMS] () {
      const rooms = await axios.get('/r')
      return rooms.data
    },
    async [actions.FETCH_FAKE_ROOMS] () {
      const rooms = await getRooms()
      return rooms
    }
  }
}

export default room

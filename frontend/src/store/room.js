import axios from 'axios'

import { hmsActions } from '../lib/hms'
import getRooms from '../@fake-db/rooms'
import ROLES from '../support/constants/roles'

const mutations = {
  SET_JOINED_ROOM: 'SET_JOINED_ROOM',
  SET_CREATE_ROOM_MODAL_VISIBILITY: 'SET_CREATE_ROOM_MODAL_VISIBILITY'
}

const actions = {
  SET_JOINED_ROOM: 'setJoinedRoom',
  FETCH_ROOMS: 'fetchRooms',
  FETCH_FAKE_ROOMS: 'fetchFakeRooms',
  CREATE_ROOM: 'createRoom',
  JOIN_ROOM: 'joinRoom',
  LEAVE_ROOM: 'leaveRoom'
}

const room = {
  namespaced: true,
  state: () => ({
    joinedRoom: null
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
      const rooms = await axios.get('/rooms')
      return rooms.data
    },
    async [actions.FETCH_FAKE_ROOMS] () {
      const rooms = await getRooms()
      return rooms
    },
    async [actions.JOIN_ROOM] ({ dispatch, rootState }, { room, role }) {
      const { _id: userId, name: userName } = rootState.user.me
      const { _id: roomIdForServer, hmsId: roomIdForHMS } = room

      try {
        // Server request
        await axios.post(`/rooms/join?roomId=${roomIdForServer}`)

        // HMS request
        const token = await axios.post('/hms/token', { roomId: roomIdForHMS, userId, role })
        await hmsActions.join({
          userName,
          authToken: token.data,
          settings: {
            isAudioMuted: false,
            isVideoMuted: true
          },
          metaData: JSON.stringify({ user: rootState.user.me })
        })

        await dispatch(actions.SET_JOINED_ROOM, room)
      } catch (err) {
        await dispatch(actions.LEAVE_ROOM)
        throw new Error(err)
      }
    },
    async [actions.LEAVE_ROOM] ({ dispatch }) {
      try {
        // Server request
        await axios.post('/rooms/leave')

        // HMS request
        await hmsActions.leave()

        await dispatch(actions.SET_JOINED_ROOM, null)
      } catch (err) {
        console.log(err)
      }
    },
    async [actions.CREATE_ROOM] ({ dispatch }, { title, roomTags, roomLanguage, maxParticipants }) {
      const room = await axios.post('/rooms', {
        title,
        roomTags,
        roomLanguage,
        maxParticipants
      })
      await dispatch(actions.JOIN_ROOM, { room: room.data, role: ROLES.OWNER })
    }
  }
}

export default room

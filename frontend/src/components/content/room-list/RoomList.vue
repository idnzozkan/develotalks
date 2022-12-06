<script>
import { mapActions } from 'vuex'

import socket from '../../../lib/socket'
import RoomCard from './room-card'

export default {
  name: 'RoomList',
  components: {
    RoomCard
  },
  data () {
    return {
      rooms: [],
      isLoading: true
    }
  },
  methods: {
    ...mapActions('room', ['fetchRooms'])
  },
  async mounted () {
    this.rooms = await this.fetchRooms()

    socket.on('rooms:updated', rooms => {
      this.rooms = rooms
    })

    this.isLoading = false
  }
}
</script>

<template lang="pug">
  .home-container
    .room-list-container
      p(v-if="isLoading") Please wait...
      div(v-else v-for="room in rooms")
        RoomCard(:room="room")

</template>

<style scoped lang="scss">
.home-container {
  padding-bottom: 2.5rem;
}

.room-list-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, 380px);
  justify-content: space-between;
}
</style>

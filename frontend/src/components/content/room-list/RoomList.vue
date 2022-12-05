<script>
import { mapActions } from 'vuex'
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
    ...mapActions('room', ['fetchRooms', 'fetchFakeRooms'])
  },
  async mounted () {
    this.rooms = await this.fetchRooms()
    // this.rooms = await this.fetchFakeRooms()
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

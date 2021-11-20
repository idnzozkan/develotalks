<script>
import { mapActions } from 'vuex'
import RoomCard from './RoomCard'

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
    ...mapActions(['fetchRooms', 'fetchFakeRooms'])
  },
  async mounted () {
    // this.rooms = await this.fetchRooms()
    this.rooms = await this.fetchFakeRooms()
    this.isLoading = false
  }
}
</script>

<template lang="pug">
  .room-list-container
    p(v-if="isLoading") Please wait...
    div(v-else v-for="room in rooms")
      RoomCard(:title="room.title"
               :owner="room.owner"
               :participants="room.participants"
               :language="room.roomLanguage"
               :tags="room.roomTags"
               :maxParticipants="room.maxParticipants"
               :isPrivate="room.isPrivate")

</template>

<style scoped lang="scss">
  .room-list-container {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 4rem;
    padding: 3.4375rem 8rem;
  }
</style>

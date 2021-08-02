<script>
import { mapActions } from 'vuex'
import RoomCard from '@/components/RoomCard.vue'

export default {
  name: 'Home',
  components: {
    RoomCard
  },
  data () {
    return {
      rooms: []
    }
  },
  methods: {
    ...mapActions(['fetchRooms'])
  },
  async mounted () {
    this.rooms = await this.fetchRooms()
  }
}
</script>

<template lang="pug">
  .home
    div(v-for="room in rooms")
      RoomCard(:title="room.title" :owner="room.owner" :participants="room.participants" :language="room.roomLanguage" :tags="room.roomTags" :maxParticipants="room.maxParticipants" :isPrivate="isPrivate")
</template>

<style lang="scss" scoped>
  .home {
    display: flex;
    padding: 10rem;
    background-color: rgba(255, 217, 0, 0.151);
  }
</style>

<script>
import { mapActions } from 'vuex'
import RoomCard from '@/components/content/RoomCard.vue'

export default {
  name: 'Home',
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
    ...mapActions(['fetchRooms'])
  },
  async mounted () {
    this.rooms = await this.fetchRooms()
    this.isLoading = false
  }
}
</script>

<template lang="pug">
  .home
    p(v-if="isLoading") Please wait...
    div(v-else v-for="room in rooms")
      RoomCard(:title="room.title" :owner="room.owner" :participants="room.participants" :language="room.roomLanguage" :tags="room.roomTags" :maxParticipants="room.maxParticipants" :isPrivate="room.isPrivate")
</template>

<style lang="scss" scoped>
.home {
  display: flex;
  padding: 10rem;
}
</style>

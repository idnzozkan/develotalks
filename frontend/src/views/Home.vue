<script>
import { mapActions, mapState } from 'vuex'
import RoomList from '@/components/content/room-list'

export default {
  name: 'Home',
  components: {
    RoomList
  },
  computed: {
    ...mapState('user', ['user'])
  },
  methods: {
    ...mapActions('user', ['fetchUser'])
  },
  async mounted () {
    if (this.user) return
    await this.fetchUser()
  }
}
</script>

<template lang="pug">
  RoomList
</template>

<style lang="scss" scoped></style>

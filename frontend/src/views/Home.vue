<script>
import { mapActions, mapState } from 'vuex'
import RoomList from '@/components/content/room-list'

export default {
  name: 'Home',
  components: {
    RoomList
  },
  computed: {
    ...mapState('user', ['me'])
  },
  methods: {
    ...mapActions('user', ['fetchMe'])
  },
  async mounted () {
    await this.fetchMe()
  }
}
</script>

<template lang="pug">
  RoomList
</template>

<style lang="scss" scoped></style>

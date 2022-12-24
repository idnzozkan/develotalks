<script>
import { mapActions, mapState } from 'vuex'

import RoomList from '@/components/content/room-list'
import { setSocketId } from '../lib/socket/helpers'

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

    if (this.me) {
      setSocketId(this.me._id)
    } else {
      setSocketId(null)
    }
  }
}
</script>

<template lang="pug">
  RoomList
</template>

<style lang="scss" scoped></style>

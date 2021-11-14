<script>
import RoomList from '@/components/rooms/RoomList.vue'

export default {
  name: 'Home',
  components: {
    RoomList
  }
}
</script>

<template lang="pug">
  .container
    RoomList
</template>

<style lang="scss" scoped>
  .container {
    padding: 4rem 8.87500rem;
  }
</style>

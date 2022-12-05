<script>
import Chatbox from './chatbox'

export default {
  name: 'RoomSidePanel',
  components: {
    Chatbox
  }
}
</script>

<template lang="pug">
  .room-side-panel
    Chatbox
</template>

<style lang="scss">
  .room-side-panel {
    flex: 1.2;
    border-radius: 1.25rem;
    background-color: #2C353D;
    margin-left: 2rem;
  }
</style>

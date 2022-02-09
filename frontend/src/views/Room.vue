<script>
import Participants from '../components/content/participants'
import RoomActions from '../components/content/room-actions'
import RoomSidePanel from '../components/content/room-side-panel'

export default {
  name: 'Room',
  components: {
    Participants,
    RoomActions,
    RoomSidePanel
  }
}
</script>

<template lang="pug">
  .room-container
    .main-session-area
      Participants
      RoomActions
    RoomSidePanel
</template>

<style lang="scss">
  .room-container {
    display: flex;
  }

  .main-session-area {
    flex: 3;
    display: flex;
    flex-direction: column;
    height: 75vh;
  }
</style>

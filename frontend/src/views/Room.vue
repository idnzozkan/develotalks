<script>
import { selectPeers } from '@100mslive/hms-video-store'

import { hmsStore } from '../lib/hms'
import RoomHeader from '../components/content/room-header'
import Participants from '../components/content/participants'
import RoomActions from '../components/content/room-actions'
import RoomSidePanel from '../components/content/room-side-panel'

export default {
  name: 'Room',
  components: {
    RoomHeader,
    Participants,
    RoomActions,
    RoomSidePanel
  },
  data () {
    return {
      peers: []
    }
  },
  methods: {
    renderPeers (peers) {
      this.peers = peers
    }
  },
  created () {
    hmsStore.subscribe(this.renderPeers, selectPeers)
  }
}
</script>

<template lang="pug">
  .room-container
    .main-session-area
      RoomHeader
      Participants(:peers="peers")
      RoomActions
    RoomSidePanel
</template>

<style lang="scss">
.room-container {
  display: flex;
  height: 100vh;
  padding: 2.4375rem 0;
}

.main-session-area {
  flex: 3;
  display: flex;
  flex-direction: column;
  border-radius: 1.25rem;
  background: rgba(0, 0, 0, 0.2);
  overflow: hidden;
}
</style>

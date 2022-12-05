<script>
import ROLES from '../../../support/constants/roles'
import Participant from '../participant'

export default {
  name: 'Participants',
  components: {
    Participant
  },
  props: {
    peers: Array,
    renderPeers: Function
  },
  beforeCreate () {
    this.ROLES = ROLES
  }
}
</script>

<template lang="pug">
  .participants
    Participant(v-for="peer in peers" :key="peer.id" :peer="peer")
</template>

<style lang="scss" scoped>
.participants {
  flex: 8;
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-wrap: wrap;
  background: rgba(0, 0, 0, 0.05);
  overflow: auto;

  &::-webkit-scrollbar {
    width: 5px;
    height: 5px;
  }

  &::-webkit-scrollbar-button {
    width: 0px;
    height: 0px;
  }

  &::-webkit-scrollbar-thumb {
    background: rgba(44, 52, 62, 0.5);
    border: 0px none #ffffff;
    border-radius: 50px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: rgba(44, 52, 62, 0.75);
  }

  &::-webkit-scrollbar-thumb:active {
    background: rgba(44, 52, 62);
  }

  &::-webkit-scrollbar-track {
    background: #171c20;
    border: 0px none #ffffff;
    border-radius: 50px;
  }

  &::-webkit-scrollbar-track:hover {
    background: #171c20;
  }

  &::-webkit-scrollbar-track:active {
    background: #171c20;
  }

  &::-webkit-scrollbar-corner {
    background: transparent;
  }
}
</style>

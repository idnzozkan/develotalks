<script>
import { mapActions } from 'vuex'

export default {
  name: 'RoomActions',
  methods: {
    ...mapActions('room', ['setJoinedRoom']),
    handleLeaveBtn () {
      this.setJoinedRoom(null)
      this.$router.push('/')
    }
  }
}
</script>

<template lang="pug">
  .room-actions
    .room-actions-wrapper
      button.room-action-btn.mic
        font-awesome-icon(icon="microphone")
      button.room-action-btn.camera
        font-awesome-icon(icon="video")
      button.room-action-btn.screen-share
        font-awesome-icon(icon="share-square")
      button.room-action-btn.leave(@click="handleLeaveBtn")
        font-awesome-icon(icon="phone-slash")
      button.room-action-btn.fullscreen
        font-awesome-icon(icon="expand")
      button.room-action-btn.people
        font-awesome-icon(icon="users")
      button.room-action-btn.chat
        font-awesome-icon(icon="comments")
</template>

<style lang="scss">
  .room-actions {
    flex: 1;
    margin-top: 2rem;
  }

  .room-actions-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
  }

  .room-action-btn {
    flex: 1;
    padding: 1.25rem 1rem;
    cursor: pointer;
    margin-right: 1rem;
    border-radius: 10px;
    outline: none;
    border: none;
    background: #2C353D;
    color: #A8A9AF;
    font-size: 1.5rem;
    transition: all 100ms;

    &:last-child {
      margin-right: 0;
    }

    &.leave {
      flex: 2;
      margin: 0 5rem;
      background: #DE3D3D;
      color: #F9E1E1;
      font-weight: 600;

      &:hover {
        background: #ff4242;
      }
    }

    &:hover {
      background: #36414b;
    }
  }
</style>

<script>
import {
  selectIsLocalAudioEnabled,
  selectIsLocalVideoEnabled,
  selectIsLocalScreenShared,
  selectIsSomeoneScreenSharing
} from '@100mslive/hms-video-store'
import { mapActions } from 'vuex'

import { hmsActions, hmsStore } from '../../../lib/hms'

export default {
  name: 'RoomActions',
  methods: {
    ...mapActions('room', ['leaveRoom']),
    async handleLeaveBtn () {
      if (!confirm('Are you sure you want to leave?')) {
        return
      }
      await this.leaveRoom()
      this.$router.push('/')
    },
    async toggleMic () {
      const isAudioEnabled = hmsStore.getState(selectIsLocalAudioEnabled)
      await hmsActions.setLocalAudioEnabled(!isAudioEnabled)
    },
    async toggleCam () {
      const isVideoEnabled = hmsStore.getState(selectIsLocalVideoEnabled)
      await hmsActions.setLocalVideoEnabled(!isVideoEnabled)
    },
    async toggleScreenShare () {
      const isScreenShareEnabled = hmsStore.getState(selectIsLocalScreenShared)
      const isSomeoneScreenSharing = hmsStore.getState(selectIsSomeoneScreenSharing)

      if (isSomeoneScreenSharing && !isScreenShareEnabled) {
        return alert('Someone is already sharing their screen')
      }

      await hmsActions.setScreenShareEnabled(!isScreenShareEnabled)
    }
  },
  created () {
    window.onunload = window.onbeforeunload = this.leaveRoom
  }
}
</script>

<template lang="pug">
  .room-actions
    .room-actions-wrapper
      .left-group-buttons
        button.room-action-btn.mic(@click="toggleMic")
          font-awesome-icon(icon="microphone")
        button.room-action-btn.camera(@click="toggleCam")
          font-awesome-icon(icon="video")
        button.room-action-btn.screen-share(@click="toggleScreenShare")
          font-awesome-icon(icon="share-square")

      button.room-action-btn.leave(@click="handleLeaveBtn")
        font-awesome-icon(icon="phone-slash")
</template>

<style lang="scss">
.room-actions {
  flex: 1;
  background: rgb(0, 0, 0);
  background: linear-gradient(0deg, rgba(13, 12, 24, 0.085) 100%, rgba(0, 0, 0, 0) 0%);
  border-top: 1px solid rgb(44 52 62 / 50%);
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
}

.room-actions-wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  padding: 1rem 1.5rem;
}

.left-group-buttons {
  display: flex;
}

.room-action-btn {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem 2.75rem;
  margin-right: 0.75rem;
  border-radius: 10px;
  border: none;
  outline: none;
  width: 4rem;
  height: 3.5rem;
  font-size: 1.35rem;
  background: #2c353d;
  color: #a8a9af;
  cursor: pointer;
  transition: all 100ms;

  &:last-child {
    margin-right: 0;
  }

  &.leave {
    padding-left: 5rem;
    padding-right: 5rem;
    background: #de3d3d;
    color: #f9e1e1;
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

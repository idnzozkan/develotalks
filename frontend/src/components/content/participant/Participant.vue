<script>
import { selectCameraStreamByPeerID, selectIsPeerAudioEnabled, selectIsPeerVideoEnabled } from '@100mslive/hms-video-store'

import { hmsActions, hmsStore } from '../../../lib/hms'
import ROLES from '../../../support/constants/roles'

export default {
  name: 'Participant',
  props: {
    peer: Object
  },
  data () {
    return {
      videoRef: {},
      videoTrack: hmsStore.getState(selectCameraStreamByPeerID(this.peer.id)),
      isMicOn: hmsStore.getState(selectIsPeerAudioEnabled(this.peer.id)),
      isCamOn: hmsStore.getState(selectIsPeerVideoEnabled(this.peer.id))
    }
  },
  watch: {
    videoTrack: function (track) {
      if (this.$refs.videoRef && track) {
        if (track.enabled) {
          hmsActions.attachVideo(track.id, this.$refs.videoRef)
        } else {
          hmsActions.detachVideo(track.id, this.$refs.videoRef)
        }
      }
    }
  },
  methods: {
    updateVideoTrack (track) {
      this.videoTrack = track
    },
    updateIsMicOn (state) {
      this.isMicOn = state
    },
    updateIsCamOn (state) {
      this.isCamOn = state
    }
  },
  created () {
    hmsStore.subscribe(this.updateVideoTrack, selectCameraStreamByPeerID(this.peer.id))
    hmsStore.subscribe(this.updateIsMicOn, selectIsPeerAudioEnabled(this.peer.id))
    hmsStore.subscribe(this.updateIsCamOn, selectIsPeerVideoEnabled(this.peer.id))
  },
  beforeCreate () {
    this.ROLES = ROLES
  }
}
</script>

<template lang="pug">
  .participant
    video(
      v-show="isCamOn"
      autoplay
      muted
      playsinline
      ref="videoRef"
    )
    img(
      v-if="!isCamOn"
      :src="JSON.parse(peer.metadata).user.avatar"
      referrerpolicy="no-referrer"
    )
    .tile-top
      font-awesome-icon(icon="crown" v-if="peer.roleName === ROLES.OWNER")
    .tile-bottom
      font-awesome-icon(icon="microphone-slash" v-if="!isMicOn")
      span {{ peer.isLocal ? peer.name + ' (You)' : peer.name }}
</template>

<style lang="scss">
.participant {
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  background: #2c353d;
  color: #d1d1d1;
  margin: 1.5rem;
  border-radius: 1.25rem;
  height: 42%;
  width: 42%;
  overflow: hidden;

  img {
    width: 8.75rem;
    height: 8.75rem;
    border-radius: 50%;
    user-select: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    -webkit-user-drag: none;
  }

  video {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .tile-top {
    position: absolute;
    top: 12px;
    left: 20px;
    font-size: 0.8rem;
    padding: 0.25rem;
    border-radius: 1rem;
    background: rgba(0, 0, 0, 0.25);
    backdrop-filter: blur(2px);
    -webkit-backdrop-filter: blur(2px);
  }

  .tile-bottom {
    position: absolute;
    bottom: 12px;
    left: 20px;
    display: flex;
    align-items: center;
    font-size: 0.8rem;
    padding: 0.5rem 0.75rem;
    border-radius: 1rem;
    background: rgba(0, 0, 0, 0.25);
    backdrop-filter: blur(2px);
    -webkit-backdrop-filter: blur(2px);

    svg {
      color: #de3d3d;
      margin-right: 0.5rem;
    }
  }
}

.speaking {
  border: 3px solid #6c5dd3;
}
</style>

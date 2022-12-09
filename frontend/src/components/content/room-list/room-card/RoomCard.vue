<script>
import { mapActions, mapState } from 'vuex'
import Spinner from 'vue-simple-spinner'

import ROLES from '../../../../support/constants/roles'

export default {
  name: 'RoomCard',
  data () {
    return {
      isConnecting: false
    }
  },
  props: {
    room: Object
  },
  components: {
    Spinner
  },
  computed: {
    ...mapState('user', ['me']),
    role () {
      if (this.me.createdRoom?._id === this.room._id) {
        return ROLES.OWNER
      }
      return ROLES.PARTICIPANT
    },
    participantAvatarSize () {
      return `width: ${90 / this.room.maxParticipants}%; height: 0; padding-bottom: ${90 / this.room.maxParticipants}%;`
    },
    participantCircleSize () {
      return `padding-top: ${90 / this.room.maxParticipants}%;`
    },
    isFull () {
      return this.room.participants.length >= this.room.maxParticipants
    },
    btnVariantByPrivacy () {
      return this.room.isPrivate ? 'btn-private' : 'btn-public'
    },
    btnTextByCapacity () {
      return this.isFull ? 'Full' : 'Join'
    },
    btnVariantByCapacity () {
      return this.isFull ? 'btn-full' : this.btnVariantByPrivacy
    }
  },
  methods: {
    ...mapActions('room', ['joinRoom']),
    async handleJoinButton (id) {
      if (this.isFull) {
        return
      }

      try {
        this.isConnecting = true
        await this.joinRoom({ room: this.room, role: this.role })
        this.$router.push(`/r/${this.room._id}`)
      } catch (err) {
        console.log('error', err)
      } finally {
        this.isConnecting = false
      }
    }
  }
}
</script>

<template lang="pug">
  .container
    .connecting-text(v-if="isConnecting")
      Spinner(line-fg-color="#6c5dd3" message="Connecting..." text-fg-color="#fff" :spacing="8")
    .room-card(:class="isConnecting && 'connecting'")
      .card-top
        span.room-title {{ room.title }}
        .room-details
          font-awesome-icon(icon="info-circle" class="info-icon")
      .participants
        .participant-avatar-container(v-for="participant in room.participants" :style="participantAvatarSize")
          img(:src="participant.avatar" referrerpolicy="no-referrer")
        template(v-if="room.participants.length < room.maxParticipants" )
          .participant-avatar-container(v-for="circle in room.maxParticipants - room.participants.length" :style="participantAvatarSize")
            .participant-space-circle
      .tags
        ul
          li(v-for="tag in room.roomTags")
            | {{ tag }}
      .card-bottom
        .max-participants
          font-awesome-icon(icon="user-friends")
          span {{ room.participants.length + '/' + room.maxParticipants }}
        .room-language
          font-awesome-icon(icon="globe")
          span {{ room.roomLanguage }}
        .join-button
          button(:class="btnVariantByCapacity + ' btn'" @click="handleJoinButton(room._id)" :disabled="isConnecting") {{ btnTextByCapacity }}
</template>

<style lang="scss" scoped>
.container {
  position: relative;
}

.connecting-text {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1;
  padding: 1rem 1.5rem;
  color: white;
}

.room-card {
  background-color: #2c353d;
  border-radius: 1.25rem;
  width: 23.75rem;
  height: 28.875rem;
  color: white;
  padding: 1.75rem;
  margin-top: 3.5rem;
  transition: opacity 4s;

  &.connecting {
    opacity: 0.5;
    pointer-events: none;
  }

  .card-top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 1.25rem;

    span {
      width: 90%;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    svg {
      color: rgba(97, 117, 124, 0.8);
      transition: all 0.075s ease;

      &:hover {
        cursor: pointer;
      }

      &:active {
        transform: scale(0.9);
      }
    }
  }

  .participants {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    align-items: center;
    width: 100%;
    height: 11.4375rem;
    margin: 2.875rem 0;

    .participant-avatar-container {
      border-radius: 50%;
      overflow: hidden;
      position: relative;
      margin-right: 0.5rem;
      user-select: none;
      -webkit-user-select: none;
      -moz-user-select: none;
      &:hover {
        cursor: pointer;
        img {
          width: 105%;
        }
      }

      img {
        width: 100%;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        -webkit-user-drag: none;
        transition: all 0.15s ease;
      }
    }

    .participant-space-circle {
      border: 2px dashed #61757cc7;
      border-radius: 50%;
      width: 100%;
      height: 100%;
      position: absolute;

      &:hover {
        cursor: default;
      }
    }
  }

  .tags {
    ul {
      display: flex;
      flex-wrap: nowrap;
      overflow-x: auto;
      user-select: none;
      -webkit-user-select: none;
      -moz-user-select: none;
      -webkit-overflow-scrolling: touch;

      &::-webkit-scrollbar {
        display: none;
      }

      li {
        width: fit-content;
        background: rgba(97, 117, 124, 0.3);
        color: rgba(255, 255, 255, 0.5);
        border-radius: 1.25rem;
        padding: 0.5rem;
        margin-right: 1.4375rem;
        transition: all 0.075s ease;
        font-size: 1rem;
        font-weight: 300;
        line-height: 1.1875rem;

        &:hover {
          cursor: pointer;
          background: rgba(97, 117, 124, 0.35);
          color: rgba(255, 255, 255, 0.55);
        }

        &:active {
          transform: scale(0.98);
        }
      }
    }
  }

  .card-bottom {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 25%;
    font-weight: 700;
    color: rgba(255, 255, 255, 0.3);
    user-select: none;
    -webkit-user-select: none;
    -moz-user-select: none;

    div {
      display: flex;
      align-items: center;
    }

    svg {
      margin-right: 0.9375rem;
      font-size: 1.375rem;
    }

    span {
      font-size: 100%;
    }

    .btn {
      width: 5.625rem;
      height: 2.625rem;
      border-radius: 1.25rem;
      outline: none;
      border: none;
      font-size: 1rem;
      font-weight: 700;
      text-transform: uppercase;
      transition: all 0.05s ease-out;
      transition: opacity 4s;

      &:hover {
        cursor: pointer;
      }

      &-public {
        color: #ffffff;
        background: linear-gradient(180deg, #897dd7 0%, #6c5dd3 100%);
        border: 1px solid #897dd7;

        &:active {
          transform: scale(0.98);
        }
      }

      &-private {
        color: #ffffff;
        background: linear-gradient(180deg, #fd996f 0%, #ff6e30 100%);
        border: 1px solid #fd996f;

        &:active {
          transform: scale(0.98);
        }
      }

      &-full {
        color: rgba(255, 255, 255, 0.3);
        background: linear-gradient(180deg, rgba(97, 117, 124, 0.3) 0%, rgba(97, 117, 124, 0.3) 100%);
        border: 1px solid rgba(97, 117, 124, 0.2);

        &:hover {
          cursor: not-allowed;
        }
      }
    }
  }
}
</style>

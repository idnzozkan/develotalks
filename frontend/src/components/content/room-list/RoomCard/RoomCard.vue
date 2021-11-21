<script>
export default {
  name: 'RoomCard',
  props: {
    title: String,
    owner: Object,
    participants: Array,
    language: String,
    tags: Array,
    maxParticipants: Number,
    isPrivate: Boolean
  },
  data () {
    return {
      btnText: 'Join'
    }
  },
  computed: {
    participantAvatarSize () {
      return `width: ${90 / this.maxParticipants}%; height: 0; padding-bottom: ${90 / this.maxParticipants}%;`
    },
    participantCircleSize () {
      return `padding-top: ${90 / this.maxParticipants}%;`
    },
    btnVariantByPrivacy () {
      return this.isPrivate ? 'btn-private' : 'btn-public'
    },
    btnTextByCapacity () {
      return (this.participants.length >= this.maxParticipants) ? 'Full' : 'Join'
    },
    btnVariantByCapacity () {
      return (this.participants.length >= this.maxParticipants) ? 'btn-full' : this.btnVariantByPrivacy
    }
  },
  mounted () {
    this.participantSpaceHeight()
  }
}
</script>

<template lang="pug">
  .room-card
    .card-top
      p.room-title {{ title }}
      .room-details
        font-awesome-icon(icon="info-circle" class="info-icon")
    .participants
      .participant-avatar-container(v-for="participant in this.participants" :style="participantAvatarSize")
        img(src="https://www.shareicon.net/data/512x512/2016/07/05/791224_man_512x512.png")
      template(v-if="this.participants.length < this.maxParticipants" )
        .participant-avatar-container(v-for="circle in this.maxParticipants - this.participants.length" :style="participantAvatarSize")
         .participant-space-circle
    .tags
      ul
        li(v-for="tag in tags")
         | {{ tag }}
    .card-bottom
      .max-participants
        font-awesome-icon(icon="user-friends")
        span {{ participants.length + '/' + maxParticipants }}
      .room-language
        font-awesome-icon(icon="globe")
        span {{ language }}
      .join-button
        button(:class="btnVariantByCapacity + ' btn'") {{ btnTextByCapacity }}
</template>

<style lang="scss" scoped>
  .room-card {
    background-color: #2C353D;
    border-radius: 1.25rem;
    max-width: 23.75rem;
    height: 28.87500rem;
    color: white;
    padding: 1.75rem;

    .card-top {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 1.25rem;

      p {
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
          transform: scale(0.9)
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
      margin: 2.87500rem 0;

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
          top: 50%; left: 50%;
          transform: translate(-50%, -50%);
          -webkit-user-drag: none;
          transition: all 0.15s ease;
        }
      }

      .participant-space-circle {
        border: 2px dashed #61757C;
        border-radius: 50%;
        width: 100%;
        height: 100%;
        position: absolute;

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
            transform: scale(0.98)
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
        font-size: 1.37500rem;
      }

      span {
        font-size: 100%;
      }

      .btn {
        width: 5.62500rem;
        height: 2.62500rem;
        border-radius: 1.25rem;
        outline: none;
        border: none;
        font-size: 1rem;
        font-weight: 700;
        text-transform: uppercase;
        transition: all 0.05s ease-out;

        &:hover {
          cursor: pointer;
        }

        &-public {
          color: #FFFFFF;
          background: linear-gradient(180deg, #897DD7 0%, #6C5DD3 100%);
          border: 1px solid #897DD7;

          &:active {
            transform: scale(0.98);
          }
        }

        &-private {
          color: #FFFFFF;
          background: linear-gradient(180deg, #FD996F 0%, #FF6E30 100%);
          border: 1px solid #FD996F;

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

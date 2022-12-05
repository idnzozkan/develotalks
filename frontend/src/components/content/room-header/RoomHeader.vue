<script>
import { mapState } from 'vuex'

export default {
  name: 'RoomHeader',
  computed: {
    ...mapState('room', ['joinedRoom'])
  }
}
</script>

<template lang="pug">
  .inroom-header
    .inroom-header-wrapper
      .inroom-header-texts
        h2.inroom-title {{ joinedRoom.title }}
        .inroom-info-section
          span.inroom-language {{ joinedRoom.roomLanguage }}
          span.inroom-private(v-if="joinedRoom.isPrivate") Private
          span.inroom-tag(v-if="joinedRoom.roomTags.length" v-for="tag in joinedRoom.roomTags")
            | {{ tag }}
</template>

<style lang="scss" scoped>
.inroom-header {
  width: 100%;
  background: rgb(0,0,0);
  background: linear-gradient(0deg, rgba(0,0,0,0) 0%, rgba(13, 12, 24, 0.085) 100%);
  border-bottom: 1px solid rgb(44 52 62 / 50%);
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);

  &-wrapper {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1rem 1.5rem;
  }

  &-texts {
    h2 {
      color: white;
    }

    .inroom-info-section {
      display: flex;
      align-items: center;
      margin-top: 0.75rem;
      font-size: 0.9rem;

      span {
        padding: 0.2rem 0.625rem;
        margin-right: 0.75rem;
        border-radius: 8px;

        &.inroom-language {
          border: 1px solid #6d5dd398;
          color: #6c5dd3;
        }

        &.inroom-private {
          border: 1px solid #ff6e3098;
          color: #ff6e30;
        }

        &.inroom-tag {
          background: rgba(97, 117, 124, 0.3);
          border: 1px solid rgba(97, 117, 124, 0.3);
          color: rgba(255, 255, 255, 0.5);
        }
      }
    }
  }

  &-icons {
    display: inline-flex;
    align-items: center;
    svg {
      color: rgba(97, 117, 124, 0.5);
      transition: all 0.075s ease;
      font-size: 2rem;
      margin-left: 0.5rem;
      padding: 0.35rem;

      &:hover {
        color: rgba(97, 117, 124, 0.8);
        cursor: pointer;
      }

      &:active {
        transform: scale(0.9);
      }
    }
  }
}
</style>

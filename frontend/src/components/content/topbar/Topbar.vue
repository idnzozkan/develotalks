<script>
import { mapActions, mapState } from 'vuex'

import Logo from '../../shared/logo'

export default {
  name: 'Topbar',
  data () {
    return {
      inRoom: false
    }
  },
  components: {
    Logo
  },
  computed: {
    ...mapState('room', ['joinedRoom']),
    ...mapState('user', ['me'])
  },
  methods: {
    ...mapActions('room', ['setJoinedRoom']),
    ...mapActions('user', ['logout']),
    handleSearchBoxClick () {
      if (this.$route.path === '/') {
        return
      }

      this.$router.push('/')
    },
    backToRoom () {
      this.$router.push('/r/' + this.joinedRoom._id)
    },
    handleLogin () {
      window.open(`${process.env.VUE_APP_BACKEND_BASE_PATH}/oauth/google`, '_self')
    },
    async handleLogout () {
      await this.logout()
    }
  },
  watch: {
    '$route' () {
      if (this.$route.path.startsWith('/r/')) {
        this.inRoom = true
        return
      }
      this.inRoom = false
    }
  }
}
</script>

<template lang="pug">
  .topbar(v-if="!inRoom")
    .topbar-inner-container
      Logo(v-if="!me")
      .topbar-search(v-if="!inRoom")
        font-awesome-icon(icon="search")
        input.search-box(type="search" placeholder="Search for rooms" @click="handleSearchBoxClick")
      .back-to-room(v-if="!inRoom && joinedRoom" @click="backToRoom")
        .back-to-room-wrapper
          .back-to-room-circle.pulse
          span Back to Room
      button.login-btn(v-if="!me" @click="handleLogin") Login
      .topbar-profile(v-if="me")
        font-awesome-icon(:icon="['far', 'bell']")
        .user-avatar-frame(@click="handleLogout")
          img(:src="me.avatar + '=s96-c'" referrerpolicy="no-referrer")
</template>

<style lang="scss" scoped>
.topbar {
  border-bottom: 1px solid #2C353D;
  width: 100%;

  .topbar-inner-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1.9rem 0;
    width: 68vw;
    margin: auto;

    .topbar-search {
      display: flex;
      align-items: center;
      width: 50%;
      height: auto;

      .search-box {
        border: none;
        outline: none;
        min-width: 75%;
        border-radius: 1.25rem;
        padding: 0.65rem 1.12500rem 0.65rem 2.9rem;
        background: #2C353D;
        font-size: 1rem;
        font-weight: 400;
        line-height: 1.1875rem;
        color: #6B7277;

        &::placeholder {
          color: #6B7277;
          opacity: 1;
        }

        &:-ms-input-placeholder {
          color: #6B7277;
        }

        &::-ms-input-placeholder {
          color: #6B7277;
        }

        &::-webkit-search-cancel-button {
          -webkit-appearance: none;
          height: 1em;
          width: 1em;
          border-radius: 50em;
          background: url(https://pro.fontawesome.com/releases/v5.10.0/svgs/solid/times-circle.svg) no-repeat 50% 50%;
          background-size: contain;
          opacity: 0;
          pointer-events: none;
          filter: invert(1);
        }

        &:focus::-webkit-search-cancel-button {
          opacity: .15;
          pointer-events: all;

          &:hover {
            cursor: pointer;
          }
        }
      }

      svg {
        position: absolute;
        margin-left: 1.12500rem;
        font-size: 1.12500rem;
        color: #6B7277;
      }
    }

    .back-to-room {
      &-wrapper {
        display: flex;
        align-items: center;
        height: 100%;
        cursor: pointer;
      }

      &-circle {
        width: 24px;
        height: 24px;
        border-radius: 50%;
        box-shadow: 0px 0px 1px 1px #38ED85;
        background: #4FC380;
        margin-right: 1.5rem;
      }

      span {
        font-size: 1rem;
        color: #4FC380;
        border: 1px solid #4FC380;
        background: #4fc37f0a;
        border-radius: 8px;
        padding: 0.5rem 1rem;
        transition: all 200ms ease;

        &:hover {
          color: #47db85;
        }
      }

      .pulse {
        animation: pulse-animation 1.5s infinite;
      }

      @keyframes pulse-animation {
        0% {
          box-shadow: 0 0 0 0px #4FC380;
        }
        100% {
          box-shadow: 0 0 0 12px rgba(79, 195, 128, 0);
        }
      }
    }

    .login-btn {
      padding: 10px 20px;
      margin-right: 10px;
      cursor: pointer;
      border: 1px solid #6c5dd3;
      border-radius: 8px;
      background-color: transparent;
      color: #6c5dd3;
      font-size: 1rem;
      transition: all 0.15s ease;

      &:hover {
        background-color: #6d5dd310;
        color: #7867e0;
      }

      &:active {
        transform: scale(0.98);
      }
    }

    .topbar-profile {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      width: fit-content;
      height: auto;
      padding-right: 1rem;

      svg {
        font-size: 1.5625rem;
        color: #6B7277;
        margin-right: 3rem;

        &:hover {
          cursor: pointer;
        }
      }

      .user-avatar-frame {
        width: 3rem;
        height: 3rem;
        border-radius: 50%;
        overflow: hidden;
        &:hover {
          cursor: pointer;
        }

        img {
          width: 100%;
        }
      }
    }
  }
}

</style>

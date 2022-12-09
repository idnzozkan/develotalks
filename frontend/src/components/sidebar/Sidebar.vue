<script>
import { mapState } from 'vuex'

import Header from './header'
import Profile from './profile'
import CreateRoom from './create-room'
import Menu from './menu'
import FriendsList from './friends-list'
import Footer from './footer'

export default {
  name: 'Sidebar',
  components: {
    Header,
    Profile,
    CreateRoom,
    Menu,
    FriendsList,
    Footer
  },
  computed: {
    ...mapState('user', ['me'])
  }
}
</script>

<template lang="pug">
  .sidebar-container(v-if="me")
    Header
    Profile
    CreateRoom
    Menu
    FriendsList
    Footer
</template>

<style lang="scss" scoped>
.sidebar-container {
  flex: 1;
  position: sticky;
  top: 0;
  left: 0;
  min-width: 22rem;
  height: 100vh;
  border-right: 1px solid #2C353D;
  overflow-y: auto;
  z-index: 1;

  &::-webkit-scrollbar {
    display: none;
  }
}
</style>

<script>
import Header from './header'
import Profile from './profile'
import CreateRoomButton from './create-room-button'
import Menu from './menu'
import FriendsList from './friends-list'
import Footer from './footer'

export default {
  name: 'Sidebar',
  components: {
    Header,
    Profile,
    CreateRoomButton,
    Menu,
    FriendsList,
    Footer
  }
}
</script>

<template lang="pug">
  .sidebar-container
    Header
    Profile
    CreateRoomButton
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

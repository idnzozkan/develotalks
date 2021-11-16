<script>
import Header from './Header.vue'
import Profile from './Profile.vue'
import CreateRoomButton from './create-room/create-room-button'
import Menu from './Menu.vue'
import FriendsList from './friends-list'
import Footer from './Footer.vue'

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
  position: relative;
  padding: 2.4375rem;
  width: 21.562rem;
  height: 100vh;
  overflow: hidden;
  border-right: 1px solid #2C353D;
}
</style>

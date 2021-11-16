<script>
export default {
  name: 'Menu'
}
</script>

<template lang="pug">
  .sidebar-menu
    ul
      li
        router-link(to="/") Home
    ul
      li
        router-link(to="/messages") Messages
    ul
      li
        router-link(to="/settings") Settings
</template>

<style lang="scss">

</style>

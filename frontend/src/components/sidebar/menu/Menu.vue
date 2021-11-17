<script>
export default {
  name: 'Menu'
}
</script>

<template lang="pug">
  .sidebar-menu
    ul
      li
        router-link(to="/" )
          font-awesome-icon(icon="home")
          |  Home
      li
        router-link(to="/messages")
          font-awesome-icon(icon="comment")
          |  Messages
      li
        router-link(to="/settings")
          font-awesome-icon(icon="cog")
          |  Settings
</template>

<style lang="scss" scoped>
.sidebar-menu {
  svg {
    font-size: 1.5625rem;
    margin-right: 1.1875rem;
  }

  ul {
    padding: 0 1rem;
  }

  li {
    margin-bottom: 2.25rem;
  }

  a {
    display: flex;
    align-items: center;
    color: #7F7E8B;
    font-size: 1.12500rem;
    line-height: 1.318125rem;

    &.router-link-exact-active {
      color: #6C5DD3;
      font-weight: 700;
    }
  }
}
</style>

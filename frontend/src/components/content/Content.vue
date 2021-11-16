<script>
import Topbar from '../topbar'
export default {
  name: 'Content',
  components: {
    Topbar
  }
}
</script>

<template lang="pug">
  .content-container
    Topbar
    .inner-container
      router-view
</template>

<style lang="scss">
  .content-container {
    width: calc(100vw - 21.562rem);
    height: 100vh;
  }

  .inner-container {
    width: calc(100vw - 21.562rem);
  }
</style>

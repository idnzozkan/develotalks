<script>
import Topbar from './topbar'

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
    flex: 4.5;
    height: 100%;
  }

  .inner-container {
    width: 68vw;
    margin: auto;
  }
</style>

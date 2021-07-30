<script>
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'About',
  components: {
    HelloWorld
  }
}
</script>

<template lang="pug">
  .about
    h1 About Page
    HelloWorld(msg="Hello world text")
</template>

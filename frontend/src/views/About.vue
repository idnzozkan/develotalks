<script>
import { mapState } from 'vuex'
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'About',
  components: {
    HelloWorld
  },
  computed: {
    ...mapState(['countAbout'])
  }
}
</script>

<template lang="pug">
  .about
    h1 About Page
    HelloWorld(msg="Hello world text" :count="countAbout" type="countAbout")
</template>

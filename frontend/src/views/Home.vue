<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'Home',
  components: {
    HelloWorld
  }
}
</script>

<template lang="pug">
  .home
    img(alt="Vue logo" src="../assets/logo.png")
    HelloWorld(msg="This is home")
</template>

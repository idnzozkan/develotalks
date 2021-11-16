<script>
import Sidebar from '@/components/sidebar'
import Content from '@/components/content'

export default {
  components: {
    Sidebar,
    Content
  }
}
</script>

<template lang="pug">
  #app
    Sidebar
    Content
</template>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap');

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  position: relative;
  width: 100%;
  min-height: 100vh;
  background-color: #1e252b;
  font-family: Roboto;
}

ul {
  list-style-type: none;
}

#app {
  display: flex;
}
</style>

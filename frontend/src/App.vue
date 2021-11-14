<script>
import Sidebar from '@/components/sidebar/Sidebar.vue'

export default {
  components: {
    Sidebar
  }
}
</script>

<template>
  <div id="app">
    <Sidebar/>
    <router-view/>
  </div>
</template>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap');

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  background-color: #1e252b;
  font-family: Roboto;
}

ul {
  list-style-type: none;
}
</style>

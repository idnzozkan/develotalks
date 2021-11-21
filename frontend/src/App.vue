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

html {
  ::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }
  ::-webkit-scrollbar-button {
    width: 0px;
    height: 0px;
  }
  ::-webkit-scrollbar-thumb {
    background: #6758cc6c;
    border: 0px none #ffffff;
    border-radius: 50px;
  }
  ::-webkit-scrollbar-thumb:hover {
    background: #6d5dd375;
  }
  ::-webkit-scrollbar-thumb:active {
    background: #6b5cdbad;
  }
  ::-webkit-scrollbar-track {
    background: #1e252b;
    border: 0px none #ffffff;
    border-radius: 50px;
  }
  ::-webkit-scrollbar-track:hover {
    background: #1e252b;
  }
  ::-webkit-scrollbar-track:active {
    background: #1e252b;
  }
  ::-webkit-scrollbar-corner {
    background: transparent;
  }

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
  padding: 0;
  margin: 0;
}

a {
  text-decoration: none;
  color: #7F7E8B;
  transition: color 0.15s ease;

  &:hover {
    color: #6C5DD3;
  }

  &:focus {
    outline: none;
  }
}

#app {
  display: flex;
}
</style>

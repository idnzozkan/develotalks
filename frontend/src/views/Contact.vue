<script>
export default {
  name: 'Contact',
  props: {
    email: String
  }
}
</script>

<template lang="pug">
  div
    h1 Get in touch
    span {{ email }}
</template>

<style scoped lang="scss">
  h1 {
    color: red;
  }
</style>

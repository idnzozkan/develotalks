<script>
export default {
  name: 'Logo'
}
</script>

<template lang="pug">
router-link(to="/")
  span.title Develo
    span Talks
</template>

<style lang="scss" scoped>
.title {
  color: #fff;
  font-size: 1.375rem;
  font-family: 'M PLUS Rounded 1c', sans-serif;
  font-weight: 800;
  text-transform: uppercase;
  user-select: none;
  -webkit-user-select: none;
  -moz-user-select: none;

  span {
    font-weight: normal;
  }
}
</style>

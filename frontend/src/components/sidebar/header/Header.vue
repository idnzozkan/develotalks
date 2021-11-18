<script>
export default {
  name: 'Header'
}
</script>

<template lang="pug">
  .header
    router-link(to="/")
      span.title Develo
        span Talks
    .hamburger
      .line
      .line
</template>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=M+PLUS+Rounded+1c:wght@400;800&display=swap');

.header {
  display: flex;
  justify-content: space-around;
  align-items: center;
  position: sticky;
  top: 0;
  background: #1e252b;
  padding: 2.4375rem 3.4375rem;
  z-index: 1;
}

.title {
  color: #fff;
  font-size: 1.37500rem;
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

.hamburger {
  display: flex;
  flex-direction: column;
  padding: 0.25rem;

  .line {
    width: 32px;
    height: 2px;
    background: #fff;
    border-radius: 0.5px;

    &:first-child {
      margin-bottom: 6px;
    }
  }

  &:hover {
    cursor: pointer;
  }
}

</style>

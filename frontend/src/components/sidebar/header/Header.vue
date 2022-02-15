<script>
export default {
  name: 'Header'
}
</script>

<template lang="pug">
  .header
    .header-wrapper
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
  position: sticky;
  top: 0;
  background: #1e252b;
  padding: 2.4375rem 0;
}

.header-wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 100%;
  padding: 0 3.4375rem;

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

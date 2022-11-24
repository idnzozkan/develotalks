<script>
import Logo from '../../shared/logo'

export default {
  name: 'Header',
  components: {
    Logo
  }
}
</script>

<template lang="pug">
  .header
    .header-wrapper
      Logo
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

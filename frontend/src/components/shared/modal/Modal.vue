<script>
export default {
  name: 'Modal',
  data () {
    return {
      show: false
    }
  },
  methods: {
    openModal () {
      this.show = true
      document.body.style.overflow = 'hidden'
    },
    closeModal () {
      this.show = false
      document.body.style.overflow = null
    }
  }
}
</script>

<template lang="pug">
  transition(name="fade")
    .modal(v-if="show")
      .modal__backdrop(@click="closeModal")
      .modal__dialog
        .modal__header
          slot(name='header')
        .modal__body
          slot(name='body')
        .modal__footer
          slot(name='footer')
</template>

<style lang="scss" scoped>
  .modal {
    display: flex;
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    overflow-x: hidden;
    overflow-y: auto;
    z-index: 9;

    &__backdrop {
      position: fixed;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: #1d252bf0;
      backdrop-filter: blur(2.5px);
      z-index: 2;
    }

    &__dialog {
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      position: relative;
      height: 100%;
      padding: 2rem;
      color: white;
      width: 700px;
      height: 500px;
      background: #2C353D;
      box-shadow: 0px 0px 30px 1px rgba(0, 0, 0, 0.2);
      border-radius: 1.25rem;
      border: 2px solid #3E454B;
      z-index: 3;
      margin: auto;
    }

    &__header {
      margin-bottom: 1rem;
    }

    &__body {
      margin-bottom: 1rem;
    }

    &__footer {
      display: flex;
      margin-top: 2rem;
    }
  }

  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.25s;
  }
  .fade-enter,
  .fade-leave-to {
    opacity: 0;
  }
</style>

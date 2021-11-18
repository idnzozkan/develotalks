<script>
export default {
  name: 'CreateRoomButton'
}
</script>

<template lang="pug">
  .create-room-btn-wrapper
    a.create-room-btn
      font-awesome-icon(icon="plus-circle")
      | Create Room

</template>

<style lang="scss">
.create-room-btn-wrapper {
  display: flex;
  justify-content: center;
  padding: 0 3.4375rem;
  margin: 4.5rem 0 6.37500rem 0;

  svg {
    font-size: 1.619375rem;
    margin-right: 1.270625rem;
  }

  a {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 3.4375rem;
    border-radius: 0.625rem;
    font-size: 1.12500rem;
    font-weight: 700;
    color: #fff;
    background: #6C5DD3;
    user-select: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    transition: all 0.05s ease-out;

    &:hover {
      cursor: pointer;
      color: #fff;
      background: #6758cc;
    }

    &:active {
      transform: scale(0.98);
    }
  }
}
</style>

<script>
export default {
  name: 'Chatbox'
}
</script>

<template lang="pug">
  .room-chat-wrapper
    .dialogues-area
    .chatting-area
      input(type="text")
      font-awesome-icon(:icon="['far', 'smile']")
</template>

<style lang="scss">
  .room-chat-wrapper {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
    padding: 1rem;

    .dialogues-area {
      padding: 0.5rem 0;
      height: 100%;
    }

    .chatting-area {
      display: flex;
      align-items: center;
      position: relative;
      padding: 0.5rem 0;

      input {
        flex: 1;
        padding: 0.75rem 2.3rem 0.75rem 0.5rem;
        border-radius: 8px;
        height: 100%;
        outline: none;
        border: none;
        background-color: rgba(97, 117, 124, 0.3);
        color: rgba(255, 255, 255, 0.3);
        font-size: 1rem;
      }

      svg {
        position: absolute;
        right: 10px;
        cursor: pointer;
        color: rgba(255, 255, 255, 0.2);
        font-size: 1.25rem;
      }
    }
  }
</style>

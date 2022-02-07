<script>
export default {
  name: 'Room'
}
</script>

<template lang="pug">
  .room-container
    .main-session-area
      .participants-in-room
        .participant
        .participant.speaking
        .participant
      .room-actions
        .room-actions-wrapper
          button.room-action-btn.mic
            | mic
          button.room-action-btn.camera
            | camera
          button.room-action-btn.screen-share
            | screenshare
          button.room-action-btn.leave
            | End Meeting
          button.room-action-btn.fullscreen
            | fullscreen
          button.room-action-btn.people
            | people
          button.room-action-btn.chat
            | chat

    .room-chat
      | chat

</template>

<style lang="scss">
  .room-container {
    display: flex;
  }

  .main-session-area {
    flex: 3;
    display: flex;
    flex-direction: column;
    height: 75vh;
  }

  .participants-in-room {
    flex: 8;
    display: flex;
    justify-content: space-around;
    align-items: center;
    flex-wrap: wrap;
    border-radius: 1.25rem;
    background: rgba(0, 0, 0, 0.2);
  }

  .participant {
    display: flex;
    justify-content: center;
    align-items: center;
    background: rgba(131, 64, 40, 0.7);
    padding: 1rem;
    border-radius: 1.25rem;
    height: 40%;
    width: 40%;

    &::before {
      content: 'D';
      display: flex;
      justify-content: center;
      align-items: center;
      color: white;
      font-size: 3rem;
      width: 5vw;
      height: 5vw;
      background: rgba(255, 127, 80, 0.7);
      padding: 1rem;
      border-radius: 50%;
    }
  }

  .speaking {
    border: 3px solid #6C5DD3;
  }

  .room-actions {
    flex: 1;
    margin-top: 2rem;
  }

  .room-actions-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
  }

  .room-action-btn {
    flex: 1;
    padding: 1.25rem 1rem;
    cursor: pointer;
    margin-right: 1rem;
    border-radius: 10px;
    outline: none;
    border: none;
    background: #2C353D;
    color: #A8A9AF;
    font-size: 0.9rem;

    &:last-child {
      margin-right: 0;
    }

    &.leave {
      flex: 3;
      margin: 0 5rem;
      background: #DE3D3D;
      color: #F9E1E1;
      font-weight: 600;
    }
  }

  .room-chat {
    flex: 1;
    border-radius: 1.25rem;
    background-color: #2C353D;
    margin-left: 2rem;
  }

</style>

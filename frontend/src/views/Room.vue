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
            font-awesome-icon(icon="microphone")
          button.room-action-btn.camera
            font-awesome-icon(icon="video")
          button.room-action-btn.screen-share
            font-awesome-icon(icon="share-square")
          button.room-action-btn.leave
            font-awesome-icon(icon="phone-slash")
          button.room-action-btn.fullscreen
            font-awesome-icon(icon="expand")
          button.room-action-btn.people
            font-awesome-icon(icon="users")
          button.room-action-btn.chat
            font-awesome-icon(icon="comments")
    .room-chat
      .room-chat-wrapper
        .dialogues-area
        .chatting-area
          input(type="text")
          font-awesome-icon(:icon="['far', 'smile']")

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
    font-size: 1.5rem;
    transition: all 100ms;

    &:last-child {
      margin-right: 0;
    }

    &.leave {
      flex: 2;
      margin: 0 5rem;
      background: #DE3D3D;
      color: #F9E1E1;
      font-weight: 600;

      &:hover {
        background: #ff4242;
      }
    }

    &:hover {
      background: #36414b;
    }
  }

  .room-chat {
    flex: 1;
    border-radius: 1.25rem;
    background-color: #2C353D;
    margin-left: 2rem;

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
          padding: 0.5rem 2rem 0.5rem 0.5rem;
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
          color: rgba(255, 255, 255, 0.3);
        }

      }
    }
  }

</style>

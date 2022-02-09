<script>
export default {
  name: 'Participants'
}
</script>

<template lang="pug">
  .participants-in-room
    .participant
    .participant.speaking
    .participant
</template>

<style lang="scss">
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
</style>

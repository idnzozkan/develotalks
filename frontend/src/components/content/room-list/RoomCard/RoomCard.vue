<script>
export default {
  name: 'RoomCard',
  props: {
    title: String,
    owner: Object,
    participants: Array,
    language: String,
    tags: Array,
    maxParticipants: Number,
    isPrivate: Boolean
  },
  data () {
    return {
      btnText: 'Join'
    }
  },
  computed: {
    btnVariant () {
      return this.isPrivate ? 'private-btn' : 'public-btn'
    },
    btnTextByCapacity () {
      return (this.participants.length >= this.maxParticipants) ? 'Full' : 'Join'
    }
  }
}
</script>

<template lang="pug">
  .room-card
    .card-top
      p.room-title {{ title }}
      .room-details
        font-awesome-icon(icon="info-circle" class="info-icon")
    .participants
      .user(v-for="participant in this.participants")
        img(src="https://thispersondoesnotexidst.com/image").avatar
      .user-space(v-if="this.participants.length < this.maxParticipants")
        .blank-user-circle(v-for="circle in this.maxParticipants - this.participants.length")
    .tags
      ul(v-for="tag in tags")
        li {{ tag }}
    .card-bottom
      span {{ maxParticipants }}
      span {{ language }}
      button(:class="btnVariant") {{ btnTextByCapacity }}
</template>

<style lang="scss" scoped>
  .room-card {
    background-color: #2C353D;
    border-radius: 1.25rem;
    height: 28.87500rem;
    color: white;
    padding: 1.75rem;

    .card-top {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 1.25rem;

      p {
        width: 90%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      svg {
        color: rgba(97, 117, 124, 0.8);
      }
    }

    .participants {
      display: flex;
      height: 11.4375rem;
      background: rgba(245, 245, 220, 0.26);
      margin: 2.87500rem 0;
    }
    .user-space{
      display: flex;
    }

    .blank-user-circle {
      width: 100px;
      height: 100px;
      border-radius: 50%;
      border: 2px solid black;
    }
  }

</style>

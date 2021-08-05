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
        span Info
    .participants(v-for="participant in this.participants")
      .user
        img(src="test.jpg").avatar
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
    border-radius: 20px;
    height: 462px;
    min-width: 380px;
    color: white;

    .participants {
      display: flex;
      width: 100%;
      align-items: center;

      .avatar {
        width: 100px;
      }
    }

  }
</style>

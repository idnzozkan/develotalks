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
  computed: {
    btnVariant () {
      return this.isPrivate ? 'private-btn' : 'public-btn'
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
    .participants
      .user
        img(src="#").avatar
    .tags
      ul(v-for="tag in tags")
        li {{ tag }}
    .card-bottom
      span {{ maxParticipants }}
      span {{ language }}
      button(:class="btnVariant")
</template>

<style lang="scss" scoped>
  .room-card {
    background-color: #2C353D;
    border-radius: 20px;
    height: 462px;
    min-width: 380px;
    color: white;
  }
</style>

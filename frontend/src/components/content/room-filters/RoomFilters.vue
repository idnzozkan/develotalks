<script>
export default {
  name: 'RoomFilters',
  data () {
    return {
      tags: ['#frontend', '#backend', '#devops', '#javascript', '#nodejs'],
      languages: ['English', 'Turkish', 'German', 'Japanese']
    }
  }
}
</script>

<template lang="pug">
  .room-filters
    select(name="tag-filter" id="tag-filter")
      option(v-for="tag in this.tags" :value="tag")
        | {{ tag }}

    select(name="language-filter" id="language-filter")
      option(v-for="lang in this.languages" :value="lang")
        | {{ lang }}

    select(name="room-sorter" id="room-sorter")
      option(value="default-sort") Default Sort
      option(value="newest-first") Newest First
      option(value="participants-asc") Participants (ASC)
      option(value="participants-desc") Participants (DESC)
</template>

<style lang="scss" scoped>
.room-filters {
  display: flex;
  justify-content: space-between;

  select {
    width: 25%;
    outline: none;
    border: none;
    border-radius: 1.25rem;
    padding: 1rem;
    background: #2C353D;
    -moz-appearance:none; /* Firefox */
    -webkit-appearance:none; /* Safari and Chrome */
    appearance:none;
  }
}

</style>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'HelloWorld',
  props: {
    msg: String,
    type: String,
    count: String
  },
  methods: {
    ...mapActions(['increment', 'decrement'])
  }
}
</script>

<template lang="pug">
  .hello
    h1 {{ msg }}
    h2 {{ count }}
    button(@click="increment(type)") Increment
    button(@click="decrement(type)") Decrement
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>

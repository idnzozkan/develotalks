<script>
export default {
  name: 'Footer'
}
</script>

<template lang="pug">
  .sidebar-footer
    p.footer-description
    | DeveloTalks is an open-source project. Feel free to contribute on
    a(href="https://www.github.com/idnzozkan/develotalks") GitHub
    | .
    p.copyright-text
    | DeveloTalks © 2021
    a(href="https://www.twitter.com/idnzozkan") Deniz Ozkan

</template>

<style lang="scss">
.sidebar-footer {
  position: absolute;
  bottom: 0;
  padding: 2.4375rem 0;
  border-top: 1px solid #2C353D;
}
</style>

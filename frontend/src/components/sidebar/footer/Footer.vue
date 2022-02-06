<script>
export default {
  name: 'Footer'
}
</script>

<template lang="pug">
  .sidebar-footer
    p.footer-description
    | DeveloTalks is an open-source project. Feel free to contribute on
    a(href="https://www.github.com/idnzozkan/develotalks" target="_blank")  GitHub
    | .
    br
    br
    p.copyright-text
    | DeveloTalks © 2022
    a(href="https://www.twitter.com/idnzozkan" target="_blank")  Deniz Ozkan
    br
    br
    p.footer-links
      router-link(to="#") About
      |  |
      router-link(to="#")  Privacy
      |  |
      router-link(to="#")  Terms Of Use

</template>

<style lang="scss">
.sidebar-footer {
  padding: 1.5rem 3.4375rem;
  border-top: 1px solid #2C353D;
  color: rgba(127, 126, 139, 0.75);
  font-weight: 300;
  line-height: 1.025625rem;
  font-size: 0.875rem;

  a {
    font-weight: 500;
    color: rgba(127, 126, 139, 0.75);
  }

  .copyright-text + a {
    font-weight: 300;
  }
}
</style>

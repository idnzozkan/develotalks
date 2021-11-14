<script>
export default {
  name: 'Sidebar'
}
</script>

<template lang="pug">
  .sidebar-container
    .header
      span.title DeveloTalks
      .hamburger
        .line
        .line

    .profile
      .user-avatar-frame
        img.user-avatar(src="https://i.ibb.co/PwQ7Dxv/profile.jpg")
      span.user-display-name Deniz Ozkan
      span.username @deniz
      .user-stats
        .total-stars
          span 1.4K
          span Stars
        .total-followers
          span 1.2K
          span Followers
        .total-following
          span 100
          span Following

    .create-room-btn-wrapper
      btn.create-room-btn Create Room

    .sidebar-menu
      ul
        li
          router-link(to="/") Home
      ul
        li
          router-link(to="/messages") Messages
      ul
        li
          router-link(to="/settings") Settings

    .friends-list
      span.section-title Friends
        span.total-friends (20)

      .friend-container
        img.friend-avatar(src="https://avatarmaker.net/images/3.png")
        span.friend-display-name Angela Lawson
        .online-status

      .friend-container
        img.friend-avatar(src="https://avatarmaker.net/images/3.png")
        span.friend-display-name Steven Williams
        .online-status

      .friend-container
        img.friend-avatar(src="https://avatarmaker.net/images/3.png")
        span.friend-display-name Victoria I. Rice
        .online-status

      .show-more
        a.show-more-btn(href="#")
        span Show more

      .sidebar-footer
        p.footer-description
        | DeveloTalks is an open-source project. Feel free to contribute on
        a(href="https://www.github.com/idnzozkan/develotalks") GitHub
        | .
        p.copyright-text
        | DeveloTalks © 2021
        a(href="https://www.twitter.com/idnzozkan") Deniz Ozkan

</template>

<style lang="scss" scoped>
.sidebar-container {
  width: 20vw;
  height: 100%;
  background: rgba(179, 158, 177, 0.7);
}

</style>

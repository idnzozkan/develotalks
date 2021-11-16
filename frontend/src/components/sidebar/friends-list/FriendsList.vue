<script>
export default {
  name: 'FriendsList'
}
</script>

<template lang="pug">
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
</template>

<style lang="scss">
.friend-avatar {
  width: 28px;
  height: 28px;
  border-radius: 50%;
}
</style>

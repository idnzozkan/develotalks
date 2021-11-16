<script>
export default {
  name: 'Profile'
}
</script>

<template lang="pug">
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
</template>

<style lang="scss">
.user-avatar {
  width: 100px;
  height: 100px;
  border-radius: 50%;
}
</style>

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

<style lang="scss" scoped>
.profile {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  color: white;
  margin-top: 0.5625rem;
  margin-bottom: 4.5rem;
  padding: 0 3.4375rem;
}

.user-avatar-frame {
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1.5px solid #6C5DD3;
  border-radius: 50%;
  padding: 5.56px;
}

.user-avatar {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  user-select: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -webkit-user-drag: none;

  &:hover {
    cursor: pointer;
  }
}

.user-display-name {
  font-size: 1.12500rem;
  font-weight: 500;
  line-height: 1.318125rem;
  margin-top: 0.4375rem;
  margin-bottom: 0.1875rem;
}

.username {
  font-size: 1rem;
  font-weight: 300;
  line-height: 1.171875rem;
}

.user-stats {
  display: flex;
  justify-content: space-around;
  width: 100%;
  margin-top: 2.12500rem;

  .total-stars, .total-followers, .total-following {
    display: flex;
    flex-direction: column;

    span {
      &:first-child {
        font-size: 1rem;
        font-weight: 700;
        line-height: 1.1875rem;
      }

      &:last-child {
        font-size: 0.75rem;
        font-weight: 400;
        line-height: 0.875rem;
      }
    }
  }
}

</style>

<script>
import { mapState } from 'vuex'

export default {
  name: 'Profile',
  computed: {
    ...mapState('user', ['user'])
  }
}
</script>

<template lang="pug">
  .profile
    .user-avatar-frame
      img.user-avatar(:src="user.avatar" referrerpolicy="no-referrer")
    span.user-display-name {{ user.name }}
    span.username @{{ user.username }}
    .user-stats
      .total-stars
        span {{user.starCount}}
        span Stars
      .total-followers
        span {{user.followers.length}}
        span Followers
      .total-following
        span {{user.following.length}}
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
  border: 1.5px solid #6c5dd3;
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
  font-size: 1.125rem;
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
  margin-top: 2.125rem;

  .total-stars,
  .total-followers,
  .total-following {
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

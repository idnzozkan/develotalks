<script>
import { mapActions } from 'vuex'

import socket from '../../../lib/socket'

export default {
  name: 'FriendsList',
  data () {
    return {
      friends: []
    }
  },
  methods: {
    ...mapActions('user', ['fetchFriends']),
    goToProfile (username) {
      this.$router.push(`/@${username}`)
    }
  },
  async mounted () {
    const data = await this.fetchFriends()
    this.friends = data

    socket.on('connect', () => {
      socket.on('friends:updated', async () => {
        const data = await this.fetchFriends()
        this.friends = data
      })
    })
  }
}
</script>

<template lang="pug">
  .friends-list(v-if="friends.length")
    span.section-title Friends
      span.total-friends  ({{ friends.length }})
    .friend-container(v-for="friend in friends")
      img.friend-avatar(:src="friend.avatar + '=s96-c'" referrerpolicy="no-referrer" @click="goToProfile(friend.username)")
      span.friend-display-name {{ friend.name }}
      .online-sign(v-if="friend.activeRoom")
      .offline-sign(v-else)
</template>

<style lang="scss">
.friends-list {
  margin-bottom: 6.37500rem;
  padding: 0 3.4375rem;
}

.section-title {
  font-size: 0.875rem;
  font-weight: 700;
  line-height: 1.025625rem;
  color: #7F7E8B;
}

.friend-container {
  display: flex;
  align-items: center;
  position: relative;
  margin: 2.25rem 0;

  img {
    width: 28px;
    height: 28px;
    border-radius: 50%;
    cursor: pointer;
  }

  span {
    font-size: 1.12500rem;
    color: #7F7E8B;
    line-height: 1.318125rem;
    width: 10rem;
    margin: 0 3.1875rem 0 1rem;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }

  .online-sign {
    position: absolute;
    right: 0;
    width: 0.5rem;
    height: 0.5rem;
    background: #7FBA7A;
    border-radius: 50%;
  }

  .offline-sign {
    position: absolute;
    right: 0;
    width: 0.5rem;
    height: 0.5rem;
    background: #31373E;
    border-radius: 50%;
  }
}

</style>

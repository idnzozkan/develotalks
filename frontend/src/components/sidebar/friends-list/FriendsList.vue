<script>
export default {
  name: 'FriendsList'
}
</script>

<template lang="pug">
  .friends-list
    span.section-title Friends
      span.total-friends  (20)
    .friend-container
      img.friend-avatar(src="https://avatarmaker.net/images/3.png")
      span.friend-display-name Angela Lawson
      .online-sign

    .friend-container
      img.friend-avatar(src="https://avatarmaker.net/images/3.png")
      span.friend-display-name Steven Williams
      .online-sign

    .friend-container
      img.friend-avatar(src="https://avatarmaker.net/images/3.png")
      span.friend-display-name Victoria I. Rice
      .offline-sign

    .show-more
      .show-more-icon
        font-awesome-icon(icon="eye")
      span Show more
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

.show-more {
  display: flex;
  align-items: center;
  width: fit-content;
  user-select: none;
  -moz-user-select: none;
  -webkit-user-select: none;

  &:hover *, &:hover {
    cursor: pointer;
    color: #7F7E8B;
  }

  .show-more-icon {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 1.75rem;
    height: 1.75rem;
    border-radius: 50%;
    background: rgba(127, 126, 139, 0.2);

    svg {
      color: #7f7e8baf;
      font-size: 0.875rem;
    }
  }

  span {
    color: #7f7e8baf;
    font-size: 1.12500rem;
    line-height: 1.318125rem;
    margin-left: 1rem;
  }
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

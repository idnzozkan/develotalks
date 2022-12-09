<!-- TODO: Refactor this component by separating it into smaller components -->

<script>
import { mapActions, mapState } from 'vuex'

export default {
  name: 'Profile',
  data () {
    return {
      isUserLoading: true,
      isFollowActionLoading: false,
      isUnfollowActionLoading: false,
      user: null
    }
  },
  computed: {
    ...mapState('user', ['me'])
  },
  methods: {
    ...mapActions('user', ['fetchUser', 'followUser', 'unfollowUser']),
    async handleFollow () {
      if (!this.me) {
        // TODO: Show login modal instead of the following alert
        return alert('Please login')
      }

      this.isFollowActionLoading = true
      const user = await this.followUser(this.user._id)
      this.user = user
      this.isFollowActionLoading = false
    },
    async handleUnfollow () {
      this.isUnfollowActionLoading = true
      const user = await this.unfollowUser(this.user._id)
      this.user = user
      this.isUnfollowActionLoading = false
    }
  },
  async mounted () {
    const username = this.$router.history.current.params.username

    this.isUserLoading = true
    this.user = await this.fetchUser(username)
    this.isUserLoading = false
  }
}
</script>

<template lang="pug">
  div(v-if="isUserLoading") Loading...
  div(v-else)
    .profile-container
      .account-details-first-panel
        .profile-header
          .cover-photo
          .profile-header-bottom
            img.profile-photo(:src="user.avatar" referrerpolicy="no-referrer")
            .profile-information
              .profile-information-top
                .profile-owner
                  span.name {{ user.name }}
                  .username-container
                    span.username @{{ user.username }}
                    span.follows-you(v-if="user.following.includes(me?._id)") Follows you
                .profile-action-buttons(v-if="user._id !== me?._id")
                  button.unfollow-btn(@click="handleUnfollow" v-if="me?.following.includes(user._id)" :disabled="isUnfollowActionLoading")
                    span Following
                  button.follow-btn(@click="handleFollow" v-else :disabled="isFollowActionLoading")
                    font-awesome-icon(icon="user-plus")
                    | &nbsp; Follow

                  // TODO: Use the "Send DM" button below, after implementing the messaging feature

                  //- button.dm-btn(v-if="me.friends.includes(user._id)")
                  //-   font-awesome-icon(icon="paper-plane")
                  //-   | &nbsp; Send DM
              .profile-information-bottom
                .stats
                  span
                    span {{ user.followers.length }}
                    | &nbsp; Followers
                  span
                    span {{ user.following.length }}
                    | &nbsp; Following
                  span
                    span {{ user.starCount }}
                    | &nbsp; Stars
        .bio
          h3 About
          span.no-data(v-if="!user.userBio") No data found
          p(v-else) {{ user.userBio }}
      .account-details-second-panel
        .links
          h3 Links
          span.no-data(v-if="!user.socialLinks.length") No data found
          ul(v-else)
            li(v-for="link in user.socialLinks")
              a(:href="link.url" target="_blank" :title="link.title") {{ link.title }}
        .interests
          h3 Interests
          span.no-data(v-if="!user.interests.length") No data found
          ul(v-else)
            li(v-for="field in user.interests") {{ field }}
        .languages-spoken
          h3 Languages spoken
          span.no-data(v-if="!user.spokenLangs.length") No data found
          ul(v-else)
            li(v-for="language in user.spokenLangs") {{ language }}
</template>

<style lang="scss" scoped>
.profile-container {
  display: flex;
  padding: 3.5rem 0;
}

.account-details {
  &-first-panel {
    display: flex;
    flex-direction: column;
    flex: 3;
  }

  &-second-panel {
    flex: 2;
    margin-left: 2rem;

    &>div {
      background: #2c353d;
      color: #fff;
      border-radius: 0.625rem;
      padding: 1.5rem;
      margin-bottom: 2rem;

        h3 {
          margin-bottom: 0.75rem;
        }

        ul {
          display: flex;
          flex-wrap: wrap;
        }

        li {
          border: 1px solid #69798f;
          color: #f1f1f1;
          cursor: default;
          margin-bottom: 0.5rem;
          margin-right: 0.75rem;
          padding: 0.25rem 0.5rem;
          width: fit-content;
          border-radius: 0.3125rem;
          transition: all 100ms ease;

          &:hover {
            background: #69798f30;
          }
        }
    }
  }
}

span.no-data {
  color: #5b6776;
}

.profile-header {
  border-radius: 0.625rem;
  overflow: hidden;

  .cover-photo {
    background: rgb(131, 154, 247);
    background: linear-gradient(270deg, rgba(131, 154, 247, 1) 0%, rgba(108, 93, 211, 1) 100%);
    width: 100%;
    height: 13rem;
  }

  .profile-header-bottom {
    display: flex;
    align-items: center;
    padding: 0.5rem 0 1rem 0;
    background: #2c353d;

    .profile-photo {
      width: 10rem;
      height: 10rem;
      border-radius: 50%;
      margin-top: -3rem;
      margin-left: 1rem;
      margin-right: 0.5rem;
      border: 0.5rem solid #2c353d;
    }

    .profile-information {
      width: 100%;

      &-top {
        display: flex;
        align-items: center;

        .profile-owner {
          display: flex;
          flex-direction: column;
          align-items: start;

          span {
            &.name {
              color: white;
              font-size: 2rem;
              font-weight: 600;
            }

            &.username {
              color: #69798f;
              font-size: 1.1rem;
              margin-top: 0.25rem;
            }

            &.follows-you {
             font-size: 0.75rem;
             color: #69798f;
             background: #373f4a;
             padding: 0.125rem 0.5rem;
             border-radius: 0.3125rem;
             margin-left: 0.5rem;
            }
          }

          .username-container {
            display: flex;
            align-items: end;
          }

        }

        .profile-action-buttons {
          margin-left: auto;

          button {
            padding: 0.75rem 1.25rem;
            background: white;
            outline: none;
            border: none;
            border-radius: 0.3125rem;
            cursor: pointer;
            font-size: 1rem;
            font-weight: 600;
            color: white;
            background: #6c5dd3;
            transition: all 0.05s ease-out;

            &:hover {
              background: #6758cc;
            }

            &:first-child {
              margin-right: 1rem;
            }

            &:last-child {
              margin-right: 1.5rem;
            }

            &.follow-btn {
              &:disabled {
                pointer-events: none;
              }
            }

            &.unfollow-btn {
              background: transparent;
              border: 1px solid #6c5dd3;
              color: #6c5dd3;
              min-width: 7.29125rem;

              &:hover {
                border: 1px solid #de3d3d;
                span {
                  display: none;
                }
              }

              &:hover::before {
                color: #de3d3d;
                content: 'Unfollow'
              }
            }
          }
        }
      }

      &-bottom {
        margin-top: 1.5rem;

        .stats {
          &>span {
            margin-right: 1rem;
          }

          span {
            color: #69798f;

            span {
              color: white;
              font-weight: 600;
            }
          }
        }
      }
    }
  }
}

.bio {
  color: #fff;
  background: #2c353d;
  border-radius: 0.625rem;
  margin-top: 2rem;
  padding: 1.5rem;

  h3 {
    font-size: 1.25rem;
    margin-bottom: 0.75rem;
  }

  p {
    line-height: calc(1ex / 0.32);
    text-align: justify;
    hyphens: auto;
  }
}

.links {
  li {
    background: #515d6d;
    cursor: pointer !important;

    a {
      color: #fff;
    }

    &:hover {
      background: #5f6e82 !important;
    }
  }
}
</style>

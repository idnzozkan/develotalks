<script>
import { mapActions, mapState } from 'vuex'
import { languages, interests } from '../support/constants'

export default {
  name: 'Settings',
  data () {
    return {
      name: '',
      username: '',
      userBio: '',
      socialLinks: [],
      interests: [],
      spokenLangs: []
    }
  },
  computed: {
    ...mapState('user', ['me']),
    languagesData: function () {
      return Object.values(languages)
    },
    interestsData: function () {
      return Object.values(interests)
    }
  },
  methods: {
    ...mapActions('user', ['updateProfile']),
    addLink () {
      this.socialLinks.push({ title: '', url: '' })
    },
    removeLink (indexToRemove) {
      this.socialLinks = this.socialLinks.filter((_, index) => index !== indexToRemove)
    },
    async handleSave () {
      await this.updateProfile({
        name: this.name
      })
    }
  },
  created () {
    this.name = this.me.name
    this.username = this.me.username
    this.userBio = this.me.userBio
    this.socialLinks = this.me.socialLinks
    this.interests = this.me.interests
    this.spokenLangs = this.me.spokenLangs
  }
}
</script>

<template lang="pug">
  .settings-container
    .details-wrapper
      .account-details-first-panel
        section
          h3 Profile Picture
          .avatar-update-container
            img.user-avatar(:src="me.avatar" referrerpolicy="no-referrer")
            label(for="avatar") Change profile picture
            input#avatar.hidden(type="file" name="avatar" accept="image/*")
        section
          h3 Display Name
          input(v-model="name")
        section
          h3 Username
          input(:value="username")
        section
          h3 About
          textarea(:value="userBio")
      .account-details-second-panel
        section
          h3 Links
          .links-container
            .inputs-line(v-for="(item, index) in socialLinks")
              input(type="text" placeholder="Title" :value="item.title")
              input(type="text" placeholder="URL" :value="item.url")
              button(v-if="socialLinks.length > 1" @click="removeLink(index)") ✕
            button.add(@click="addLink") Add
        section
          h3 Interests
          v-select(:options="interestsData" multiple :value="interests" v-model="interests" bg-color="red")
        section
          h3 Languages Spoken
          v-select(:options="languagesData" multiple :value="spokenLangs" v-model="spokenLangs" bg-color="red")
    button.save(@click="handleSave") Save
</template>

<style lang="scss" scoped>
.settings-container {
  padding: 3.5rem 0;
}

.details-wrapper {
  display: flex;
}

button.save {
  padding: 0.75rem 2.5rem;
  font-size: 1rem;
  border-radius: 0.625rem;
  border: 1px solid #6c5dd3;
  outline: none;
  cursor: pointer;
  background: transparent;
  color: #6c5dd3;
  font-weight: 500;

  &:hover {
    color: #fff;
    background: #6c5dd3;
  }
}

.account-details {
  &-first-panel {
    display: flex;
    flex-direction: column;
    flex: 3;

    .avatar-update-container {
      display: flex;
      align-items: center;
      background: rgba(0, 0, 0, 0.3);
      border-radius: 0.625rem;
      padding: 1rem;

      label {
        margin-left: 2rem;
        padding: 0.5rem 0.75rem;
        font-size: 0.9rem;
        border-radius: 0.3125rem;
        border: 1px solid #2c353d;
        background: #485763;
        outline: none;
        cursor: pointer;
        color: #fff;
        font-weight: 500;

        &:hover {
          background: #4c5b66;
        }
      }

      .hidden {
        display: none;
      }

      .user-avatar {
        width: 8rem;
        height: 8rem;
        border-radius: 50%;
      }
    }

    input {
      height: 2rem;
      outline: none;
      border: none;
      padding: 0.5rem 0.75rem;
      background: rgba(0, 0, 0, 0.3);
      border-radius: 0.3125rem;
      color: rgba(255, 255, 255, 0.85);
      font-size: 0.9rem;
    }

    textarea {
      padding: 0.5rem 0.75rem;
      outline: none;
      border: none;
      background: rgba(0, 0, 0, 0.3);
      border-radius: 0.3125rem;
      color: rgba(255, 255, 255, 0.85);
      font-size: 0.9rem;
      width: 100%;
      height: 6rem;
      font-family: inherit;
      line-height: calc(1ex / 0.32);
      text-align: justify;
      hyphens: auto;
    }
  }

  &-second-panel {
    flex: 2;
    margin-left: 2rem;

    .links-container {
      display: flex;
      flex-direction: column;

      .inputs-line {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 2rem;
        margin-bottom: 1rem;

        input {
          background: rgba(0, 0, 0, 0.3);
          color: rgba(255, 255, 255, 0.85);
          border-radius: 0.3125rem;
          margin-right: 0.75rem;
          outline: none;
          border: none;
          padding: 0.5rem 0.75rem;
          height: 100%;
          width: 43%;
          font-size: 0.9rem;
        }

        button {
          height: 100%;
          width: 2rem;
          color: #fff;
          border: none;
          border-radius: 0.3125rem;
          cursor: pointer;
          background: #de3d3d;

          &:hover {
            background: #ff4242;
          }
        }
      }

      button.add {
        outline: none;
        cursor: pointer;
        width: fit-content;
        padding: 0.5rem 0.75rem;
        border-radius: 0.3125rem;
        border: 1px solid #2c353d;
        background: #485763;
        color: #fff;

        &:hover {
          background: #4c5b66;
        }
      }
    }
  }
}

.vs__dropdown {
  &-toggle {
    padding: 0;
    border: 0;
    border-radius: 0.625rem;
    background: rgba(0, 0, 0, 0.3) !important;
    color: rgba(255, 255, 255, 0.85) !important;

    input {
      margin: 0;
    }
  }

  &-menu {
    border-radius: 0.25rem 0.25rem 0.625rem 0.625rem;
  }
}

.vs__selected {
  margin: 4px 2px 4px 2px;
}

section {
  background: #2c353d;
  border-radius: 0.625rem;
  padding: 1.5rem;
  margin-bottom: 2rem;

  h3 {
    margin-bottom: 0.75rem;
    color: #fff;
  }
}
</style>

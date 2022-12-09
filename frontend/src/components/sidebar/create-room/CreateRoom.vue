<script>
import { mapActions, mapState } from 'vuex'

import Modal from '../../shared/modal'
import { languages, tags } from '../../../support/constants'

export default {
  name: 'CreateRoom',
  components: {
    Modal
  },
  data () {
    return {
      isLoading: false,
      title: '',
      tags: [],
      language: '',
      maxParticipants: 5
    }
  },
  computed: {
    ...mapState('user', ['me']),
    ...mapState('room', ['joinedRoom']),
    languagesData: function () {
      return Object.values(languages)
    },
    tagsData: function () {
      return Object.values(tags)
    }
  },
  methods: {
    ...mapActions('room', ['createRoom']),
    async handleCreate () {
      this.isLoading = true

      await this.createRoom({
        title: this.title,
        roomTags: this.tags,
        roomLanguage: this.language,
        maxParticipants: this.maxParticipants
      })

      this.$router.push(`/r/${this.joinedRoom._id}`)

      this.$refs.createRoomModal.closeModal()

      this.isLoading = false
      this.title = ''
      this.tags = []
      this.language = ''
      this.maxParticipants = 5
    }
  }
}
</script>

<template lang="pug">
  .create-room-btn-wrapper
    a.create-room-btn(@click="$refs.createRoomModal.openModal()")
      font-awesome-icon(icon="plus-circle")
      | Create Room
    Modal(ref="createRoomModal")
      template(v-slot:header)
        h2 New Room
      template(v-slot:body)
        form.create-room-form
          .row
            label Title
            input(type="text" :placeholder="`${me.name}'s room`" v-model="title")
          .row
            label Tags
            v-select(:options="tagsData" multiple v-model="tags")
          .row
            .cols
              .col
                label Language
                v-select(:options="languagesData" v-model="language")
              .col
                label Max participants
                vue-number-input(:controls="true" :min="1" :max="10" center v-model="maxParticipants")
      template(v-slot:footer)
        button.modal-create-btn(@click="handleCreate" :disabled="isLoading") Create
</template>

<style lang="scss">
.create-room-btn-wrapper {
  display: flex;
  justify-content: center;
  padding: 0 3.4375rem;
  margin: 4.5rem 0 6.375rem 0;

  svg {
    font-size: 1.619375rem;
    margin-right: 1.270625rem;
  }

  a {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 3.4375rem;
    border-radius: 0.625rem;
    font-size: 1.125rem;
    font-weight: 700;
    color: #fff;
    background: #6c5dd3;
    user-select: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    transition: all 0.05s ease-out;

    &:hover {
      cursor: pointer;
      color: #fff;
      background: #6758cc;
    }

    &:active {
      transform: scale(0.98);
    }
  }
}

form.create-room-form {
  label {
    color: white;
    margin-bottom: 0.5rem;
  }

  input {
    padding: 0.75rem;
    outline: none;
    border: none;
    border-radius: 0.625rem;
    font-size: 0.875rem;
    height: 2.5rem;
  }

  .vs__dropdown {
    &-toggle {
      padding: 0;
      border: 0;
      border-radius: 0.625rem;

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

  .row {
    display: flex;
    flex-direction: column;
    margin-bottom: 1.5rem;
    width: 30vw;
  }

  .cols {
    display: flex;
    flex-direction: row;

    .col {
      display: flex;
      flex-direction: column;
      flex: 1;

      &:first-child {
        margin-right: 1.5rem;
      }
    }
  }
}

.modal-create-btn {
  width: 100%;
  padding: 0.75rem 2rem;
  outline: none;
  border: none;
  cursor: pointer;
  border-radius: 0.625rem;
  font-size: 1rem;
  color: white;
  background: #6c5dd3;
  transition: all 0.05s ease-out;
  font-weight: 700;

  &:hover {
    cursor: pointer;
    background: #6758cc;
  }

  &:disabled {
    opacity: 0.5;
    cursor: progress;
  }
}
</style>

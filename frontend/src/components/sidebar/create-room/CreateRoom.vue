<script>
import Modal from '../../shared/modal'

export default {
  name: 'CreateRoomButton',
  components: {
    Modal
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
        .create-room-modal-form
          .modal-form-row
            .modal-form-col-l
              .room-title.field
                label(for="title") Title
                input(type="text" name="title")
              .room-description.field
                label(for="description") Description
                textarea(name="description" rows="5")
            .modal-form-col-r
              .room-language.field
                label(for="language") Room Language
                select(name="language")
              .max-participants.field
                label(for="max-participants") Max Participants
                select(name="max-participants")
              .room-tags.field
                label(for="tags") Tags
                select(name="tags")
          .modal-form-row
            .room-title.field
              label(for="title") Title
              input(type="range" name="title")

      template(v-slot:footer)
        button.modal-create-btn Create
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
}

.create-room-modal-form {
  .modal-form-col {
    &-l {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      width: 70%;
    }

    &-r {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      width: 30%;
      margin-left: 1rem;
    }
  }

  .modal-form-row {
    display: flex;
  }

  .room-title {
    width: 100%;
  }

  .room-language {
    width: 100%;
  }

  .room-description {
    width: 100%;
  }

  .room-type {
    display: flex;
    flex-direction: row !important;
    align-items: center;
    width: 50%;

    input {
      width: 30px;
      height: 30px;
    }

    &-texts {
      margin-left: 1rem;

      p {
        font-size: 0.85rem;
      }
    }
  }

  .field {
    display: flex;
    flex-direction: column;
    margin-top: 1rem;

    input,
    select,
    textarea {
      padding: 0.25rem;
      border-radius: 0.25rem;
      font-size: 1.25rem;
    }
  }
}
</style>

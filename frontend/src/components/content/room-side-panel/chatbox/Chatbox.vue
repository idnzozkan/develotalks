<script>
import { mapState } from 'vuex'
import { selectHMSMessages, selectLocalPeerID } from '@100mslive/hms-video-store'

import { hmsActions, hmsStore } from '../../../../lib/hms'

export default {
  name: 'Chatbox',
  data () {
    return {
      messages: [],
      messageToSend: ''
    }
  },
  computed: {
    ...mapState('user', ['me'])
  },
  methods: {
    async sendMessage (e) {
      e.preventDefault()

      if (!this.messageToSend) {
        return
      }

      await hmsActions.sendBroadcastMessage(this.messageToSend)

      this.messageToSend = ''
    },
    isMyMessage (peerId) {
      const localPeerId = hmsStore.getState(selectLocalPeerID)
      return localPeerId === peerId
    },
    updateMessages (messages) {
      this.messages = messages
    }
  },
  created () {
    hmsStore.subscribe(this.updateMessages, selectHMSMessages)
  }
}
</script>

<template lang="pug">
  .room-chat-wrapper
    .messages-container
      .messages
        .message(v-for="message in messages")
          span.my-name(v-if="isMyMessage(message.sender)") {{ message.senderName }}:&nbsp;
          span.name(v-else) {{ message.senderName }}:&nbsp;
          span.text {{ message.message }}
    form.input-container(type="submit" @submit="sendMessage")
      input(type="text" spellcheck="false" v-model="messageToSend")
      font-awesome-icon(:icon="['far', 'smile']")
</template>

<style lang="scss">
.room-chat-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  padding: 1rem;

  .messages-container {
    display: flex;
    padding: 0.5rem 0;
    height: 100%;

    .messages {
      align-self: flex-end;

      .message {
        margin-bottom: 0.5rem;

        span {
          color: rgba(255, 255, 255, 0.85);
          line-height: 1.5rem;

          &.my-name {
            font-weight: 600;
            color: #fdd84d;
          }

          &.name {
            font-weight: 600;
          }
        }
      }
    }
  }

  .input-container {
    display: flex;
    align-items: center;
    position: relative;
    padding-bottom: 0.5rem;

    input {
      flex: 1;
      padding: 0.75rem 2.3rem 0.75rem 0.5rem;
      border-radius: 8px;
      height: 100%;
      outline: none;
      border: none;
      background-color: rgba(97, 117, 124, 0.3);
      color: rgba(255, 255, 255, 0.75);
      font-size: 1rem;
    }

    svg {
      position: absolute;
      right: 10px;
      cursor: pointer;
      color: rgba(255, 255, 255, 0.2);
      font-size: 1.25rem;
    }
  }
}
</style>

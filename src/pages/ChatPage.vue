<template lang="pug">
q-page#xetPage
  .row.justify-center(style="min-height: inherit;")
    .row.col-12.justify-center.ma-lg.items-stretch.full-height.q-pa-md(style="min-height: inherit;")
      .col-12(v-if="isMessagesLoading")
        q-spinner(color="primary" size="3em")
      .col-12(v-else-if="messages.length")
          q-chat-message(v-for="messagesToRender in setOfMessages" :name="messagesToRender.sender" :text="messagesToRender.messages" :sent="messagesToRender.sender === username")
      .col-12(v-else)
        q-banner.text-center(dense border)
          p.text-subtitle1 There is no messages.
    .row.fixed.justify-center.q-mb-lg(style="bottom: 0; width: 65%;" v-if="isInAChat")
      .col-12
        q-input(v-model="text"
          @keydown.enter="sendMessage(this.$route.params.id)"
          label="Type a message"
          outlined
          rounded
          bg-color="white"
        )
          q-btn(round dense flat icon="send" @click="sendMessage(this.$route.params.id)" :disable="!text")
</template>

<script>
import { defineComponent, ref } from 'vue'
import { date } from 'quasar'

export default defineComponent({
  name: 'Chat',

  data: function () {
    return {
      text: '',
      messages: []
    }
  },

  async mounted () {
    if (this.$route.params.id) {
      await this.loadXetMessages(this.$route.params.id)
      this.joinXet(this.$route.params.id)
    }
    window.scrollTo(0, document.getElementById('xetPage').scrollHeight)
  },
  computed: {
    setOfMessages: function () {
      const arrayOfMessages = []
      let group = []
      let senderChanged
      let sender
      this.messages.forEach(message => {
        if (!sender) {
          sender = message.sender
        }
        if (sender === message.sender) {
          group.push(message.text)
        } else {
          senderChanged = true
          if (senderChanged) {
            arrayOfMessages.push({ sender: sender, messages: group })
            group = []
            senderChanged = false
          }
          sender = message.sender
          group.push(message.text)
        }
      })
      arrayOfMessages.push({ sender: sender, messages: group })
      window.scrollTo(0, document.getElementById('xetPage').scrollHeight)
      return arrayOfMessages
    },

    isInAChat: function () {
      return /\/xet\/\d/.test(this.$route.fullPath)
    }
  },

  methods: {
    loadXetMessages: async function (id) {
      this.isMessagesLoading = true
      const response = await this.$axios.get(`/xet/${id}/message/all`).catch(err => console.error(err))
      this.isMessagesLoading = false
      this.messages = response.data
    },

    sendMessage: async function (id) {
      const message = {
        sender: this.username,
        text: this.text,
        sendTime: date.formatDate(Date.now(), 'YYYY-MM-DDTHH:mm:ss'),
        xetId: id
      }
      if (this.text) {
        this.$axios
          .post(`/xet/${id}/message`, message)
          .then(() => {
            this.socket.emit('message', message)
            this.text = ''
          })
      }
    },

    joinXet: async function (xetId) {
      this.socketReady()
        .then(() => {
          if (xetId) {
            this.socket.emit('join', xetId) // this seems wrong
            this.socket.on('message', message => {
              this.messages.push(message)
            })
          }
        })
    },

    socketReady: function () {
      return new Promise((resolve) => {
        if (this.socket.connected) {
          resolve(true)
        } else {
          setTimeout(this.socketReady, 1000)
        }
      })
    }
  },

  setup () {
    return {
      isMessagesLoading: ref(false)
    }
  },

  props: {
    username: {
      type: String,
      default: function () { return '' }
    },
    socket: {
      type: Object,
      default: function () { return {} }
    }
  }
})
</script>

<style>

body {
  overflow-y: scroll;
}

</style>

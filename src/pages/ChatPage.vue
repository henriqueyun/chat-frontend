<template lang="pug">
q-page
  .row.justify-center(style="min-height: inherit;")
    .row.col-12.justify-center.ma-lg.items-stretch.full-height.q-pa-md(style="min-height: inherit;")
      .col-12
      .col-12.self-end
        q-input.standout.bottom-slots(v-model="text" label="Digite aqui sua mensagem")
          q-btn(round dense flat icon="send" @click="sendMessage()")
</template>

<script>
import { defineComponent } from 'vue'
import { io } from 'socket.io-client'

export default defineComponent({
  name: 'Chat',

  preFetch ({ currentRoute, previousRoute }) {
    console.log(currentRoute.params)
  },

  data: function () {
    return {
      text: '',
      socket: {}
    }
  },

  created () {
    this.connectXet()
  },

  // q-chat-message(name="username" :text="['HAHA', 'MT FEIO FILHO']" sent)
  // q-chat-message(name="other person" :text="['Tranquilo e contigo?']")
  // q-chat-message(name=username sent :text="messages")

  methods: {
    loadXetMessages: function (id) {
      this.$axios.get(`/xet/${id}/messages`)
        .then(res => {
          this.xets = res.data
        })
    },

    sendMessage: function () {
      this.socket.emit('message', this.text)
    },

    connectXet: function () {
      this.socket = io(process.env.SOCKET_URL)
        .on('connect', () => {
          console.log(`Conectado via socket.io em ${process.env.SOCKET_URL}`)
        })
    }
  },

  props: {
    messages: {
      type: Array,
      default: function () { return [] }
    },
    username: {
      type: String,
      default: function () { return '' }
    }
  }
})
</script>

<template lang="pug">
q-page
  .row.justify-center(style="min-height: inherit;")
    .row.col-12.justify-center.ma-lg.items-stretch.full-height.q-pa-md(style="min-height: inherit;")
      .col-12
        q-chat-message(v-if="xetMessages.length" name="test user" :text="xetMessages" sent)
        q-banner.text-center(v-else dense border)
          p.text-subtitle1 Não há mensagens
      .col-12.self-end
        q-input.standout.bottom-slots(v-model="text" label="Digite aqui sua mensagem")
          q-btn(round dense flat icon="send" @click="sendMessage(this.$route.params.id)")
</template>

<script>
import { defineComponent } from 'vue'
import { date } from 'quasar'

export default defineComponent({
  name: 'Chat',

  data: function () {
    return {
      text: '',
      xets: []
    }
  },

  created () {
    this.loadXetMessages(this.$route.params.id)
  },

  computed: {
    xetMessages: function () {
      return this.xets.map(x => x.message)
    }
  },

  methods: {
    loadXetMessages: function (id) {
      this.$axios.get(`/xet/${id}/message/all`)
        .then(res => {
          this.xets = res.data
        })
    },

    sendMessage: function (id) {
      const message = {
        sender: this.username,
        message: this.text,
        sendTime: date.formatDate(Date.now(), 'YYYY-MM-DDTHH:mm:ss')
      }
      this.socket.emit('message', message)
      this.$axios.post(`/xet/${id}/message`, message)
        .then(res => {
          console.log('message sended at', message.sendTime)
        })
      this.text = ''
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
    },
    socket: {
      type: Object,
      default: function () { return {} }
    }
  }
})
</script>

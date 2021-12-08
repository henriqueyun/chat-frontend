<template lang="pug">
q-page#xd
  .row.justify-center(style="min-height: inherit;")
    .row.col-12.justify-center.ma-lg.items-stretch.full-height.q-pa-md(style="min-height: inherit;")
      .col-12
        q-chat-message(v-if="xetMessages.length" name="xet" :text="xetMessages")
        q-banner.text-center(v-else dense border)
          p.text-subtitle1 Não há mensagens
    .row.fixed.justify-center.q-mb-lg(style="bottom: 0; width: 65%;")
      .col-12
        q-input(v-model="text"
          @keydown.enter="sendMessage(this.$route.params.id)"
          label="Digite aqui sua mensagem"
          outlined
          rounded
          bg-color="white"
        )
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

  async created () {
    await this.loadXetMessages(this.$route.params.id)
    this.joinXet()
    window.scrollTo(0, document.getElementById('xd').scrollHeight)
  },

  computed: {
    xetMessages: function () {
      return this.xets.map(x => x.message)
    }
  },

  methods: {
    loadXetMessages: async function (id) {
      const response = await this.$axios.get(`/xet/${id}/message/all`)
      this.xets = response.data
    },

    sendMessage: function (id) {
      const message = {
        sender: this.username,
        message: this.text,
        sendTime: date.formatDate(Date.now(), 'YYYY-MM-DDTHH:mm:ss'),
        xetId: id
      }
      this.socket.emit('message', message)
      this.$axios.post(`/xet/${id}/message`, message)
        .then(res => {
          console.log('message sended at', message.sendTime)
        })
      this.text = ''
    },

    joinXet: function () {
      const xetId = this.$route.params.id
      if (this.socket.connected && xetId) {
        console.log('joined', xetId)
        this.socket.emit('join', xetId) // isso não parece correto/seguro
        this.socket.on('message', message => {
          console.log(message)
          this.xets.push(message)
        })
      }
    },

    setStarvedXetInterval: function (id) {
      return setInterval(() => {
        if (id !== this.$route.params.id) {
          this.socket.emit('leave', id)
        }
      }, 15000)
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

<style>

body {
  overflow-y: scroll;
}

</style>

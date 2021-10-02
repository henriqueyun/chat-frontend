<template lang="pug">
q-page
    .row.justify-center(style="min-height: inherit;")
        .row.col-12.justify-center.ma-lg.items-stretch.full-height.q-pa-md(style="min-height: inherit;")
            .col-12
                q-chat-message(name="me" :text="['HAHA', 'MT FEIO FILHO']" sent)
                q-chat-message(name="other person" :text="['Tranquilo e contigo?']")
                q-chat-message(name="me" sent :text="['Mussum Ipsum, cacilds vidis litro abertis. Nec orci ornare consequat. Praesent lacinia ultrices consectetur. Sed non ipsum felis. Leite de capivaris, leite de mula manquis sem cabeça. In elementis mé pra quem é amistosis quis leo. Vehicula non. Ut sed ex eros. Vivamus sit amet nibh non tellus tristique interdum. Suco de cevadiss deixa as pessoas mais interessantis. Paisis, filhis, espiritis santis. Cevadis im ampola pa arma uma pindureta. Manduma pindureta quium dia nois paga. Praesent malesuada urna nisi, quis volutpat erat hendrerit non. Nam vulputate dapibus. Diuretics paradis num copo é motivis de denguis. Detraxit consequat et quo num tendi nada. Admodum accumsan disputationi eu sit. Vide electram sadipscing et per.']")

            .col-12.self-end
                q-input.standout.bottom-slots(v-model="text" label="Digite aqui sua mensagem")
                    q-btn(round dense flat icon="send" @click="sendMessage()")
</template>

<script>
import { defineComponent } from 'vue'
import { io } from 'socket.io-client'
const socket = io(process.env.SOCKET_URL)
  .on('connect', () => {
    console.log(`Conectado via socoket.io em ${process.env.SOCKET_URL}`)
  })
export default defineComponent({
  name: 'Chat',
  setup () {

  },

  data () {
    return {
      text: ''
    }
  },

  methods: {
    sendMessage: function () {
      socket.emit('message', this.text)
    }
  }
})
</script>

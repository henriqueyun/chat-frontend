<template lang="pug">
q-dialog(persistent)
  q-card(style="min-width: 350px")
    q-card-section
      div.text-h6
      | Inform your username
    q-card-section.q-pt-none
      q-input.standout.bottom-slots(placeholder="Guest" v-model="username")
    q-card-actions.text-primary(align="right")
      q-btn(flat label="Cancel")
      q-btn(flat label="Let's Xet!" @click="$emit('click', this.username || 'Guest')" v-close-popup)
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ChatUsernameDialog',

  data () {
    return {
      username: ''
    }
  }
})
</script>

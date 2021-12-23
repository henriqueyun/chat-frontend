<template lang="pug">
q-page#xetPage
  .row.absolute-center.text-center(style="min-height: inherit;")
    .col-12.self-end.material-icons(style="font-size: 1000%; color: var(--q-primary);")
        | chat
    .col-12
      p.ext-subtitle1(style="font-size: 200%;") Welcome, {{ username }}! Choose or schedule a Xet and have fun!
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Chat',

  props: {
    username: {
      type: String,
      default: function () { return '' }
    }
  }
})
</script>

<style>

</style>

<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar class="row">
        <q-toolbar-title class="row justify-center">
          Xet
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer
      show-if-above
      bordered
    >
      <Chats>
      </Chats>
      <q-btn class="fixed-bottom full-width" color="primary" icon="calendar_today" label="Schedule new Xet" />
    </q-drawer>

    <q-page-container>
    </q-page-container>
  </q-layout>
</template>
<script>
import { defineComponent } from 'vue'
import Chats from 'components/Chats.vue'

export default defineComponent({
  name: 'MainLayout',

  components: {
    Chats
  }
})

</script>

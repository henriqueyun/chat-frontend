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

      <ScheduleDialog v-model="schedule_modal">
      </ScheduleDialog>
      <q-btn class="fixed-bottom full-width" color="primary" icon="calendar_today" label="Schedule new Xet" @click="schedule_modal = true"/>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

  </q-layout>
</template>
<script>
import { defineComponent, ref } from 'vue'

import Chats from 'components/Chats.vue'
import ScheduleDialog from 'components/ScheduleDialog.vue'

export default defineComponent({
  name: 'MainLayout',

  components: {
    Chats,
    ScheduleDialog
  },

  setup () {
    return {
      schedule_modal: ref(false),
      schedule_xet_time: ref(false)
    }
  }
})
</script>

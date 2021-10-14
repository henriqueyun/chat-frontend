<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar class="row">
        <q-toolbar-title class="row justify-center">
          Xet {{ username }}
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer
      show-if-above
      bordered
    >
      <Chats v-bind:username="username">
      </Chats>
      <q-btn class="fixed-bottom full-width" color="primary" icon="calendar_today" label="Schedule new Xet" @click="schedule_modal = true"/>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>

  <ChatUsernameDialog
    v-bind:username="username"
    v-on:click="this.username = $event"
    v-model="require_username">
  </ChatUsernameDialog>
  <ScheduleDialog v-model="schedule_modal">
  </ScheduleDialog>
</template>
<script>
import { defineComponent, ref } from 'vue'

import Chats from 'src/components/SideChats.vue'
import ScheduleDialog from 'components/ScheduleDialog.vue'
import ChatUsernameDialog from 'components/ChatUsernameDialog.vue'

export default defineComponent({
  name: 'MainLayout',

  components: {
    Chats,
    ScheduleDialog,
    ChatUsernameDialog
  },

  data () {
    return {
      username: 'Zezin'
    }
  },

  created () {
    this.require_username = true
  },

  setup () {
    return {
      require_username: ref(true),
      schedule_modal: ref(false),
      schedule_xet_time: ref(false)
    }
  }
})
</script>

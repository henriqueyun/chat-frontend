<template>
  <q-layout view="lHh Lpr lff">
    <q-header>
      <q-toolbar class="row">
        <q-toolbar-title class="row justify-center">
          {{ username }}'s Xet
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view :key="$route.fullPath" :selectedXet="selectedXet"/>
    </q-page-container>

    <q-drawer
      show-if-above
      bordered
    >
      <SideChats v-bind:username="username" :xets="xets">
      </SideChats>
      <q-btn class="fixed-bottom full-width no-border-radius outline" color="primary" icon="calendar_today" label="Schedule new Xet" @click="schedule_modal = true"/>
    </q-drawer>
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

import SideChats from 'src/components/SideChats.vue'
import ScheduleDialog from 'components/ScheduleDialog.vue'
import ChatUsernameDialog from 'components/ChatUsernameDialog.vue'

export default defineComponent({
  name: 'MainLayout',

  components: {
    SideChats,
    ScheduleDialog,
    ChatUsernameDialog
  },

  methods: {
    loadXets: function () {
      this.$axios.get('/xet/all')
        .then(res => {
          this.xets = res.data
        })
    }
  },

  data () {
    return {
      username: 'Guest',
      messages: [],
      xets: [],
      selectedXet: 'bar'
    }
  },

  created () {
    this.require_username = true
    this.loadXets()
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

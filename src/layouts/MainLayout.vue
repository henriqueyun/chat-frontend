<template>
  <q-layout view="lHh Lpr lff">
    <q-header>
      <q-toolbar class="row">
        <q-toolbar-title class="row justify-center">
          <span><router-link class="" to="/">{{ username }}'s Xet</router-link></span>
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view :key="$route.fullPath" :selectedXet="selectedXet" :username="username" :socket="socket"/>
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

  <ScheduleDialog v-on:xetAdded="loadXets" v-model="schedule_modal">
  </ScheduleDialog>
</template>
<script>
import { defineComponent, ref } from 'vue'

import SideChats from 'src/components/SideChats.vue'
import ScheduleDialog from 'components/ScheduleDialog.vue'
import ChatUsernameDialog from 'components/ChatUsernameDialog.vue'

import { io } from 'socket.io-client'

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
          this.socket = io(process.env.SOCKET_URL)
            .on('connect', () => {
              console.log(`Connected by socket.io in ${process.env.SOCKET_URL}`)
            })
        })
    },

    goHome: function () {
      if (window.location.hash !== '#/') {
        window.location.hash = '#/'
      }
    }
  },

  data () {
    return {
      username: 'Guest',
      xets: [],
      selectedXet: '',
      socket: {}
    }
  },

  mounted () {
    this.goHome()
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

<style scoped>
a {
  color: white;
  text-decoration: none;
  }
</style>

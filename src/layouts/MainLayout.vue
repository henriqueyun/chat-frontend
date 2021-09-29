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
      <q-btn class="fixed-bottom full-width" color="primary" icon="calendar_today" label="Schedule new Xet" @click="schedule_modal = true"/>
    </q-drawer>

    <q-page-container>
    </q-page-container>

    <q-dialog v-model="schedule_modal" persistent>
        <q-card style="min-width: 350px">
          <q-card-section>
            <div class="text-h6">Scheduling new Xet</div>
          </q-card-section>
          <q-card-section class="q-pt-none">
            <q-input filled>
              <template v-slot:prepend>
                <q-icon name="event" class="cursor-pointer">
                  <q-popup-proxy transition-show="scale" transition-hide="scale">
                    <q-date mask="YYYY-MM-DD HH:mm">
                      <div class="row items-center justify-end">
                        <q-btn v-close-popup label="Close" color="primary" flat />
                      </div>
                    </q-date>
                  </q-popup-proxy>
                </q-icon>
              </template>
              <template v-slot:append>
                <q-icon name="access_time" class="cursor-pointer">
                  <q-popup-proxy transition-show="scale" transition-hide="scale">
                    <q-time mask="YYYY-MM-DD HH:mm" format24h>
                      <div class="row items-center justify-end">
                        <q-btn v-close-popup label="Close" color="primary" flat />
                      </div>
                    </q-time>
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input>
            <q-input label="Xet title" />
          </q-card-section>
          <q-card-actions align="right" class="text-primary">
            <q-btn flat label="Cancel" v-close-popup />
            <q-btn flat label="Schedule new xet" v-close-popup />
          </q-card-actions>
        </q-card>
    </q-dialog>
  </q-layout>
</template>
<script>
import { defineComponent, ref } from 'vue'
import Chats from 'components/Chats.vue'

export default defineComponent({
  name: 'MainLayout',

  components: {
    Chats
  },

  setup () {
    return {
      schedule_modal: ref(false),
      schedule_xet_time: ref(false)
    }
  }
})
</script>

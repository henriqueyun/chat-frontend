<template>
  <q-dialog persistent>
      <q-card style="min-width: 350px">
        <q-card-section>
          <div class="text-h6">Scheduling new Xet</div>
        </q-card-section>
        <q-card-section class="q-pt-none">
        <q-input v-model="title" label="Xet title" />
        <br>
          <q-input label="Start Time" v-model="startDateTime" stack-label filled>
            <template v-slot:prepend>
              <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy transition-show="scale" transition-hide="scale">
                  <q-date v-model="startDateTime" mask="YYYY-MM-DD HH:mm">
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
                  <q-time v-model="startDateTime" mask="YYYY-MM-DD HH:mm" format24h>
                    <div class="row items-center justify-end">
                      <q-btn v-close-popup label="Close" color="primary" flat />
                    </div>
                  </q-time>
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
          <br>
          <q-input label="End Time" v-model="endDateTime" stack-label filled>
            <template v-slot:prepend>
              <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy transition-show="scale" transition-hide="scale">
                  <q-date v-model="endDateTime" mask="YYYY-MM-DD HH:mm">
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
                  <q-time v-model="endDateTime" mask="YYYY-MM-DD HH:mm" format24h>
                    <div class="row items-center justify-end">
                      <q-btn v-close-popup label="Close" color="primary" flat />
                    </div>
                  </q-time>
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
        </q-card-section>
        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="Cancel" @click="cleanScheduleFields()" v-close-popup />
          <q-btn flat :loading="loading" v-close-popup="loading" color="primary" @click="scheduleXet()" label="Schedule A xet" />
        </q-card-actions>
      </q-card>
  </q-dialog>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ScheduleDialog',

  data () {
    return {
      title: '',
      startDateTime: '',
      endDateTime: '',
      loading: false
    }
  },

  methods: {
    scheduleXet: function () {
      this.setLoading(true)
      this.$axios.post('/xet', {
        owner: 'owner',
        title: this.title,
        startTime: this.startDateTime,
        endTime: this.endDateTime
      }).then(() => {
        this.cleanScheduleFields()
        this.setLoading(false)
        this.$emit('xetAdded', '')
      })
    },
    setLoading: function (isLoading) {
      this.loading = isLoading
    },
    cleanScheduleFields: function () {
      this.title = ''
      this.startDateTime = ''
      this.endDateTime = ''
    }
  }
})
</script>

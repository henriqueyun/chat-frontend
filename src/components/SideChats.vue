<template>
<span v-if="xets.length">
  <a v-for="{id, owner, title, startTime, endTime, ongoing} in xets" v-bind:key="id" :class="!ongoing ? 'disabled' : ''">
    <router-link :to="ongoing ? {path: `/xet/${id}`} : ''" class="custom-not-working">
      <q-item clickable v-ripple style="box-shadow: inset 0 -5px 5px #FBFBFB;">
        <q-item-section side>
          <span class="material-icons" style="font-size: 36px;">
          question_answer
          </span>
        </q-item-section>
        <q-item-section>
          <q-item-label> <b>{{ title }}</b> </q-item-label>
          <q-item-label> {{ owner }} </q-item-label>
          <q-item-label v-if="ongoing" caption>scheduled to {{ getInHours(startTime) }} until {{ getInHours(endTime) }}</q-item-label>
          <q-item-label v-else-if="new Date(startTime) > new Date() && new Date(endTime) < new Date()" caption> started at {{ getInHours(startTime) }}
          <q-item-label> ongoing until {{ getInHours(endTime) }}</q-item-label>
          </q-item-label>
          <q-item-label v-else-if="new Date(startTime) < new Date() && new Date(endTime) < new Date()" caption> started at {{ getInHours(startTime) }}
          <q-item-label> ended at {{ getInHours(endTime) }}</q-item-label></q-item-label>
        </q-item-section>
        <q-item-section avatar v-if="!ongoing" >
          <q-icon name="lock" />
        </q-item-section>
      </q-item>
    </router-link>
  </a>
</span>
<div v-else class="row absolute-center text-center">
  <div class="col-12">
    <span class="row material-icons q-mb-sm" style="font-size: 80px; color: var(--q-primary);">
      chat
    </span>
    <p class="ext-subtitle1">There is no Xets scheduled for now.</p>
  </div>
</div>
</template>

<script>
import { defineComponent } from 'vue'
import { date } from 'quasar'

export default defineComponent({
  name: 'Chats',
  mounted () {
    setInterval(() => {
      this.refreshXets()
    }, 3000)
  },

  methods: {
    getInHours: function (time) {
      return date.formatDate(new Date(time), 'HH:mm') + 'h'
    },

    isXetOngoing: function (initialTime, finalTime) {
      return date.isBetweenDates(new Date(), initialTime, finalTime)
    },

    refreshXets: function () {
      this.xets.map(xet => {
        xet.ongoing = this.isXetOngoing(xet.startTime, xet.endTime)
        return xet
      })
    }
  },

  props: {
    username: {
      require: true,
      type: String
    },
    xets: {
      require: true,
      type: Array
    }
  }
})
</script>

<style scoped>
  .custom-not-working {
      color: inherit;
      text-decoration: none;
  }

  .side-chat-disabled {
    pointer-events: none !important;
  }
</style>

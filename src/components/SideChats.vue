<template>
<a v-for="{id, owner, title, startTime, endTime} in xets" v-bind:key="id" custom>
  <router-link :to="{path: `/xet/${id}`}" class="custom-not-working">
    <q-item clickable v-ripple >
      <q-item-section side>
        <span class="material-icons" style="font-size: 36px;">
        question_answer
        </span>
      </q-item-section>
      <q-item-section>
        <q-item-label>{{ title }} {{ owner }}</q-item-label>
        <q-item-label caption> {{ getInHours(startTime) }} until {{ getInHours(endTime) }}</q-item-label>
      </q-item-section>
      <q-item-section side>
        0m started
      </q-item-section>
    </q-item>
  </router-link>
</a>
</template>

<script>
import { defineComponent } from 'vue'
import { date } from 'quasar'

export default defineComponent({
  name: 'Chats',

  methods: {
    getInHours: function (time) {
      return date.formatDate(new Date(time).getMinutes(), 'HH:mm') + 'h'
    }
  },

  mounted () {
    console.log(this.xets)
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
</style>

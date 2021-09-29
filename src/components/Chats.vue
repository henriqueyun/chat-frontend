<template>
    <q-item clickable v-ripple>
      <q-item-section side>
        <span class="material-icons" style="font-size: 36px;">
        question_answer
        </span>
      </q-item-section>
      <q-item-section>
        <q-item-label>Mary</q-item-label>
        <q-item-label caption>18h until 18h30</q-item-label>
      </q-item-section>
      <q-item-section side>
        start in 3 min
      </q-item-section>
    </q-item>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({ name: 'Chats' })
</script>

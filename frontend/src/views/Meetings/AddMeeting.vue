<template>
  <v-container class="v-container">
    <v-card>
      <v-card-title>Add Meeting</v-card-title>
      <v-card-text>
        <v-text-field
          v-model="name"
          label="Name"
          outlined
        ></v-text-field>
        <v-text-field
          v-model="description"
          label="Description"
          outlined
        ></v-text-field>
        <v-text-field
          v-model="date"
          label="Date"
          outlined
        ></v-text-field>
        <v-text-field
          v-model="time"
          label="Time"
          outlined
        ></v-text-field>
        <v-btn
          color="primary"
          @click="addMeeting"
        >
          Add Meeting
        </v-btn>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const name = ref('')
const description = ref('')
const date = ref('')
const time = ref('')
const addMeeting = () => {
  console.log('Name:', name.value)
  console.log('Description:', description.value)
  console.log('Date:', date.value)
  console.log('Time:', time.value)
}

</script>

<style scoped>

</style>

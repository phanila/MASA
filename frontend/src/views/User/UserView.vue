<template>
  <v-container class="v-container">
    <v-card>
      <v-card-title>Add equipment</v-card-title>
      <v-card-text>
        <v-text-field
          v-model="name"
          label="Name"
          outlined
        ></v-text-field>

        <v-btn
          color="primary"
          @click="add"
        >
          Add
        </v-btn>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { AddEquipmentRoute } from '@/apiRoutes.ts'
import { apiCall } from '@/api.ts'

const name = ref('')


const add = async () => {
  try{
    const response = await apiCall(new AddEquipmentRoute(), { name: name.value})
    console.log('Register response:', response)
  }
  catch (e) {
    console.error('Register failed:', e)
  }
}
</script>

<style scoped>
.v-container {
  width: 100vw;
  height: 100vh;
}
</style>

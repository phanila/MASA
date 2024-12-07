<template>
  <v-container class="v-container">
    <v-card>
      <v-card-title>Login</v-card-title>
      <v-card-text>
        <v-text-field
          v-model="email"
          label="Email"
          outlined
        ></v-text-field>
        <v-text-field
          v-model="password"
          label="Password"
          outlined
          type="password"
        ></v-text-field>
        <v-btn
          color="primary"
          @click="login"
        >
          Login
        </v-btn>
      </v-card-text>
    </v-card>

  </v-container>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const email = ref('')
const password = ref('')

const login = () => {
  console.log('Email:', email.value)
  console.log('Password:', password.value)
}
</script>

<style scoped>
.v-container{
  width: 100vw;
  height: 100vh;
}
</style>

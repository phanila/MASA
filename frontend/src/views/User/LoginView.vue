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
import { apiCall } from '@/api.ts'
import { LoginRoute } from '@/apiRoutes.ts'

const email = ref('')
const password = ref('')

const login = async () => {
  try{
    const response = await apiCall(new LoginRoute(), { email: email.value, password: password.value });
    localStorage.setItem('token', response.token);
  }catch(e){
    console.error('Login failed:', e);
  }
}
</script>

<style scoped>
.v-container{
  width: 100vw;
  height: 100vh;
}
</style>

<template>
  <v-container class="v-container">
    <v-card>
      <v-card-title>Register</v-card-title>
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
          @keydown.enter="checkPasswordStrength"
          type="password"
          @input="checkPasswordStrength"
        ></v-text-field>
        <v-progress-linear
          :model-value="passwordStrength"
          :color="passwordStrengthColor"
          height="7"
        ></v-progress-linear>
        <v-text-field
          v-model="repeatPassword"
          label="Repeat Password"
          outlined
          type="password"
        ></v-text-field>
        <v-btn
          color="primary"
          @click="register"
        >
          Register
        </v-btn>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const email = ref('')
const password = ref('')
const repeatPassword = ref('')
const passwordStrength = ref(0)
const passwordStrengthColor = ref('red')

const checkPasswordStrength = () => {
  const strength = calculatePasswordStrength(password.value)
  console.log(strength)
  passwordStrength.value = strength
  passwordStrengthColor.value = getPasswordStrengthColor(strength)
}

const calculatePasswordStrength = (password: string) => {
  let strength = 0
  if (password.length >= 8) strength += 25
  if (/[A-Z]/.test(password)) strength += 25
  if (/[0-9]/.test(password)) strength += 25
  if (/[^A-Za-z0-9]/.test(password)) strength += 25
  return strength
}

const getPasswordStrengthColor = (strength: number) => {
  if (strength < 50) return 'red'
  if (strength < 75) return 'orange'
  return 'green'
}

const register = () => {
  if (password.value !== repeatPassword.value) {
    alert('Passwords do not match')
    return
  }
  console.log('Email:', email.value)
  console.log('Password:', password.value)
}
</script>

<style scoped>
.v-container {
  width: 100vw;
  height: 100vh;
}
</style>

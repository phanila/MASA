<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
    <nav>
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/about">About</RouterLink>
      <RouterLink to="/example">Example</RouterLink>
    </nav>

  <RouterView />
</template>

<style scoped>
nav {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background-color: #333;
  padding: 1rem;
  display: flex;
  justify-content: space-around;
}

</style>

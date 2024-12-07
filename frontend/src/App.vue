<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { navbarLinks } from '@/router/navbarLinks.ts'
</script>

<template>
  <v-toolbar>
    <v-toolbar-title>Duży teleskop w twojej okolicy</v-toolbar-title>
    <v-toolbar-items>
      <v-btn v-for="link in navbarLinks" :key="link.path">
        <RouterLink :to="link.path">{{ link.title }}</RouterLink>
      </v-btn>
    </v-toolbar-items>
  </v-toolbar>

  <RouterView />
</template>

<style>
html, body {
  margin: 0;
  padding: 0;
  font-family: Arial, sans-serif;
}
nav {
  width: 100%;
  height: 150px;
  background-color: #333;
}

</style>

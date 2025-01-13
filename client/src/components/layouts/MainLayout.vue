<script setup>
  import AppNavbar from '@/components/layouts/AppNavbar.vue'
  import { RouterView } from 'vue-router'
</script>

<template>
  <v-app>
    <AppNavbar />
    <router-view v-slot="{ Component }">
      <keep-alive :include="['MapView']"> <component :is="Component" /> </keep-alive
    ></router-view>
  </v-app>
</template>

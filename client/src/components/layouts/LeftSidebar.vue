<script setup></script>

<template>
  <v-sheet
    class="position-relative"
    style="min-width: 400px"
  >
    <v-navigation-drawer
      :width="400"
      :scrim="false"
      :mobile="false"
      :absolute="false"
      class="no-scrollbar postioin-relative h-100 top-0"
    >
      <router-view />
    </v-navigation-drawer>
  </v-sheet>
</template>

<style scoped>
  .no-scrollbar *::-webkit-scrollbar {
    display: none;
  }

  .no-scrollbar * {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
</style>

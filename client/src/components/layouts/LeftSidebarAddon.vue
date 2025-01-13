<script setup></script>

<template>
  <v-sheet
    class="position-absolute"
    style="min-width: 400px; height: calc(100vh - 64px)"
  >
    <v-navigation-drawer
      color="grey-lighten-4"
      :width="400"
      :scrim="false"
      :mobile="false"
      :absolute="false"
      class="no-scrollbar postioin-relative h-100 top-0"
    >
      <router-view name="second" />
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

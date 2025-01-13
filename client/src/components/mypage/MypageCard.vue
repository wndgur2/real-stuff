<script setup>
  defineProps({ title: String })
</script>

<template>
  <div class="d-flex flex-column flex-grow-1">
    <h2 class="text-info mb-4">{{ title }}</h2>
    <v-card
      variant="outlined"
      rounded="xl"
      border="sm"
      class="text-info bg-surface"
    >
      <slot />
    </v-card>
  </div>
</template>

<style scoped></style>

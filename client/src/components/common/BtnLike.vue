<script setup>
  defineProps({ liked: Boolean, likes: Number })
</script>

<template>
  <v-btn
    :color="liked ? 'error' : 'secondary'"
    prepend-icon="fa-heart"
    variant="text"
    size="small"
    rounded="pill"
  >
    {{ likes }}
  </v-btn>
</template>

<style scoped>
  button {
    background-color: transparent;
    border: none;
    width: auto;
    height: auto;
  }
</style>

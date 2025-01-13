<script setup>
  defineProps({
    addonClass: {
      type: String,
      default: '',
    },
  })
</script>

<template>
  <v-btn
    :slim="true"
    :rounded="true"
    variant="outlined"
    border="sm"
    :class="addonClass"
  >
    <slot></slot>
  </v-btn>
</template>

<style scoped></style>

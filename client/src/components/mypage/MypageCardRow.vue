<script setup>
  defineProps({ type: String, content: String })
</script>

<template>
  <div class="d-flex ga-4 justify-end">
    <slot />
  </div>
</template>

<style scoped></style>

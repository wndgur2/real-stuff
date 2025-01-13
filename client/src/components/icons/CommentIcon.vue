<script setup>
  defineProps({
    commentN: Number,
  })
</script>

<template>
  <div class="d-flex align-center">
    <v-btn
      prepend-icon="fa-comment"
      color="secondary"
      variant="text"
      size="small"
      rounded="pill"
    >
      <span>{{ commentN }}</span>
    </v-btn>
  </div>
</template>

<style scoped></style>

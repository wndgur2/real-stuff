<script setup>
  import { RouterView, useRouter } from 'vue-router'
  const router = useRouter()
  const goBack = () => {
    router.back()
  }
</script>

<template>
  <v-container class="w-100 h-75">
    <div class="d-flex justify-space-between align-center mb-3 px-2">
      <v-btn
        variant="plain"
        icon="pen-to-square"
        size="medium"
        :to="{ name: 'house-article-form' }"
      ></v-btn>
      <h1>아파트 톡</h1>
      <v-btn
        variant="plain"
        size="medium"
        icon="xmark"
        color="secondary"
        @click="goBack"
      ></v-btn>
    </div>
    <router-view name="third" />
  </v-container>
</template>

<style scoped></style>

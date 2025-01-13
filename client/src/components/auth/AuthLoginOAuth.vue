<!-- OAuth login button -->
<script setup>
  defineProps({
    icon: String,
    name: String,
    bgColor: String,
  })
</script>

<template>
  <div class="d-flex justify-center">
    <v-btn
      rounded="pill"
      :border="bgColor ? '0' : 'sm'"
      size="large"
      variant="outlined"
      class="w-100 px-4"
      :style="{ 'background-color': bgColor }"
    >
      <div class="d-flex align-center">
        <img
          :src="icon"
          class="mr-4"
          width="24"
        />
        <span class="text-body-2">{{ name }} 계정으로 로그인</span>
      </div>
    </v-btn>
  </div>
</template>

<style scoped></style>

<script setup>
  defineProps(['scale', 'white'])
</script>

<template>
  <div
    class="d-flex align-center ga-2"
    :style="{ scale: scale }"
  >
    <img
      alt="Vue logo"
      class="logo"
      src="@/assets/images/icons/logo.svg"
      :width="40"
      :height="40"
    />
    <v-toolbar-title
      class="logo"
      :class="{ 'text-surface': white, white: white }"
      ><h3>진짜매물</h3></v-toolbar-title
    >
  </div>
</template>

<style scoped>
  .white h3 {
    text-shadow: rgba(0, 0, 0, 0.3) -2px 3px 2px;
    overflow: visible;
  }
</style>

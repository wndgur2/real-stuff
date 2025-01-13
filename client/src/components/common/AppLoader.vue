<script setup></script>

<template>
  <div class="d-flex justify-center align-center py-8">
    <img
      alt="Vue logo"
      class="logo"
      src="@/assets/images/icons/logo.svg"
      :width="40"
      :height="40"
    />
  </div>
</template>

<style scoped>
  .logo {
    animation: spin 1s ease infinite;
  }

  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
</style>

<script setup>
  import { computed, ref } from 'vue'
  import { useUserStore } from '@/store/user'
  import { storeToRefs } from 'pinia'
  import { secondsToTime } from '@/utils/time'

  const userStore = useUserStore()
  const { user, leftTime } = storeToRefs(userStore)
  const time = computed(() => secondsToTime(leftTime.value))
</script>

<template>
  <div class="d-flex ga-2 align-center px-2">
    <span class="text-warning">{{ time.min }}:{{ time.sec }}</span>
    <v-btn
      size="small"
      border="sm"
      rounded="pill"
      @click="userStore.reissue"
      >연장</v-btn
    >
  </div>
</template>

<style scoped></style>

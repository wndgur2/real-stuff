<script setup>
  import { RouterView } from 'vue-router'
  import AuthLayout from '@/components/modals/AuthModal.vue'
  import { ref } from 'vue'
  import FavoriteModal from '@/components/modals/FavoriteModal.vue'
  import { useModalStore } from './store/modal'
  import { storeToRefs } from 'pinia'
  const modalStore = useModalStore()
  const { isAuthModalOpen, isFavoriteModalOpen, favoriteModalType } =
    storeToRefs(modalStore)
  // category = info / deal
  const category = ref('info')
</script>

<template>
  <v-app>
    <router-view />
    <AuthLayout v-if="isAuthModalOpen" />
    <FavoriteModal
      :category="favoriteModalType"
      v-if="isFavoriteModalOpen"
    />
  </v-app>
</template>

<style scoped></style>

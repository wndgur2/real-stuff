import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

export const useModalStore = defineStore('modal', () => {
  const isAuthModalOpen = ref(false)
  const isFavoriteModalOpen = ref(false)
  const favoriteModalType = ref('')

  const openAuthModal = () => {
    isAuthModalOpen.value = true
  }

  const closeAuthModal = () => {
    isAuthModalOpen.value = false
  }

  const openFavoriteModal = (type) => {
    console.log(type, favoriteModalType.value, isFavoriteModalOpen.value)
    if (isFavoriteModalOpen.value && type == favoriteModalType.value)
      return closeFavoriteModal()
    favoriteModalType.value = type
    isFavoriteModalOpen.value = true
  }

  const closeFavoriteModal = () => {
    isFavoriteModalOpen.value = false
  }

  watch(
    isAuthModalOpen,
    (isOpen) => {
      console.log('watch', isOpen)
    },
    { immediate: true }
  )

  return {
    isAuthModalOpen,
    openAuthModal,
    closeAuthModal,
    isFavoriteModalOpen,
    openFavoriteModal,
    closeFavoriteModal,
    favoriteModalType,
  }
})

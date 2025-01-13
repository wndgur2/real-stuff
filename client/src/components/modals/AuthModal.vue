<script setup>
  import { onMounted, ref } from 'vue'
  import AppLogo from '../common/AppLogo.vue'
  import AuthFindPassword from '@/components/auth/AuthFindPassword.vue'
  import AuthRegister from '@/components/auth/AuthRegister.vue'
  import AuthLogin from '@/components/auth/AuthLogin.vue'
  import { useModalStore } from '@/store/modal'
  const modalStore = useModalStore()
  const closeModal = modalStore.closeAuthModal
  const modalWrapper = ref(null)
  onMounted(() => setTimeout(() => (modalWrapper.value.style.opacity = 1), 10))
  const close = () => {
    modalWrapper.value.style.opacity = 0
    setTimeout(closeModal, 300)
  }

  // define const routes enum values
  const routes = {
    LOGIN: 0,
    REGISTER: 1,
    FIND_PASSWORD: 2,
  }

  const route = ref(routes.LOGIN)

  const onRoute = (newRoute) => {
    route.value = newRoute
  }
</script>

<template>
  <div
    class="position-absolute top-0 d-flex justify-center align-center modal-wrapper w-100 h-100"
    ref="modalWrapper"
  >
    <div
      class="position-absolute top-0 w-100 h-100 modal-background"
      @click="close"
    ></div>
    <div
      class="position-absolute w-75 h-75 bg-surface rounded-xl d-flex flex-row elevation-6 overflow-hidden"
      style="max-width: 1200px; max-height: 720px"
    >
      <div
        class="d-flex flex-column justify-center align-start w-50 pa-8 ga-4 modal-left overflow-hidden flex-grow-1"
        v-if="$vuetify.display.mdAndUp"
      >
        <h4 class="text-info">믿을 수 있는 매물 정보</h4>

        <AppLogo
          scale="1.6"
          class="ml-12"
          :white="true"
        />
      </div>
      <div
        class="d-flex flex-column w-50 bg-surface flex-grow-1 pa-6 ga-2 text-info overflow-scroll py-12"
      >
        <AuthLogin
          v-if="route === routes.LOGIN"
          @route="onRoute"
          @loggedIn="close"
          :routes="routes"
        />
        <AuthRegister
          v-if="route === routes.REGISTER"
          @route="onRoute"
          :routes="routes"
        />
        <AuthFindPassword
          v-if="route === routes.FIND_PASSWORD"
          @route="onRoute"
          :routes="routes"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
  .modal-wrapper {
    z-index: 1000;
    background-color: rgba(0, 0, 0, 0.2);
    opacity: 0;
    transition: opacity 0.3s;
  }
  .modal-left {
    background: linear-gradient(45deg, #afe0ff, #e4f3fd, #fcfcfc);
  }
</style>

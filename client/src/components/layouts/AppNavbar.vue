<script setup>
  import { RouterLink } from 'vue-router'
  import AppLogo from '@/components/common/AppLogo.vue'
  import BtnSmall from '../common/BtnSmall.vue'
  import { useUserStore } from '@/store/user'
  import { storeToRefs } from 'pinia'
  import { useModalStore } from '@/store/modal'
  import AuthTimer from '../auth/AuthTimer.vue'

  const userStore = useUserStore()
  const { user, isLogin } = storeToRefs(userStore)
  const { openAuthModal, openFavoriteModal } = useModalStore()

  const routes = {
    USER: [{ name: 'mypage', text: '마이페이지' }],
    AGENT: [
      { name: 'house-deal-regist', text: '매물등록' },
      { name: 'mypage', text: '마이페이지' },
    ],
    ADMIN: [
      { name: 'house-deal-regist', text: '매물등록' },
      { name: 'admin', text: '관리페이지' },
    ],
    MASTER: [
      { name: 'house-deal-regist', text: '매물등록' },
      { name: 'admin', text: '관리페이지' },
    ],
  }
</script>

<template>
  <v-app-bar
    class="position-relative px-4"
    :elevation="2"
  >
    <div class="d-flex align-center w-100 ga-2">
      <router-link
        class="rounded-0 mr-6"
        to="/"
      >
        <AppLogo scale="1" />
      </router-link>
      <BtnSmall :to="{ name: 'board' }">
        <span style="font-size: 0.85em">고객센터</span>
      </BtnSmall>

      <v-spacer />

      <AuthTimer v-if="isLogin" />

      <template v-if="isLogin">
        <v-btn
          rounded
          @click="openFavoriteModal('info')"
        >
          <h3>관심 아파트</h3></v-btn
        >
        <!-- <v-btn
          rounded
          @click="openFavoriteModal('deal')"
        >
          <h3>관심 매물</h3></v-btn
        > -->
        <v-btn
          v-for="route in routes[user.memberRole]"
          :key="route.name"
          rounded
          :to="{ name: route.name }"
          ><h3>{{ route.text }}</h3></v-btn
        >
        <v-btn
          rounded
          @click="userStore.logout"
        >
          <h3>로그아웃</h3>
        </v-btn>
      </template>
      <v-btn
        rounded
        v-else
        @click="openAuthModal"
      >
        <h3>로그인</h3>
      </v-btn>
    </div>
  </v-app-bar>
</template>

<style scoped></style>

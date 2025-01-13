<script setup>
  import KakaoMap from '@/components/KakaoMap.vue'
  import LeftSidebar from '@/components/layouts/LeftSidebar.vue'
  import LeftSidebarAddon from '@/components/layouts/LeftSidebarAddon.vue'
  import { ref, watchEffect } from 'vue'
  import { useRoute } from 'vue-router'
  import { useHouseInfoStore } from '@/store/house'
  import { storeToRefs } from 'pinia'
  import { addFavoriteRegion } from '@/api/region'
  import { useUserStore } from '@/store/user'
  const { currentLocation } = storeToRefs(useHouseInfoStore())
  const secondSidebar = ref(false)
  const route = useRoute()
  const userStore = useUserStore()

  watchEffect(() => {
    secondSidebar.value = !!route.params.houseId
  })

  const addFavorite = () => {
    if (!currentLocation.value.dong) return
    addFavoriteRegion(...Object.values(currentLocation.value))
      .then(() => {
        userStore.addFavoriteRegion(currentLocation.value)
        alert('관심 지역에 추가되었습니다.')
      })
      .catch((err) => {
        console.log(err)
        if (err.response.data.code === 1070) alert('이미 존재하는 관심 지역입니다.')
        else console.log(err)
      })
  }
</script>

<template>
  <v-sheet class="d-flex window overflow-y-hidden">
    <LeftSidebar />
    <LeftSidebarAddon v-if="secondSidebar" />

    <KakaoMap class="position-relative" />
  </v-sheet>
  <div class="search-button">
    <v-btn
      border="0"
      variant="outlined"
      elevation="16"
      style="background-color: #ddeeff"
      class="px-5"
      size="x-large"
      rounded="pill"
      @click="addFavorite"
      :disabled="!currentLocation.dong"
      :class="{ 'opacity-80': !currentLocation.dong }"
    >
      <template v-if="currentLocation.dong">
        <h4>{{ currentLocation.dong }} 관심 지역에 추가하기</h4>
      </template>
      <template v-else>
        <h3>{{ currentLocation.sido }} {{ currentLocation.gugun }}</h3>
      </template>
    </v-btn>
  </div>
</template>

<style scoped>
  .window {
    width: 100vw;
    height: calc(100vh - 64px);
  }

  .search-button {
    position: fixed;
    bottom: 24px;
    padding-left: 360px;
    z-index: 1;
    display: flex;
    justify-content: center;
    width: 100vw;
  }
</style>

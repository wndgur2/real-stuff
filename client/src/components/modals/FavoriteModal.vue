<script setup>
  import { useUserStore } from '@/store/user'
  import { ref, watch } from 'vue'
  import HouseDealItem from '@/components/housedeal/HouseDealItem.vue'
  import { getLikeDeals, getLikeHouses } from '@/api/user'
  import HouseInfoLikedItem from '../houseinfo/HouseInfoLikedItem.vue'
  import { useModalStore } from '@/store/modal'

  const { user } = useUserStore()
  const { closeFavoriteModal } = useModalStore()

  const props = defineProps({
    category: { type: String, required: true },
  })

  const categoryName = ref('')
  watch(
    () => props.category,
    (newVal) => {
      categoryName.value = newVal === 'info' ? '아파트' : '매물이'
    },
    { immediate: true }
  )

  const houseInfos = ref([])
  getLikeHouses().then((res) => {
    console.log(res)
    houseInfos.value = res.data.likeHouses
  })

  const houseDeals = ref([])
  getLikeDeals().then((res) => {
    console.log(res)
    houseDeals.value = res.data.likeDeals
  })
</script>

<template>
  <div
    class="position-absolute right-0 pa-8"
    style="z-index: 1001; top: 6vh"
  >
    <v-card
      rounded="xl"
      style="max-height: 80vh; overflow-y: scroll"
    >
      <div class="d-flex flex-row align-center ga-8 justify-space-between pa-4">
        <h3>{{ user.name }}님의 관심 {{ categoryName }}에요.</h3>
        <v-btn
          variant="text"
          size="small"
          color="info"
          icon="fa-x"
          @click="closeFavoriteModal"
        ></v-btn>
      </div>
      <template v-if="category === 'info'">
        <HouseInfoLikedItem
          v-for="houseInfo in houseInfos"
          :key="houseInfo.houseId"
          :houseInfo="houseInfo"
        />
      </template>
      <template v-else>
        <HouseDealItem
          v-for="houseDeal in houseDeals"
          :key="houseDeal.dealId"
          :houseDeal="houseDeal"
        />
      </template>
    </v-card>
  </div>
</template>

<style scoped></style>

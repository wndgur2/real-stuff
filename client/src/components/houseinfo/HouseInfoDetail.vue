<script setup>
  import BtnGoBack from '@/components/common/BtnGoBack.vue'
  import HouseAvgDealItem from '../housedeal/HouseAvgDealItem.vue'
  import { onMounted, ref, watch } from 'vue'
  import { getHouse } from '@/api/houseInfo'
  import { useRoute, useRouter } from 'vue-router'
  import { getAvgDealByHouse } from '@/api/houseDeal'
  import HouseDealChat from '../housedeal/HouseDealChat.vue'
  import { createLikeHouse, deleteLikeHouse } from '@/api/user'
  const route = useRoute()
  const router = useRouter()

  // get route param reactively
  const houseId = ref(route.params.houseId)
  const houseInfo = ref({})
  const houseDeals = ref([])
  const avgDeals = ref([])

  onMounted(() => {
    watch(
      () => route.params.houseId,
      (newHouseId) => {
        houseId.value = newHouseId
        loadHouse()
        loadDeal()
      },
      {
        immediate: true,
      }
    )
  })

  function loadHouse() {
    getHouse(houseId.value).then((res) => {
      houseInfo.value = res.data
      console.log(houseInfo.value)
      houseInfo.value.address =
        Object.values(houseInfo.value.region).join(' ') + ' ' + houseInfo.value.jibun
    })
  }

  function loadDeal() {
    getAvgDealByHouse(houseId.value).then((res) => {
      houseDeals.value = res.data.averageResponses.sort(
        (a, b) => a.exclusiveArea - b.exclusiveArea
      )

      avgDeals.value = houseDeals.value.map((a) => {
        const area = a.exclusiveArea
        const avgPrice = a.typeAndPrice[0].averagePrice
        return { area, avgPrice }
      })
    })
  }

  const goList = () => {
    router.push({ name: 'house-info-list' })
  }

  const goDealList = () => {
    router.replace({
      name: 'house-info-detail',
      params: { houseId: route.params.houseId },
    })
  }

  const goArticleList = () => {
    router.push({ name: 'house-article-list' })
  }

  const toggleLike = () => {
    if (houseInfo.value.likeStatus) dislike()
    else like()
  }

  const like = () => {
    createLikeHouse(houseInfo.value.houseId).then((res) => {
      console.log(res)
      houseInfo.value.likeStatus = !houseInfo.value.likeStatus
    })
  }

  const dislike = () => {
    deleteLikeHouse(houseInfo.value.houseId).then((res) => {
      console.log(res)
      houseInfo.value.likeStatus = !houseInfo.value.likeStatus
    })
  }
</script>

<template>
  <v-container fluid>
    <div class="d-flex align-center justify-space-between">
      <div class="d-flex align-center">
        <div><BtnGoBack @click.prevent="goList" /></div>
        <div class="pl-1">
          <h1>{{ houseInfo.name }}</h1>
        </div>
      </div>
      <div class="d-flex">
        <v-btn
          variant="outlined"
          border="sm"
          size="small"
          rounded
          class="mr-2"
          @click="goDealList"
          >매물
        </v-btn>
        <v-btn
          variant="outlined"
          border="sm"
          size="small"
          @click="goArticleList"
          rounded
          ><font-awesome-icon :icon="['far', 'comment-dots']" />
        </v-btn>
      </div>
    </div>

    <div class="d-flex pt-3 pb-4 pl-2 justify-space-between align-center">
      <p>{{ houseInfo.address }}</p>

      <v-btn
        :color="houseInfo.likeStatus ? 'error' : 'grey'"
        size="small"
        variant="text"
        icon="fa-heart"
        @click.prevent="toggleLike"
        :liked="houseInfo.likeStatus"
      />
    </div>
    <v-card
      class="pt-1"
      border="sm"
      variant="outlined"
      style="border-radius: 32px"
    >
      <v-card-item>
        <img
          :src="`/src/assets/images/houses/house_${houseInfo.houseId % 22}.png`"
          style="border-radius: 20px; object-fit: cover; width: 100%; aspect-ratio: 1/1"
      /></v-card-item>
      <v-card-item primary-title>
        <v-sheet>
          <h1 class="headline mb-3">
            <span>최근 5년 평균 실거래가</span>
          </h1>
          <v-table v-if="avgDeals.length">
            <thead>
              <tr>
                <th class="text-center pt-3">면적</th>
                <th class="text-center pt-3">평균 실거래가</th>
              </tr>
            </thead>
            <tbody>
              <HouseAvgDealItem
                :avgDeal="avgDeal"
                v-for="avgDeal in avgDeals"
                :key="avgDeal.id"
              ></HouseAvgDealItem>
            </tbody>
          </v-table>
          <span v-else>최근 거래가 없어요.</span>
        </v-sheet>
        <v-sheet
          class="mt-4"
          v-if="houseInfo.name"
        >
          <HouseDealChat :houseInfo="houseInfo" />
        </v-sheet>
      </v-card-item>
    </v-card>
  </v-container>
</template>

<style scoped></style>

<script setup>
  import BtnLike from '../common/BtnLike.vue'
  import { getDeal } from '@/api/houseDeal'
  import { koreanPrice, meterToPyung, defineSaleType } from '@/utils/house'
  import { useRoute } from 'vue-router'
  import { ref, onMounted } from 'vue'
  import HouseDealChat from './HouseDealChat.vue'
  import { getHouse } from '@/api/houseInfo'

  const route = useRoute()
  const dealId = route.params.dealId
  const houseId = route.params.houseId
  const houseDealDetail = ref(null)
  const houseInfo = ref(null)

  onMounted(() => {
    getHouse(houseId)
      .then((res) => {
        houseInfo.value = res.data
      })
      .catch((err) => {
        console.error(err)
      })
    getDeal(dealId)
      .then((res) => {
        houseDealDetail.value = res.data
        console.log(res.data)
      })
      .catch((err) => {
        console.error(err)
      })
  })
</script>

<template>
  <v-sheet class="h-100">
    <v-container>
      <div class="d-flex justify-center">
        <div class="mb-3">
          <h1>매물 상세정보</h1>
        </div>
      </div>
      <v-divider />
    </v-container>

    <v-card
      border="none"
      variant="outlined"
    >
      <v-card-item v-if="houseDealDetail">
        <img
          v-if="houseDealDetail.imageUrl"
          :src="houseDealDetail.imageUrl[0]"
          class="rounded-lg w-100"
        />
        <img
          v-else
          src="@/assets/images/no_image.svg"
          class="rounded-lg w-100"
        />
      </v-card-item>
      <!-- <v-card-item v-if="houseDealDetail.imageUrl.length > 0">
        <img
          :src="houseDealDetail.imageUrl[0]"
          alt="houseDealDetail.dealId"
          width="100%"
          style="border-radius: 20px"
      /></v-card-item> -->

      <v-sheet
        class="px-2"
        v-if="houseDealDetail"
      >
        <v-card-title>
          <div class="d-flex justify-space-between align-center text-info">
            <h2>
              {{ defineSaleType(houseDealDetail.type) }}
              {{ koreanPrice(houseDealDetail.price * 10000) }}
            </h2>
            <!-- <div>
              <BtnLike
                :liked="houseDealDetail.likeStatus"
                :likes="houseDealDetail.countLike"
              />
            </div> -->
          </div>
        </v-card-title>

        <v-card-item>
          <v-table>
            <tr>
              <td class="text-grey-lighten-1 pb-1"><h1>면적</h1></td>
              <td class="w-66 pl-4 pb-1">
                {{ meterToPyung(houseDealDetail.exclusiveArea) }}평 ({{
                  houseDealDetail.exclusiveArea
                }}㎡)
              </td>
            </tr>
            <tr>
              <td class="text-grey-lighten-1"><h1>층수</h1></td>
              <td class="w-66 pl-4">{{ houseDealDetail.floor }}층</td>
            </tr>
          </v-table>
        </v-card-item>
        <HouseDealChat
          :deal="houseDealDetail"
          :houseInfo="houseInfo"
        />
      </v-sheet>
    </v-card>
  </v-sheet>
</template>

<style scoped></style>

<script setup>
  import { regionToString } from '@/utils/text'
  import { koreanPrice, meterToPyung, defineSaleType } from '@/utils/house'
  const { houseDeal, houseId } = defineProps({
    houseDeal: Object,
    houseId: Number,
    hideName: { type: Boolean, default: false },
  })
</script>

<template>
  <v-list-item
    class="w-100"
    link
    :to="{
      name: 'house-deal-detail',
      params: {
        houseId,
        dealId: houseDeal.dealId,
      },
    }"
  >
    <div class="d-flex align-center py-2">
      <div>
        <v-img
          v-if="houseDeal.imageUrl?.length > 0"
          :src="houseDeal.imageUrl[0]"
          :alt="houseDeal.name"
          width="160"
          height="125"
          class="rounded-lg"
          style="object-fit: cover"
        />
        <img
          v-else
          src="@/assets/images/no_image.svg"
          :alt="houseDeal.name"
          width="160"
          height="125"
          class="rounded-lg"
          style="object-fit: cover"
        />
      </div>
      <div class="pl-4 w-100 h-100">
        <div class="mb-2">
          <h3>
            {{ defineSaleType(houseDeal.type) }}
            {{ koreanPrice(houseDeal.price * 10000) }} 원
          </h3>
        </div>
        <template v-if="!hideName">
          <div>
            <p>
              {{ regionToString(houseDeal.house.region) }} / {{ houseDeal.house.name }}
            </p>
          </div>
        </template>
        <div>
          <p>
            {{ meterToPyung(houseDeal.exclusiveArea) }} 평 ({{
              houseDeal.exclusiveArea
            }}m²)
          </p>
        </div>
        <div>
          <p>{{ houseDeal.floor }}층</p>
        </div>
        <!-- <div class="d-flex justify-end flex-row ga-3">
          <BtnLike
            :liked="houseDeal.liked"
            :likes="houseDeal.likedN"
          />
        </div> -->
      </div>
    </div>
  </v-list-item>
</template>

<style scoped></style>

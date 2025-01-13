<script setup>
  import { createLikeHouse, deleteLikeHouse } from '@/api/user'
  import { meterToPyung, koreanPrice } from '@/utils/house'
  import { trimText } from '@/utils/text'
  const { houseInfo, image } = defineProps({
    houseInfo: Object,
    image: String,
  })
  const toggleLike = () => {
    if (houseInfo.likeStatus) dislike()
    else like()
  }

  const like = () => {
    createLikeHouse(houseInfo.houseId).then((res) => {
      console.log(res)
      houseInfo.likeStatus = !houseInfo.likeStatus
    })
  }

  const dislike = () => {
    deleteLikeHouse(houseInfo.houseId).then((res) => {
      console.log(res)
      houseInfo.likeStatus = !houseInfo.likeStatus
    })
  }
</script>

<template>
  <v-list-item
    link
    :to="{
      name: 'house-info-detail',
      params: {
        houseId: houseInfo.houseId,
      },
    }"
    class="mb-2"
  >
    <!-- src="@/assets/images/houses/house_3.png" -->
    <div class="d-flex align-center py-2">
      <div>
        <img
          :src="image"
          :alt="houseInfo.name"
          width="136"
          height="136"
          class="rounded-lg"
          style="object-fit: cover"
        />
      </div>
      <div class="pl-4 w-100 h-100">
        <div class="no-break overflow-hidden w-100">
          <p>
            {{
              trimText(
                houseInfo.road + ' ' + houseInfo.bonbun + ' / ' + houseInfo.name,
                19
              )
            }}
          </p>
        </div>
        <div>
          <h3>
            {{ houseInfo.houseDealType || '매매' }}
            {{ koreanPrice(houseInfo.deal.price * 10000) }} 원
          </h3>
          <span class="text-secondary">{{ houseInfo.deal.dealDate.split(' ')[0] }}</span>
        </div>
        <div>
          <p>
            {{ meterToPyung(houseInfo.deal.exclusiveArea) }} 평 ({{
              houseInfo.deal.exclusiveArea
            }}m²)
          </p>
        </div>
        <div>
          <p>아파트 {{ houseInfo.deal.floor }}층</p>
        </div>
        <div class="d-flex justify-space-between align-center">
          <span class="text-info"
            >{{ houseInfo.region.gugun }} {{ houseInfo.region.dong }}</span
          >
          <v-sheet class="d-flex justify-end flex-row ga-3">
            <!-- <CommentIcon :commentN="houseInfo.commentN" /> -->
            <v-btn
              :color="houseInfo.likeStatus ? 'error' : 'grey'"
              size="small"
              variant="text"
              icon="fa-heart"
              @click.prevent="toggleLike"
              :liked="houseInfo.likeStatus"
            />
          </v-sheet>
        </div>
      </div>
    </div>
  </v-list-item>
</template>

<style scoped></style>

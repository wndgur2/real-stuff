<script setup>
  import { createLikeHouse, deleteLikeHouse } from '@/api/user'
  const { houseInfo } = defineProps({
    houseInfo: Object,
  })
  console.log(houseInfo)
  houseInfo.likeStatus = true

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
  console.log(houseInfo)
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
    class="mb-1"
  >
    <div class="d-flex align-center py-1">
      <div>
        <img
          :src="`/src/assets/images/houses/house_${houseInfo.houseId % 22}.png`"
          :alt="houseInfo.name"
          width="96"
          height="96"
          class="rounded-lg"
        />
      </div>
      <div class="pl-4 w-100 h-100">
        <div class="no-break overflow-hidden">
          <h3>{{ houseInfo.road }} {{ houseInfo.bonbun }} / {{ houseInfo.name }}</h3>
        </div>
        <div>
          <span class="text-info"
            >{{ houseInfo.region.sido }} {{ houseInfo.region.gugun }}
            {{ houseInfo.region.dong }}</span
          >
        </div>
        <div class="d-flex justify-space-between align-center">
          <span>{{ houseInfo.buildYear }}년</span>
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

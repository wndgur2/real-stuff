<script setup>
  import BtnLike from '@/components/common/BtnLike.vue'
  import CommentIcon from '@/components/icons/CommentIcon.vue'
  import { trimText } from '@/utils/text'

  defineProps({
    article: {
      type: Object,
      required: true,
    },
  })
</script>

<template>
  <v-list-item
    class="w-100"
    link
    :to="{
      name: 'house-article-detail',
      params: {
        houseId: article.houseId,
        articleId: article.articleId,
      },
    }"
  >
    <div class="d-flex align-center py-2">
      <div>
        <img
          :alt="article.houseName"
          width="136"
          height="136"
          class="rounded-lg"
          v-if="article.imageUrl.length"
          :src="article.imageUrl[0]"
          style="object-fit: cover"
        />
      </div>
      <div class="px-4 w-100 h-100">
        <div class="d-flex justify-space-between align-center mb-2">
          <h3>{{ article.houseName }}</h3>
          <span class="text-secondary">{{ article.createdAt }}</span>
        </div>
        <p>{{ trimText(article.content, 55) }}</p>
        <div class="d-flex justify-end flex-row ga-3">
          <CommentIcon :commentN="article.commentCount" />
          <BtnLike
            :liked="true"
            :likes="article.likeCount"
          />
        </div>
      </div>
    </div>
  </v-list-item>
</template>

<style scoped></style>

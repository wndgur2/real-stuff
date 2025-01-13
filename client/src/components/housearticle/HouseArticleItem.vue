<script setup>
  import { likeArticle } from '@/api/article'
  import BtnLike from '@/components/common/BtnLike.vue'
  import CommentIcon from '@/components/icons/CommentIcon.vue'
  import { trimText } from '@/utils/text'

  defineProps({
    article: {
      type: Object,
      required: true,
    },
    fullText: {
      type: Boolean,
      default: false,
    },
  })
</script>

<template>
  <v-container>
    <div class="d-flex align-center">
      <div class="w-100 h-100">
        <div class="d-flex justify-start align-center pb-2">
          <div class="text-grey">{{ article.nickname }}</div>
        </div>
        <p v-if="fullText">{{ article.content }}</p>
        <p v-else>{{ trimText(article.content, 55) }}</p>
        <div class="d-flex justify-space-between align-center pt-2">
          <p class="text-secondary">{{ article.createdAt }}</p>
          <div class="d-flex justify-end flex-row ga-3">
            <!-- <BtnLike
              :liked="article.liked"
              :likes="article.likeCount"
              @click.prevent="likeArticle(article.articleId)"
            /> -->
            <CommentIcon :commentN="article.commentCount" />
          </div>
        </div>
      </div>
    </div>
  </v-container>
</template>

<style scoped></style>

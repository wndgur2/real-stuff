<script setup>
  import HouseArticleItem from './HouseArticleItem.vue'
  import HouseCommentItem from './HouseCommentItem.vue'
  import CommentBox from '../common/CommentBox.vue'
  import { onMounted, ref } from 'vue'
  import { getArticle, getComments } from '@/api/houseComment'
  import { useRoute } from 'vue-router'

  const route = useRoute()
  const articleId = route.params.articleId

  const article = ref({})
  const comments = ref([])

  onMounted(() => {
    getArticle(articleId).then((res) => {
      article.value = res.data
    })
    getComments(articleId).then((res) => {
      comments.value = res.data.comments
      console.log(comments.value)
    })
  })

  const addComment = (content) => {
    const date = new Date()
    comments.value.push({
      content,
      createdAt:
        date.getFullYear() +
        '-' +
        (date.getMonth() + 1) +
        '-' +
        date.getDate() +
        ' ' +
        date.getHours() +
        ':' +
        date.getMinutes() +
        ':' +
        date.getSeconds(),
      nickname: '나',
    })
    article.value.commentCount++
  }
</script>

<template>
  <v-card
    border="sm"
    variant="outlined"
    class="bg-white"
    style="border-radius: 32px"
  >
    <HouseArticleItem
      :article="article"
      :fullText="true"
    />

    <v-divider class="mx-4 mb-2"></v-divider>
    <v-container v-if="article.articleId">
      <CommentBox
        :articleId="article.articleId"
        @comment-created="addComment($event)"
      />
      <HouseCommentItem
        v-for="comment in comments"
        :key="comment.id"
        :comment="comment"
      />
    </v-container>
  </v-card>
</template>

<style scoped></style>

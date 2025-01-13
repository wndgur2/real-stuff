<script setup>
  import { getNoticeById, deleteNotice, updateNotice } from '@/api/notice'
  import { onMounted, ref } from 'vue'
  import { useRouter, useRoute } from 'vue-router'
  import { useUserStore } from '@/store/user'
  import { ROLES } from '@/utils/user'
  const { user } = useUserStore()
  const accessRight =
    user.memberRole === ROLES.admin || user.memberRole === ROLES.master ? true : false

  const router = useRouter()
  const route = useRoute()

  const article = ref(null)
  const newArticle = ref(null)
  const isUpdating = ref(false)
  const articleId = route.params.articleId

  onMounted(() => {
    console.log(articleId)
    getNoticeById(articleId).then((res) => {
      console.log(res)
      article.value = res.data
      newArticle.value = JSON.parse(JSON.stringify(article.value))
    })
  })

  const updateHandler = () => {
    isUpdating.value = !isUpdating.value
    newArticle.value = JSON.parse(JSON.stringify(article.value))
  }

  const deleteHandler = () => {
    const answer = confirm('정말 삭제하시겠어요?')

    if (answer) {
      deleteNotice(articleId)
        .then(() => {
          router.push({ name: 'notice' })
        })
        .catch((err) => {
          console.error(err)
        })
    }
  }

  const listHandler = () => {
    router.push({ name: 'notice' })
  }

  const completeHandler = () => {
    article.value = newArticle.value

    updateNotice(articleId, {
      title: newArticle.value.title,
      content: newArticle.value.content,
    })
      .then(() => {
        isUpdating.value = false
      })
      .catch((err) => {
        console.error(err)
      })
  }

  const cancelHandler = () => {
    isUpdating.value = false
  }
</script>

<template>
  <v-divider class="border-opacity-100" />
  <v-sheet v-if="article != null">
    <div class="d-flex flex-row justify-space-around my-4">
      <div class="w-50" />
      <div>
        <span>작성자 : </span>
        <span>{{ article.writer }}</span>
      </div>
      <div>
        <span>작성일 : </span>
        <span>{{ article.createdAt }}</span>
      </div>
    </div>
    <v-divider />
    <div class="my-4 pa-4">
      <v-text-field
        name="title"
        label="title"
        v-model="newArticle.title"
        v-if="isUpdating"
        hide-details
      ></v-text-field>
      <h2
        class="text-center"
        v-else
      >
        {{ article.title }}
      </h2>
    </div>
    <div class="mt-4 pa-4">
      <v-text-field
        variant="outlined"
        name="content"
        label="content"
        v-model="newArticle.content"
        hide-details
        v-if="isUpdating"
      ></v-text-field>
      <p v-else>{{ article.content }}</p>
    </div>
    <v-spacer class="my-12"></v-spacer>
    <div class="d-flex pa-10 ga-10 justify-center">
      <v-btn
        rounded="0"
        color="primary"
        variant="outlined"
        @click="updateHandler"
        v-show="!isUpdating && accessRight"
        >수정</v-btn
      >
      <v-btn
        rounded="0"
        color="primary"
        variant="outlined"
        @click="completeHandler"
        v-show="isUpdating"
        >완료</v-btn
      >
      <v-btn
        rounded="0"
        color="warning"
        variant="outlined"
        @click="cancelHandler"
        v-show="isUpdating"
        >취소</v-btn
      >
      <v-btn
        rounded="0"
        color="error"
        variant="outlined"
        @click="deleteHandler"
        v-show="!isUpdating && accessRight"
        >삭제</v-btn
      >
      <v-btn
        rounded="0"
        variant="outlined"
        @click="listHandler"
        >목록</v-btn
      >
    </div>
  </v-sheet>
</template>

<style scoped></style>

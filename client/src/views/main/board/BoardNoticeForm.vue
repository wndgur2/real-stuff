<script setup>
  import { createNotice } from '@/api/notice'
  import { ref } from 'vue'
  import { onBeforeRouteLeave, useRouter } from 'vue-router'

  const router = useRouter()
  const title = ref('')
  const content = ref('')
  const submitted = ref(false)
  const submit = () => {
    createNotice({ title: title.value, content: content.value })
      .then(() => {
        submitted.value = true
        router.push({ name: 'notice' })
      })
      .catch((err) => {
        console.error(err)
      })
  }
  const handleReset = () => {
    title.value = ''
    content.value = ''
  }

  const handleCancel = () => {
    router.back()
  }

  onBeforeRouteLeave(
    () => submitted.value || confirm('정말 떠나실건가요? 작성 중인 내용은 사라집니다.')
  )
</script>
<template>
  <div>
    <div class="d-flex align-center flex-column">
      <h3 class="my-5">공지사항 작성</h3>
      <v-divider
        class="w-100 mb-5"
        color="info"
      ></v-divider>
    </div>
    <form @submit.prevent="submit">
      <v-text-field
        v-model="title"
        label="title"
        name="title"
        color="light-blue"
      ></v-text-field>
      <v-text-field
        v-model="content"
        label="content"
        name="content"
        color="light-blue"
      ></v-text-field>
      <div class="d-flex ga-4 justify-center">
        <v-btn
          class="bg-surface"
          type="submit"
          variant="outlined"
          rounded="0"
          border="sm"
        >
          등록
        </v-btn>

        <v-btn
          @click="handleReset"
          class="bg-surface"
          variant="outlined"
          rounded="0"
          border="sm"
        >
          지우기
        </v-btn>

        <v-btn
          @click="handleCancel"
          class="bg-surface"
          variant="outlined"
          rounded="0"
          border="sm"
        >
          취소
        </v-btn>
      </div>
    </form>
  </div>
</template>

<style scoped></style>

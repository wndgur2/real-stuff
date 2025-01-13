<script setup>
  import { createQuestion } from '@/api/qna'
  import { ref } from 'vue'
  import { onBeforeRouteLeave, useRouter } from 'vue-router'
  const router = useRouter()
  const title = ref('')
  const content = ref('')
  const submitted = ref(false)
  const submit = () => {
    submitted.value = true
    createQuestion({ title: title.value, content: content.value })
      .then(() => {
        router.push({ name: 'qna' })
      })
      .catch((error) => {
        console.error(error)
      })
  }
  const handleReset = () => {
    title.value = ''
    content.value = ''
  }

  const handleCancel = () => {
    router.back()
  }

  onBeforeRouteLeave(() => {
    if (!submitted.value) confirm('정말 떠나실건가요? 작성 중인 내용은 사라집니다.')
  })
</script>
<template>
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
        @click="submit"
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
</template>

<style scoped></style>

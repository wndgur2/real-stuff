<script setup>
  import { sendAIMessage } from '@/api/ai'
  import { ref, watch } from 'vue'
  import AppLoader from '../common/AppLoader.vue'
  import { useUserStore } from '@/store/user'
  import { useModalStore } from '@/store/modal'
  import { storeToRefs } from 'pinia'
  const { openAuthModal } = useModalStore()
  const { isLogin } = storeToRefs(useUserStore())
  const { deal, houseInfo } = defineProps({ deal: Object, houseInfo: Object })
  const answer = ref('')
  const type = ref(deal ? '매물' : '아파트')
  const error = ref(false)

  const loading = ref(false)

  watch(
    () => houseInfo,
    (h) => {
      sendChat()
    },
    { immediate: true }
  )

  watch(
    isLogin,
    (l) => {
      if (!l) return
      console.log('log:', l)
      sendChat()
    },
    { immediate: true }
  )

  function sendChat() {
    if (!isLogin.value) return
    let message = '200자 이내로 답변. '
    if (deal)
      message +=
        '이 매물, 지역 상권에 대한 의견. 주변 매물과 비교.' +
        JSON.stringify({ ...deal, status: '' }) +
        JSON.stringify({ ...houseInfo, name: '' })
    else message += '이 부동산에 대한 의견. 주변 정보. ' + JSON.stringify(houseInfo)

    loading.value = true
    error.value = false
    sendAIMessage({ message })
      .then((res) => {
        console.log(res)
        answer.value = res.data.response
        loading.value = false
      })
      .catch((err) => {
        console.error(err)
        loading.value = false
        error.value = true
      })
  }
</script>

<template>
  <v-sheet
    class="mh-33 pa-3 w-100"
    rounded="xl"
    border="0"
    color="secondary"
  >
    <div class="d-flex ga-4 align-center pl-2">
      <v-icon size="large">fa-robot</v-icon>
      <h2>매물봇</h2>
    </div>
    <h4
      class="text-error px-2 py-1"
      v-if="error"
    >
      봇이 과열됐어요. 나중에 다시 시도해주세요.
    </h4>
    <template v-else-if="isLogin">
      <div class="d-flex flex-column pa-2 ga-1">
        <span>현재 {{ type }}에 대한 AI의 의견이에요.</span>
        <AppLoader v-if="loading" />
        <h3 v-else>{{ answer }}</h3>
      </div>
    </template>
    <template v-else>
      <v-btn
        color="warning"
        variant="outlined"
        size="large"
        class="d-flex ma-auto my-4"
        rounded="pill"
        @click="openAuthModal"
        >이용하려면 로그인해주세요.</v-btn
      >
    </template>
  </v-sheet>
</template>

<style scoped></style>
